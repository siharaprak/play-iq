import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

export interface HUDButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
}

export function HUDButton({
  children,
  className,
  variant = "default",
  size = "md",
  disabled = false,
  ...props
}: HUDButtonProps) {
  const variantStyles = {
    default: cn(
      "bg-gradient-to-r from-primary/80 to-primary",
      "text-primary-foreground font-semibold",
      "border border-primary/50",
      "shadow-[0_0_15px_hsl(var(--primary)/0.4)]",
      "hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)]",
      "hover:from-primary hover:to-primary/90"
    ),
    ghost: cn(
      "bg-transparent",
      "text-foreground/80 hover:text-foreground",
      "border border-transparent hover:border-primary/30",
      "hover:bg-primary/10"
    ),
    outline: cn(
      "bg-transparent",
      "text-primary",
      "border border-primary/50 hover:border-primary",
      "hover:bg-primary/10",
      "shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
      "hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
    ),
    glow: cn(
      "bg-gradient-to-r from-primary via-accent to-secondary",
      "text-primary-foreground font-bold",
      "border-0",
      "shadow-[0_0_20px_hsl(var(--primary)/0.5),0_0_40px_hsl(var(--secondary)/0.3)]",
      "hover:shadow-[0_0_30px_hsl(var(--primary)/0.7),0_0_60px_hsl(var(--secondary)/0.4)]",
      "animate-pulse-glow"
    ),
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      disabled={disabled}
      {...props}
      className={cn(
        "relative overflow-hidden",
        "transition-all duration-300 transform",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
