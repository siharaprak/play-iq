import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface LockOverlayProps {
  children: ReactNode;
  isLocked: boolean;
  message?: string;
  onUnlockClick?: () => void;
  className?: string;
}

export function LockOverlay({
  children,
  isLocked,
  message = "Locked",
  onUnlockClick,
  className,
}: LockOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative", className)}>
      {/* Dimmed content */}
      <div className="opacity-30 pointer-events-none grayscale">
        {children}
      </div>
      
      {/* Lock overlay */}
      <div 
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center",
          "bg-background/60 backdrop-blur-sm",
          "border border-border/50 rounded-lg",
          onUnlockClick && "cursor-pointer hover:bg-background/50 transition-colors"
        )}
        onClick={onUnlockClick}
      >
        {/* Lock icon with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-muted-foreground/20 blur-xl rounded-full" />
          <div className="relative p-4 rounded-full bg-muted/50 border border-border/50">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        
        {/* Message */}
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          {message}
        </p>
        
        {/* Unlock hint */}
        {onUnlockClick && (
          <p className="mt-1 text-xs text-muted-foreground/60">
            Click to unlock
          </p>
        )}
        
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
