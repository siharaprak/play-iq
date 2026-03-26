import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HoloIconProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "tertiary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function HoloIcon({
  icon: Icon,
  label,
  className,
  color = "primary",
  size = "md",
  onClick,
}: HoloIconProps) {
  const colorStyles = {
    primary: {
      icon: "text-primary",
      glow: "bg-primary/60",
      shadow: "drop-shadow-[0_0_15px_hsl(var(--primary))]",
    },
    secondary: {
      icon: "text-secondary",
      glow: "bg-secondary/60",
      shadow: "drop-shadow-[0_0_15px_hsl(var(--secondary))]",
    },
    accent: {
      icon: "text-accent",
      glow: "bg-accent/60",
      shadow: "drop-shadow-[0_0_15px_hsl(var(--accent))]",
    },
    tertiary: {
      icon: "text-tertiary",
      glow: "bg-tertiary/60",
      shadow: "drop-shadow-[0_0_15px_hsl(var(--tertiary))]",
    },
  };

  const sizeStyles = {
    sm: { icon: 32, text: "text-xs", glowWidth: "w-12", glowHeight: "h-2" },
    md: { icon: 40, text: "text-sm", glowWidth: "w-16", glowHeight: "h-3" },
    lg: { icon: 56, text: "text-sm", glowWidth: "w-20", glowHeight: "h-4" },
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-4 transition-transform duration-300",
        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-4",
        className
      )}
    >
      {/* Floating icon - no container box */}
      <div className="relative">
        <Icon 
          size={sizeStyles[size].icon} 
          className={cn(
            colorStyles[color].icon,
            colorStyles[color].shadow,
            "transition-all duration-300",
            "group-hover:scale-110"
          )} 
        />
      </div>
      
      {/* Elliptical glow disk below icon */}
      <div className="relative flex flex-col items-center -mt-2">
        {/* Primary glow disk */}
        <div className={cn(
          "rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity",
          colorStyles[color].glow,
          sizeStyles[size].glowWidth,
          sizeStyles[size].glowHeight
        )} />
        
        {/* Secondary softer glow */}
        <div className={cn(
          "absolute top-0 rounded-full blur-xl opacity-50",
          colorStyles[color].glow,
          sizeStyles[size].glowWidth,
          "h-6 -translate-y-1"
        )} />
      </div>
      
      {/* Label */}
      <span className={cn(
        "font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300 mt-1",
        sizeStyles[size].text
      )}>
        {label}
      </span>
    </button>
  );
}
