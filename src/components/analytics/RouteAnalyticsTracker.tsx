import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/** Routes to exclude from analytics tracking */
const EXCLUDED_PREFIXES = ["/admin", "/auth"];

/** Minimum ms between inserts for the same path in one session */
const COOLDOWN_MS = 2000;

function getSessionId(): string {
    let sid = sessionStorage.getItem("playiq_session_id");
    if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem("playiq_session_id", sid);
    }
    return sid;
}

function detectDeviceType(ua: string): string {
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (
        /mobile|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|iemobile/i.test(
            ua
        )
    )
        return "mobile";
    if (/android|cros|macintosh|windows|linux/i.test(ua)) return "desktop";
    return "unknown";
}

/**
 * Render-less component that tracks page views on public routes.
 * Mount once inside the router + auth providers.
 */
export function RouteAnalyticsTracker() {
    const location = useLocation();
    const { user } = useAuth();
    const lastTracked = useRef<{ path: string; time: number }>({
        path: "",
        time: 0,
    });

    useEffect(() => {
        const { pathname } = location;

        // Skip excluded routes
        if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
            return;
        }

        // Cooldown: don't re-track the same path within COOLDOWN_MS
        const now = Date.now();
        if (
            lastTracked.current.path === pathname &&
            now - lastTracked.current.time < COOLDOWN_MS
        ) {
            return;
        }
        lastTracked.current = { path: pathname, time: now };

        const ua = navigator.userAgent;

        const record = {
            path: pathname,
            title: document.title || null,
            session_id: getSessionId(),
            referrer: document.referrer || null,
            user_agent: ua || null,
            device_type: detectDeviceType(ua),
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            user_id: user?.id ?? null,
        };

        // Fire-and-forget insert (local PlayIQ analytics)
        supabase
            .from("page_views")
            .insert(record)
            .then(({ error }) => {
                if (error) {
                    console.warn("[Analytics] Failed to track page view:", error.message);
                }
            });

        // Also send to Sienvi Agency dashboard analytics
        try {
            let visitorId = localStorage.getItem("playiq_visitor_id");
            if (!visitorId) {
                visitorId = crypto.randomUUID();
                localStorage.setItem("playiq_visitor_id", visitorId);
            }
            const params = new URLSearchParams(window.location.search);
            const AGENCY_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odXhybnhhanRpd3hhdWhsaGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTM3MDcsImV4cCI6MjA4NzUyOTcwN30.aWETGhjGNrihD6OrKq-tctQnDFxu8XCjgsFmv77-m9E";
            fetch("https://mhuxrnxajtiwxauhlhlv.supabase.co/functions/v1/track-analytics", {
                method: "POST",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AGENCY_ANON_KEY}`,
                    "apikey": AGENCY_ANON_KEY,
                },
                body: JSON.stringify({
                    clientId: "22090989-2d0e-47b2-b9c5-98652d7f0957",
                    visitorId,
                    pageUrl: window.location.href,
                    pageTitle: document.title,
                    referrer: document.referrer || "",
                    utmSource: params.get("utm_source") || undefined,
                    utmMedium: params.get("utm_medium") || undefined,
                    utmCampaign: params.get("utm_campaign") || undefined,
                }),
            }).catch(() => { /* fail silently */ });
        } catch { /* fail silently */ }
    }, [location.pathname, user?.id]);

    return null;
}
