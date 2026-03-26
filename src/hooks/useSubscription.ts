import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type SubscriptionTier = "single_tool" | "power_suite" | null;
export type SubscriptionStatus = "active" | "cancelled" | "expired" | null;

interface Subscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription>({
    tier: null,
    status: null,
    currentPeriodEnd: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setSubscription({ tier: null, status: null, currentPeriodEnd: null });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("tier, status, current_period_end")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.error("Error fetching subscription:", error);
      }

      setSubscription({
        tier: (data?.tier as SubscriptionTier) ?? null,
        status: (data?.status as SubscriptionStatus) ?? null,
        currentPeriodEnd: data?.current_period_end ?? null,
      });
      setLoading(false);
    }

    fetchSubscription();
  }, [user]);

  const hasAccess = subscription.status === "active";
  const hasPowerSuite = hasAccess && subscription.tier === "power_suite";
  const hasSingleTool = hasAccess && subscription.tier === "single_tool";

  return {
    subscription,
    loading,
    hasAccess,
    hasPowerSuite,
    hasSingleTool,
  };
}
