import { useEffect, useRef } from "react";
import nebulaBackground from "@/assets/nebula-background.jpg";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface LightTrail {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  hue: number;
  opacity: number;
}

export function NebulaScene({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailsRef = useRef<LightTrail[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() > 0.5 ? 185 : 300,
      });
    }

    // Initialize light trails
    for (let i = 0; i < 3; i++) {
      trailsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 200 + 100,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.5 ? 185 : 300,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw light trails
      trailsRef.current.forEach((trail) => {
        const gradient = ctx.createLinearGradient(
          trail.x,
          trail.y,
          trail.x + Math.cos(trail.angle) * trail.length,
          trail.y + Math.sin(trail.angle) * trail.length
        );
        gradient.addColorStop(0, `hsla(${trail.hue}, 100%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${trail.hue}, 100%, 60%, ${trail.opacity})`);
        gradient.addColorStop(1, `hsla(${trail.hue}, 100%, 60%, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(
          trail.x + Math.cos(trail.angle) * trail.length,
          trail.y + Math.sin(trail.angle) * trail.length
        );
        ctx.stroke();

        // Move trail
        trail.x += Math.cos(trail.angle) * trail.speed;
        trail.y += Math.sin(trail.angle) * trail.speed;

        // Reset if off screen
        if (
          trail.x < -trail.length ||
          trail.x > canvas.width + trail.length ||
          trail.y < -trail.length ||
          trail.y > canvas.height + trail.length
        ) {
          trail.x = Math.random() * canvas.width;
          trail.y = Math.random() * canvas.height;
          trail.angle = Math.random() * Math.PI * 2;
        }
      });

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Move particle
        particle.y -= particle.speedY;

        // Reset if off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Static nebula background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${nebulaBackground})` }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated canvas for particles and trails */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
