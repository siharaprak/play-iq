import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HUDPanel } from "@/components/hud";
import {
    Eye,
    Users,
    CalendarDays,
    TrendingUp,
    Monitor,
    Smartphone,
    Tablet,
    HelpCircle,
    BarChart3,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PageViewRow {
    id: string;
    path: string;
    title: string | null;
    session_id: string;
    device_type: string | null;
    created_at: string;
}

interface DailyCount {
    date: string;
    views: number;
}

interface DeviceCount {
    type: string;
    count: number;
    color: string;
    icon: typeof Monitor;
}

interface TopPage {
    path: string;
    views: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysAgoISO(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
}

function todayStart(): string {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
}

// ─── Data Hook ──────────────────────────────────────────────────────────────

function usePageViews() {
    return useQuery({
        queryKey: ["admin-page-views"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("page_views")
                .select("id, path, title, session_id, device_type, created_at")
                .order("created_at", { ascending: false })
                .limit(10000);

            if (error) throw error;
            return (data ?? []) as PageViewRow[];
        },
        staleTime: 60_000,
    });
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function KPICard({
    label,
    value,
    icon: Icon,
    glowColor,
}: {
    label: string;
    value: string | number;
    icon: typeof Eye;
    glowColor: "primary" | "secondary" | "accent";
}) {
    return (
        <HUDPanel variant="small" glowColor={glowColor}>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                    <p className="text-2xl font-bold text-foreground truncate">{value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {label}
                    </p>
                </div>
            </div>
        </HUDPanel>
    );
}

function HUDTooltipContent({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}) {
    if (!active || !payload?.length) return null;
    return (
        <div className="glass-panel rounded-md px-3 py-2 border border-hud-glass-border/40 shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-bold text-primary">
                {payload[0].value.toLocaleString()} views
            </p>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function WebsiteAnalyticsPanel() {
    const { data: rows, isLoading, error } = usePageViews();

    // ── Derived analytics data ──
    const kpis = useMemo(() => {
        if (!rows) return { total: 0, unique: 0, today: 0, avg: "0" };
        const total = rows.length;
        const uniqueSessions = new Set(rows.map((r) => r.session_id)).size;
        const todayISO = todayStart();
        const today = rows.filter((r) => r.created_at >= todayISO).length;
        const avg = uniqueSessions > 0 ? (total / uniqueSessions).toFixed(1) : "0";
        return { total, unique: uniqueSessions, today, avg };
    }, [rows]);

    const dailyData = useMemo<DailyCount[]>(() => {
        if (!rows) return [];
        const cutoff = daysAgoISO(14);
        const buckets: Record<string, number> = {};

        // Pre-fill 14 days
        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().slice(0, 10);
            buckets[key] = 0;
        }

        rows
            .filter((r) => r.created_at >= cutoff)
            .forEach((r) => {
                const key = r.created_at.slice(0, 10);
                if (key in buckets) buckets[key]++;
            });

        return Object.entries(buckets).map(([date, views]) => ({
            date: formatDate(date),
            views,
        }));
    }, [rows]);

    const deviceData = useMemo<DeviceCount[]>(() => {
        if (!rows) return [];
        const counts: Record<string, number> = {
            desktop: 0,
            mobile: 0,
            tablet: 0,
            unknown: 0,
        };
        rows.forEach((r) => {
            const dt = (r.device_type || "unknown").toLowerCase();
            if (dt in counts) counts[dt]++;
            else counts["unknown"]++;
        });
        const map: Record<
            string,
            { color: string; icon: typeof Monitor }
        > = {
            desktop: { color: "primary", icon: Monitor },
            mobile: { color: "secondary", icon: Smartphone },
            tablet: { color: "accent", icon: Tablet },
            unknown: { color: "primary", icon: HelpCircle },
        };
        return Object.entries(counts)
            .filter(([, c]) => c > 0)
            .map(([type, count]) => ({
                type: type.charAt(0).toUpperCase() + type.slice(1),
                count,
                color: map[type]?.color ?? "primary",
                icon: map[type]?.icon ?? HelpCircle,
            }));
    }, [rows]);

    const topPages = useMemo<TopPage[]>(() => {
        if (!rows) return [];
        const cutoff = daysAgoISO(14);
        const counts: Record<string, number> = {};
        rows
            .filter((r) => r.created_at >= cutoff)
            .forEach((r) => {
                counts[r.path] = (counts[r.path] || 0) + 1;
            });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([path, views]) => ({ path, views }));
    }, [rows]);

    const maxDevice = useMemo(
        () => Math.max(...deviceData.map((d) => d.count), 1),
        [deviceData]
    );

    // ── Loading / Error ──
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <HUDPanel variant="small" glowColor="primary">
                <p className="text-destructive text-sm">
                    Failed to load analytics: {(error as Error).message}
                </p>
            </HUDPanel>
        );
    }

    // ── Render ──
    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">
                    Website <span className="text-accent">Analytics</span>
                </h2>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    label="Total Views"
                    value={kpis.total.toLocaleString()}
                    icon={Eye}
                    glowColor="primary"
                />
                <KPICard
                    label="Unique Visitors"
                    value={kpis.unique.toLocaleString()}
                    icon={Users}
                    glowColor="secondary"
                />
                <KPICard
                    label="Views Today"
                    value={kpis.today.toLocaleString()}
                    icon={CalendarDays}
                    glowColor="accent"
                />
                <KPICard
                    label="Avg Views / Visitor"
                    value={kpis.avg}
                    icon={TrendingUp}
                    glowColor="primary"
                />
            </div>

            {/* Daily Traffic Chart */}
            <HUDPanel glowColor="primary">
                <h3 className="text-lg font-bold text-foreground mb-4">
                    Daily Traffic{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                        — Last 14 days
                    </span>
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyData}>
                            <defs>
                                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor="hsl(185, 100%, 50%)"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="hsl(185, 100%, 50%)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="hsl(200, 60%, 20%)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "hsl(200, 20%, 60%)", fontSize: 11 }}
                                axisLine={{ stroke: "hsl(200, 60%, 25%)" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "hsl(200, 20%, 60%)", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip content={<HUDTooltipContent />} />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="hsl(185, 100%, 50%)"
                                strokeWidth={2}
                                fill="url(#areaFill)"
                                dot={{
                                    r: 3,
                                    fill: "hsl(185, 100%, 50%)",
                                    stroke: "hsl(185, 100%, 70%)",
                                    strokeWidth: 1,
                                }}
                                activeDot={{
                                    r: 5,
                                    fill: "hsl(185, 100%, 70%)",
                                    stroke: "hsl(185, 100%, 50%)",
                                    strokeWidth: 2,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </HUDPanel>

            {/* Bottom Row: Devices + Top Pages */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <HUDPanel glowColor="secondary">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                        Device Breakdown
                    </h3>
                    <div className="space-y-4">
                        {deviceData.map((d) => {
                            const Icon = d.icon;
                            const pct = ((d.count / (rows?.length || 1)) * 100).toFixed(1);
                            return (
                                <div key={d.type} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground font-medium">
                                                {d.type}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground">
                                            {d.count.toLocaleString()}{" "}
                                            <span className="text-xs">({pct}%)</span>
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${(d.count / maxDevice) * 100}%`,
                                                background:
                                                    d.color === "primary"
                                                        ? "hsl(185, 100%, 50%)"
                                                        : d.color === "secondary"
                                                            ? "hsl(300, 85%, 55%)"
                                                            : "hsl(200, 100%, 60%)",
                                                boxShadow: `0 0 8px ${d.color === "primary"
                                                        ? "hsl(185, 100%, 50%, 0.6)"
                                                        : d.color === "secondary"
                                                            ? "hsl(300, 85%, 55%, 0.6)"
                                                            : "hsl(200, 100%, 60%, 0.6)"
                                                    }`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {deviceData.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No data yet
                            </p>
                        )}
                    </div>
                </HUDPanel>

                {/* Top Pages */}
                <HUDPanel glowColor="accent">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                        Top Pages{" "}
                        <span className="text-muted-foreground text-sm font-normal">
                            — Last 14 days
                        </span>
                    </h3>
                    {topPages.length > 0 ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topPages} layout="vertical" barCategoryGap={4}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="hsl(200, 60%, 20%)"
                                        horizontal={false}
                                    />
                                    <XAxis
                                        type="number"
                                        tick={{ fill: "hsl(200, 20%, 60%)", fontSize: 11 }}
                                        axisLine={{ stroke: "hsl(200, 60%, 25%)" }}
                                        tickLine={false}
                                        allowDecimals={false}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="path"
                                        tick={{ fill: "hsl(200, 20%, 60%)", fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={120}
                                    />
                                    <Tooltip content={<HUDTooltipContent />} />
                                    <Bar
                                        dataKey="views"
                                        fill="hsl(200, 100%, 60%)"
                                        radius={[0, 4, 4, 0]}
                                        barSize={18}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No data yet
                        </p>
                    )}
                </HUDPanel>
            </div>
        </div>
    );
}
