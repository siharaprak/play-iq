import { Outlet, useLocation } from "react-router-dom";
import { NebulaScene, HUDNav, HUDPanel, HoloIcon } from "@/components/hud";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { BookOpen, Scan, Gamepad2, ClipboardCheck, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen, color: "primary" as const },
  { label: "AR Scanner", href: "/dashboard/ar", icon: Scan, color: "secondary" as const },
  { label: "Arcade", href: "/dashboard/arcade", icon: Gamepad2, color: "accent" as const },
  { label: "Assessments", href: "/dashboard/assessments", icon: ClipboardCheck, color: "primary" as const },
  { label: "Resources", href: "/dashboard/resources", icon: FileText, color: "secondary" as const },
  { label: "Community", href: "/dashboard/community", icon: Users, color: "accent" as const },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { subscription, hasAccess, hasPowerSuite } = useSubscription();
  const location = useLocation();
  
  const isOverview = location.pathname === "/dashboard";

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <div className="flex-1 flex mt-6">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 overflow-auto">
            {isOverview ? (
              <div className="max-w-6xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}!
                  </h1>
                  <p className="text-muted-foreground">
                    {hasAccess 
                      ? `You're on the ${hasPowerSuite ? "AI Power Suite" : "Single Tool Mastery"} plan.`
                      : "Upgrade your plan to unlock course content."
                    }
                  </p>
                </div>

                {/* Subscription Status */}
                {!hasAccess && (
                  <HUDPanel className="mb-8" glowColor="secondary">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Unlock Your Potential</h3>
                        <p className="text-muted-foreground text-sm">
                          Subscribe to access course content and start learning AI
                        </p>
                      </div>
                      <Link 
                        to="/course" 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        View Plans
                      </Link>
                    </div>
                  </HUDPanel>
                )}

                {/* Quick Links Grid */}
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickLinks.map((link) => (
                    <Link key={link.href} to={link.href}>
                      <HUDPanel 
                        variant="small" 
                        className="hover:scale-[1.02] transition-transform cursor-pointer h-full"
                        glowColor={link.color}
                      >
                        <div className="flex flex-col items-center text-center py-4">
                          <HoloIcon icon={link.icon} label="" color={link.color} size="md" />
                          <span className="mt-3 font-medium text-foreground">{link.label}</span>
                        </div>
                      </HUDPanel>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </NebulaScene>
  );
};

export default Dashboard;
