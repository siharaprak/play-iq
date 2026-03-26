import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { Link } from "react-router-dom";
import { FileText, HelpCircle, Settings, LayoutDashboard } from "lucide-react";
import { WebsiteAnalyticsPanel } from "@/components/admin/WebsiteAnalyticsPanel";

const adminModules = [
  {
    title: "Website SEAL Generator",
    description: "Create and manage SEO-optimized content with AI assistance",
    icon: FileText,
    href: "/admin/blog",
    color: "primary",
  },
  {
    title: "FAQ Manager",
    description: "Manage frequently asked questions",
    icon: HelpCircle,
    href: "/admin/faq",
    color: "secondary",
  },
  {
    title: "Settings",
    description: "Configure site settings and preferences",
    icon: Settings,
    href: "/admin/settings",
    color: "accent",
  },
];

const AdminDashboard = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Page Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LayoutDashboard className="w-10 h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Admin <span className="text-primary text-glow-primary">Dashboard</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Manage your content, settings, and site configuration
            </p>
          </header>

          {/* Admin Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {adminModules.map((module) => (
              <Link key={module.href} to={module.href}>
                <HUDPanel
                  variant="default"
                  glowColor={module.color as "primary" | "secondary" | "accent"}
                  className="h-full transition-transform hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center p-4">
                    <module.icon className="w-12 h-12 text-primary mb-4" />
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {module.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {module.description}
                    </p>
                  </div>
                </HUDPanel>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="max-w-5xl mx-auto my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          {/* Website Analytics */}
          <div className="max-w-5xl mx-auto">
            <WebsiteAnalyticsPanel />
          </div>
        </main>

        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default AdminDashboard;

