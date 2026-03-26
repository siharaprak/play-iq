import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HUDPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "hero" | "small";
  showCornerNodes?: boolean;
  glowColor?: "primary" | "secondary" | "accent";
}

export function HUDPanel({ 
  children, 
  className, 
  variant = "default",
  showCornerNodes = true,
  glowColor = "primary"
}: HUDPanelProps) {
  const glowStyles = {
    primary: "shadow-[0_0_30px_hsl(var(--primary)/0.3),inset_0_0_30px_hsl(var(--primary)/0.1)]",
    secondary: "shadow-[0_0_30px_hsl(var(--secondary)/0.3),inset_0_0_30px_hsl(var(--secondary)/0.1)]",
    accent: "shadow-[0_0_30px_hsl(var(--accent)/0.3),inset_0_0_30px_hsl(var(--accent)/0.1)]",
  };

  const variantStyles = {
    default: "p-6",
    hero: "p-8",
    small: "p-4",
  };

  return (
    <div 
      className={cn(
        "relative glass-panel rounded-lg overflow-hidden",
        "border border-hud-glass-border/40",
        glowStyles[glowColor],
        variantStyles[variant],
        className
      )}
    >
      {/* Neon tube border effect - Top */}
      <div className="absolute top-0 left-4 right-4 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      </div>
      
      {/* Neon tube border effect - Bottom */}
      <div className="absolute bottom-0 left-4 right-4 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      
      {/* Neon tube border effect - Left */}
      <div className="absolute left-0 top-4 bottom-4 w-px">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
      </div>
      
      {/* Neon tube border effect - Right */}
      <div className="absolute right-0 top-4 bottom-4 w-px">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Corner nodes - glowing dots at corners */}
      {showCornerNodes && (
        <>
          {/* Top left corner */}
          <div className="absolute top-0 left-0 w-3 h-3">
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-hud-corner-node animate-pulse-glow" />
            <div className="absolute top-0 left-0 w-full h-px bg-primary/60" />
            <div className="absolute top-0 left-0 w-px h-full bg-primary/60" />
          </div>
          
          {/* Top right corner */}
          <div className="absolute top-0 right-0 w-3 h-3">
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-hud-corner-node animate-pulse-glow" />
            <div className="absolute top-0 right-0 w-full h-px bg-primary/60" />
            <div className="absolute top-0 right-0 w-px h-full bg-primary/60" />
          </div>
          
          {/* Bottom left corner */}
          <div className="absolute bottom-0 left-0 w-3 h-3">
            <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-hud-corner-node/60" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-primary/40" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-primary/40" />
          </div>
          
          {/* Bottom right corner */}
          <div className="absolute bottom-0 right-0 w-3 h-3">
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-hud-corner-node/60" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-primary/40" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-primary/40" />
          </div>
        </>
      )}

      {/* Chamfer corner cuts (visual only) */}
      <div className="absolute top-0 left-0 w-3 h-3 bg-background/80" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div className="absolute top-0 right-0 w-3 h-3 bg-background/80" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 bg-background/80" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-background/80" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
