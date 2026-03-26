import { NebulaScene, HUDNav, HUDPanel, HUDProgressBar, PlatformButton } from "@/components/hud";
import { Gamepad2, Target, Zap } from "lucide-react";

const Practice = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              <span className="text-primary text-glow-primary">Practice</span> Mode
            </h1>
            <p className="text-muted-foreground">
              Hone your skills and master the blocks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <HUDPanel className="text-center">
              <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Free Play</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore without pressure
              </p>
              <HUDProgressBar label="Completed" value={5} max={10} color="primary" />
              <div className="mt-4">
                <PlatformButton size="sm">Start</PlatformButton>
              </div>
            </HUDPanel>

            <HUDPanel className="text-center" glowColor="secondary">
              <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Challenges</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Test your skills
              </p>
              <HUDProgressBar label="Completed" value={3} max={10} color="secondary" />
              <div className="mt-4">
                <PlatformButton size="sm" variant="secondary">Start</PlatformButton>
              </div>
            </HUDPanel>

            <HUDPanel className="text-center" glowColor="accent">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Speed Run</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Race against time
              </p>
              <HUDProgressBar label="Best Time" value={45} max={60} color="accent" showValue={false} />
              <div className="mt-4">
                <PlatformButton size="sm">Start</PlatformButton>
              </div>
            </HUDPanel>
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Practice;
