import { useState, useEffect, useRef } from "react";
import referenceImage from "@/assets/reference-overlay.png";

export function DevOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "O") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {/* Reference image overlay */}
      <img
        src={referenceImage}
        alt="Reference overlay"
        className="w-full h-full object-contain"
        style={{ opacity: opacity / 100 }}
      />

      {/* Controls panel */}
      <div
        className="fixed top-4 right-4 bg-background/90 backdrop-blur-sm border border-primary/50 rounded-lg p-4 pointer-events-auto z-[10000]"
        style={{ transform: `translate(${-position.x}px, ${-position.y}px)` }}
      >
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Dev Overlay</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16">Opacity:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="text-xs text-muted-foreground w-8">{opacity}%</span>
          </div>

          <div
            className="h-8 bg-primary/20 rounded cursor-move flex items-center justify-center text-xs text-muted-foreground hover:bg-primary/30 transition-colors"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            Drag to reposition
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Press Ctrl+Shift+O to toggle
          </div>
        </div>
      </div>
    </div>
  );
}
