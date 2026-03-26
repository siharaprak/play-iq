import { NebulaScene, HUDNav, HUDPanel, HoloIcon, LockOverlay } from "@/components/hud";
import { Bird, Cat, Dog, Fish, Rabbit, Bug } from "lucide-react";

const characters = [
  { name: "Phoenix", icon: Bird, color: "tertiary" as const, unlocked: true },
  { name: "Shadow Cat", icon: Cat, color: "secondary" as const, unlocked: true },
  { name: "Guardian", icon: Dog, color: "primary" as const, unlocked: false },
  { name: "Aqua Spirit", icon: Fish, color: "accent" as const, unlocked: false },
  { name: "Swift", icon: Rabbit, color: "tertiary" as const, unlocked: false },
  { name: "Ancient One", icon: Bug, color: "secondary" as const, unlocked: false },
];

const Characters = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your <span className="text-primary text-glow-primary">Characters</span>
            </h1>
            <p className="text-muted-foreground">
              Unlock characters by completing challenges and earning XP
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {characters.map((char) => (
              <LockOverlay 
                key={char.name} 
                isLocked={!char.unlocked}
                message="Complete challenges to unlock"
              >
                <HUDPanel variant="small" className="flex flex-col items-center py-6">
                  <HoloIcon 
                    icon={char.icon} 
                    label={char.name} 
                    color={char.color}
                    size="lg"
                  />
                </HUDPanel>
              </LockOverlay>
            ))}
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Characters;
