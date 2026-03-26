import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PlatformButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function PlatformButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}: PlatformButtonProps) {
  const variantStyles = {
    primary: {
      text: "text-primary",
      border: "border-primary/60",
      glow: "bg-primary",
      shadow: "shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
    },
    secondary: {
      text: "text-secondary",
      border: "border-secondary/60",
      glow: "bg-secondary",
      shadow: "shadow-[0_0_30px_hsl(var(--secondary)/0.4)]",
    },
  };

  const sizeStyles = {
    sm: { padding: "px-8 py-3", text: "text-sm", platform: "w-40 h-40" },
    md: { padding: "px-12 py-4", text: "text-base", platform: "w-48 h-48" },
    lg: { padding: "px-16 py-5", text: "text-lg", platform: "w-56 h-56" },
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Main button */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "group relative z-10 transition-all duration-300 transform",
          "hover:scale-105 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        )}
      >
        {/* Button content */}
        <div
          className={cn(
            "relative bg-background/40 backdrop-blur-sm rounded-lg border-2",
            "transition-all duration-300",
            variantStyles[variant].border,
            variantStyles[variant].shadow,
            sizeStyles[size].padding
          )}
        >
          {/* Top highlight */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          
          {/* Corner accents */}
          <div className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm", variantStyles[variant].border)} />
          <div className={cn("absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm", variantStyles[variant].border)} />
          <div className={cn("absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm", variantStyles[variant].border)} />
          <div className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-sm", variantStyles[variant].border)} />
          
          {/* Text content */}
          <span className={cn(
            "relative z-10 font-bold tracking-widest uppercase",
            variantStyles[variant].text,
            sizeStyles[size].text,
            "drop-shadow-[0_0_10px_currentColor]"
          )}>
            {children}
          </span>
        </div>
      </button>

      {/* Circular holographic platform base */}
      <div className={cn("absolute bottom-0 translate-y-1/2", sizeStyles[size].platform)}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-primary/30 opacity-60" />
        
        {/* Middle ring */}
        <div className="absolute inset-4 rounded-full border border-primary/40 opacity-70" />
        
        {/* Inner ring */}
        <div className="absolute inset-8 rounded-full border border-primary/50 opacity-80" />
        
        {/* Center glow disk */}
        <div className={cn(
          "absolute inset-12 rounded-full blur-sm opacity-60",
          variantStyles[variant].glow
        )} />
        
        {/* Core bright center */}
        <div className={cn(
          "absolute inset-16 rounded-full blur-md opacity-80",
          variantStyles[variant].glow
        )} />
        
        {/* Fog/mist effect at bottom */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-16 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent blur-xl rounded-full" />
      </div>
      
      {/* Electric arc effects - left */}
      <div className={cn(
        "absolute left-0 top-1/4 w-0.5 h-8 rounded-full opacity-0 group-hover:opacity-100 animate-pulse",
        variantStyles[variant].glow
      )} style={{ transform: "translateX(-20px)" }} />
      
      {/* Electric arc effects - right */}
      <div className={cn(
        "absolute right-0 top-1/4 w-0.5 h-8 rounded-full opacity-0 group-hover:opacity-100 animate-pulse",
        variantStyles[variant].glow
      )} style={{ transform: "translateX(20px)", animationDelay: "0.1s" }} />
    </div>
  );
}
