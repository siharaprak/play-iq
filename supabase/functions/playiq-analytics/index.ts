import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type, x-api-secret",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // --- Auth: shared secret ---
        const expectedSecret = Deno.env.get("ANALYTICS_API_SECRET");
        const providedSecret = req.headers.get("x-api-secret");

        if (!expectedSecret || providedSecret !== expectedSecret) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // --- Supabase client (service role to bypass RLS) ---
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // --- Fetch all page views (last 90 days max for performance) ---
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const { data: rows, error } = await supabase
            .from("page_views")
            .select("id, path, session_id, device_type, created_at")
            .gte("created_at", ninetyDaysAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(50000);

        if (error) {
            console.error("Query error:", error);
            throw new Error("Failed to query page_views");
        }

        const allRows = rows ?? [];

        // --- KPIs ---
        const totalViews = allRows.length;
        const uniqueSessions = new Set(allRows.map((r) => r.session_id));
        const uniqueVisitors = uniqueSessions.size;

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayISO = todayStart.toISOString();
        const viewsToday = allRows.filter((r) => r.created_at >= todayISO).length;

        const avgViewsPerVisitor =
            uniqueVisitors > 0
                ? parseFloat((totalViews / uniqueVisitors).toFixed(1))
                : 0;

        // --- Daily traffic (last 14 days) ---
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        fourteenDaysAgo.setHours(0, 0, 0, 0);
        const cutoff14 = fourteenDaysAgo.toISOString();

        const dailyBuckets: Record<string, number> = {};
        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dailyBuckets[d.toISOString().slice(0, 10)] = 0;
        }

        allRows
            .filter((r) => r.created_at >= cutoff14)
            .forEach((r) => {
                const key = r.created_at.slice(0, 10);
                if (key in dailyBuckets) dailyBuckets[key]++;
            });

        const dailyTraffic = Object.entries(dailyBuckets).map(([date, views]) => ({
            date,
            views,
        }));

        // --- Device breakdown ---
        const deviceCounts: Record<string, number> = {};
        allRows.forEach((r) => {
            const dt = (r.device_type || "unknown").toLowerCase();
            deviceCounts[dt] = (deviceCounts[dt] || 0) + 1;
        });

        const deviceBreakdown = Object.entries(deviceCounts)
            .map(([type, count]) => ({ type, count }))
            .sort((a, b) => b.count - a.count);

        // --- Top pages (last 14 days) ---
        const pageCounts: Record<string, number> = {};
        allRows
            .filter((r) => r.created_at >= cutoff14)
            .forEach((r) => {
                pageCounts[r.path] = (pageCounts[r.path] || 0) + 1;
            });

        const topPages = Object.entries(pageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([path, views]) => ({ path, views }));

        // --- Response ---
        const payload = {
            totalViews,
            uniqueVisitors,
            viewsToday,
            avgViewsPerVisitor,
            dailyTraffic,
            deviceBreakdown,
            topPages,
            generatedAt: new Date().toISOString(),
        };

        return new Response(JSON.stringify(payload), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("playiq-analytics error:", err);
        return new Response(
            JSON.stringify({
                error: err instanceof Error ? err.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
