import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { NebulaScene } from "@/components/hud";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, loading, user } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <NebulaScene>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Verifying admin access...</p>
          </div>
        </div>
      </NebulaScene>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <NebulaScene>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have admin privileges.</p>
          </div>
        </div>
      </NebulaScene>
    );
  }

  return <>{children}</>;
}
