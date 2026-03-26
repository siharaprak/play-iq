import { HUDPanel, HUDProgressBar, HoloIcon, LockOverlay } from "@/components/hud";
import { useSubscription } from "@/hooks/useSubscription";
import { ClipboardCheck, FileQuestion, CheckCircle, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

type AssessmentStatus = "not_started" | "in_progress" | "completed";

const assessments = [
  { 
    id: 1, 
    title: "AI Basics Quiz", 
    description: "Test your understanding of AI fundamentals",
    questions: 10,
    status: "not_started" as AssessmentStatus,
    score: null,
    requiresTier: "single_tool" as const,
  },
  { 
    id: 2, 
    title: "Prompt Engineering Test", 
    description: "Show your prompt crafting skills",
    questions: 15,
    status: "not_started" as AssessmentStatus,
    score: null,
    requiresTier: "power_suite" as const,
  },
  { 
    id: 3, 
    title: "Creative AI Project", 
    description: "Submit your AI-assisted creation",
    questions: 1,
    status: "not_started" as AssessmentStatus,
    score: null,
    requiresTier: "power_suite" as const,
  },
];

const statusConfig = {
  not_started: { icon: FileQuestion, label: "Not Started", color: "text-muted-foreground" },
  in_progress: { icon: Clock, label: "In Progress", color: "text-secondary" },
  completed: { icon: CheckCircle, label: "Completed", color: "text-accent" },
};

const Assessments = () => {
  const { hasAccess, hasPowerSuite, hasSingleTool } = useSubscription();

  const canAccessAssessment = (tier: "single_tool" | "power_suite") => {
    if (!hasAccess) return false;
    if (hasPowerSuite) return true;
    if (hasSingleTool && tier === "single_tool") return true;
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Assessment <span className="text-primary text-glow-primary">Center</span>
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge and track your progress
        </p>
      </div>

      {!hasAccess && (
        <HUDPanel className="mb-8" glowColor="secondary">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Unlock Assessments</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to take quizzes and track your learning
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
        {assessments.map((assessment) => {
          const isLocked = !canAccessAssessment(assessment.requiresTier);
          const status = statusConfig[assessment.status];
          const StatusIcon = status.icon;

          return (
            <LockOverlay 
              key={assessment.id} 
              isLocked={isLocked}
              message={assessment.requiresTier === "power_suite" ? "Power Suite required" : "Subscribe to unlock"}
            >
              <HUDPanel 
                className={isLocked ? "opacity-60" : "hover:scale-[1.01] transition-transform cursor-pointer"}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <HoloIcon 
                      icon={ClipboardCheck} 
                      label="" 
                      color={assessment.status === "completed" ? "accent" : "primary"}
                      size="md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{assessment.title}</h3>
                      {assessment.requiresTier === "power_suite" && (
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                          Power Suite
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{assessment.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{assessment.questions} questions</span>
                      <span className={`flex items-center gap-1 ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                      {assessment.score !== null && (
                        <span className="text-accent">Score: {assessment.score}%</span>
                      )}
                    </div>
                  </div>
                  {!isLocked && assessment.status !== "completed" && (
                    <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-colors">
                      {assessment.status === "in_progress" ? "Continue" : "Start"}
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

export default Assessments;
