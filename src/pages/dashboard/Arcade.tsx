import { HUDPanel, HoloIcon } from "@/components/hud";
import { Gamepad2, Globe, Rocket, TreePine, Waves, Mountain } from "lucide-react";

const games = [
  { id: 1, name: "Block Builder", description: "Create amazing structures", icon: Gamepad2, color: "primary" as const },
  { id: 2, name: "Space Explorer", description: "Journey through the cosmos", icon: Rocket, color: "secondary" as const },
  { id: 3, name: "Ocean Quest", description: "Discover underwater secrets", icon: Waves, color: "accent" as const },
];

const worlds = [
  { id: 1, name: "Crystal Cave", description: "A world of sparkling gems", icon: Mountain, unlocked: true },
  { id: 2, name: "Enchanted Forest", description: "Magical creatures await", icon: TreePine, unlocked: true },
  { id: 3, name: "Nebula Station", description: "Your base among the stars", icon: Globe, unlocked: false },
];

const Arcade = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          The <span className="text-primary text-glow-primary">Arcade</span>
        </h1>
        <p className="text-muted-foreground">
          Play games and discover amazing worlds
        </p>
      </div>

      {/* Games Section */}
      <h2 className="text-xl font-bold text-foreground mb-4">Games</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <HUDPanel 
              key={game.id} 
              variant="small" 
              className="hover:scale-[1.02] transition-transform cursor-pointer"
              glowColor={game.color}
            >
              <div className="text-center py-6">
                <HoloIcon icon={Icon} label="" color={game.color} size="lg" />
                <h3 className="mt-4 font-bold text-foreground">{game.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
              </div>
            </HUDPanel>
          );
        })}
      </div>

      {/* Worlds Section */}
      <h2 className="text-xl font-bold text-foreground mb-4">Discover Worlds</h2>
      <div className="space-y-4">
        {worlds.map((world) => {
          const Icon = world.icon;
          return (
            <HUDPanel 
              key={world.id} 
              className={`hover:scale-[1.01] transition-transform cursor-pointer ${!world.unlocked ? "opacity-60" : ""}`}
              glowColor={world.unlocked ? "accent" : "primary"}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <HoloIcon 
                    icon={Icon} 
                    label="" 
                    color={world.unlocked ? "accent" : "primary"}
                    size="md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground">{world.name}</h3>
                    {!world.unlocked && (
                      <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-0.5 rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{world.description}</p>
                </div>
                {world.unlocked && (
                  <button className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-medium hover:bg-accent/30 transition-colors">
                    Enter
                  </button>
                )}
              </div>
            </HUDPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Arcade;
