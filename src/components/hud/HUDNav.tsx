import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/home" },
  { label: "PLAYIQ AR", href: "/scan" },
  { label: "WORLDS", href: "/worlds" },
  { label: "CHALLENGES", href: "/challenges" },
  { label: "COURSE", href: "/course" },
  { label: "PROJECTS", href: "/showcase" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function HUDNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/home");
  };

  return (
    <nav className="relative z-50 flex justify-center">
      {/* Pill-shaped container with cyan glow border */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md" />
        
        {/* Main pill container */}
        <div className="relative bg-background/40 backdrop-blur-md rounded-full border border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.3),0_0_40px_hsl(var(--primary)/0.15)] px-6 py-2">
          {/* Inner subtle glow line at top */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <ul className="flex items-center justify-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/home" && location.pathname === "/");
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 block",
                      "hover:text-primary",
                      isActive 
                        ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                        : "text-foreground/70"
                    )}
                  >
                    {item.label}
                    
                    {/* Laser underline for active state */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5">
                        <span className="absolute inset-0 bg-primary rounded-full" />
                        <span className="absolute inset-0 blur-sm bg-primary/80" />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
            
            {/* Divider */}
            <li className="w-px h-4 bg-primary/30 mx-2" />
            
            {/* Auth Section */}
            {user ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className={cn(
                      "relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2",
                      "hover:text-primary",
                      location.pathname.startsWith("/dashboard")
                        ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                        : "text-foreground/70"
                    )}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="relative px-3 py-2 text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-1 text-foreground/70 hover:text-destructive"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="relative px-4 py-1.5 text-xs font-bold tracking-wider transition-all duration-300 block bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
                >
                  SIGN UP
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
