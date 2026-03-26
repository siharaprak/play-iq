import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Scan, 
  Gamepad2, 
  ClipboardCheck, 
  FileText, 
  Users,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "AR Scanner", href: "/dashboard/ar", icon: Scan },
  { label: "The Arcade", href: "/dashboard/arcade", icon: Gamepad2 },
  { label: "Assessments", href: "/dashboard/assessments", icon: ClipboardCheck },
  { label: "Resources", href: "/dashboard/resources", icon: FileText },
  { label: "Community", href: "/dashboard/community", icon: Users },
];

export function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "relative h-full bg-background/40 backdrop-blur-md border-r border-primary/30 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-background border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className="p-4">
        {!collapsed && (
          <h2 className="text-lg font-bold text-foreground mb-6 px-2">Dashboard</h2>
        )}
        
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-primary/10",
                  isActive 
                    ? "bg-primary/20 text-primary border border-primary/30" 
                    : "text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]")} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
