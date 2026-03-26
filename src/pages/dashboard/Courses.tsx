import { HUDPanel, HUDProgressBar, HoloIcon, LockOverlay } from "@/components/hud";
import { useSubscription } from "@/hooks/useSubscription";
import { BookOpen, Brain, Wrench, Cpu, Play, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const tracks = [
  {
    id: "smarter-learning",
    title: "Learn Smarter & Faster with AI",
    description: "Master AI tools to accelerate your learning journey",
    icon: Brain,
    modules: 5,
    completed: 0,
    tier: "single_tool" as const,
  },
  {
    id: "tools-prompting",
    title: "AI Tools & Prompt Engineering",
    description: "Learn to communicate effectively with AI systems",
    icon: Wrench,
    modules: 6,
    completed: 0,
    tier: "power_suite" as const,
  },
  {
    id: "custom-training",
    title: "Custom AI Training",
    description: "Train your own AI models for personalized results",
    icon: Cpu,
    modules: 4,
    completed: 0,
    tier: "power_suite" as const,
  },
];

const Courses = () => {
  const { hasAccess, hasPowerSuite, hasSingleTool } = useSubscription();

  const canAccessTrack = (trackTier: "single_tool" | "power_suite") => {
    if (!hasAccess) return false;
    if (hasPowerSuite) return true;
    if (hasSingleTool && trackTier === "single_tool") return true;
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Course <span className="text-primary text-glow-primary">Library</span>
        </h1>
        <p className="text-muted-foreground">
          {hasAccess 
            ? "Continue your AI learning journey" 
            : "Subscribe to unlock course content"
          }
        </p>
      </div>

      {!hasAccess && (
        <HUDPanel className="mb-8" glowColor="secondary">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Unlock All Courses</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to access comprehensive AI education for your child
              </p>
            </div>
            <Link 
              to="/course" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </HUDPanel>
      )}

      <div className="space-y-4">
        {tracks.map((track) => {
          const isLocked = !canAccessTrack(track.tier);
          const Icon = track.icon;

          return (
            <LockOverlay 
              key={track.id} 
              isLocked={isLocked}
              message={track.tier === "power_suite" ? "Power Suite plan required" : "Subscribe to unlock"}
            >
              <HUDPanel 
                className={isLocked ? "opacity-60" : "hover:scale-[1.01] transition-transform cursor-pointer"}
                glowColor={track.completed > 0 ? "accent" : "primary"}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <HoloIcon 
                      icon={Icon} 
                      label="" 
                      color={track.completed > 0 ? "accent" : "primary"}
                      size="md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {track.tier === "power_suite" && (
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                          Power Suite
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{track.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                    <HUDProgressBar 
                      label="Progress" 
                      value={track.completed} 
                      max={track.modules}
                      size="sm"
                      color={track.completed > 0 ? "accent" : "primary"}
                    />
                  </div>
                  {!isLocked && (
                    <button className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </HUDPanel>
            </LockOverlay>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
