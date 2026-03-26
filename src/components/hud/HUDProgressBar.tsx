import { cn } from "@/lib/utils";

interface HUDProgressBarProps {
  label: string;
  value: number;
  max: number;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "tertiary";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function HUDProgressBar({
  label,
  value,
  max,
  className,
  color = "primary",
  size = "md",
  showValue = true,
}: HUDProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorStyles = {
    primary: {
      bar: "bg-gradient-to-r from-primary/80 via-primary to-primary/80",
      glow: "shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
      text: "text-primary",
    },
    secondary: {
      bar: "bg-gradient-to-r from-secondary/80 via-secondary to-secondary/80",
      glow: "shadow-[0_0_10px_hsl(var(--secondary)/0.5)]",
      text: "text-secondary",
    },
    accent: {
      bar: "bg-gradient-to-r from-accent/80 via-accent to-accent/80",
      glow: "shadow-[0_0_10px_hsl(var(--accent)/0.5)]",
      text: "text-accent",
    },
    tertiary: {
      bar: "bg-gradient-to-r from-tertiary/80 via-tertiary to-tertiary/80",
      glow: "shadow-[0_0_10px_hsl(var(--tertiary)/0.5)]",
      text: "text-tertiary",
    },
  };

  const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        {showValue && (
          <span className={cn("text-sm font-bold tabular-nums", colorStyles[color].text)}>
            {value} / {max}
          </span>
        )}
      </div>
      
      <div className="relative">
        {/* Track */}
        <div 
          className={cn(
            "w-full rounded-full bg-muted/50 overflow-hidden border border-border/30",
            sizeStyles[size]
          )}
        >
          {/* Fill */}
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              colorStyles[color].bar,
              colorStyles[color].glow
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-50"
            />
          </div>
        </div>
        
        {/* Glow underneath */}
        <div 
          className="absolute bottom-0 left-0 h-1 blur-md opacity-50 rounded-full"
          style={{ 
            width: `${percentage}%`,
            background: color === 'primary' ? 'hsl(var(--primary))' : 
                       color === 'secondary' ? 'hsl(var(--secondary))' :
                       color === 'accent' ? 'hsl(var(--accent))' : 'hsl(var(--tertiary))'
          }}
        />
      </div>
    </div>
  );
}
