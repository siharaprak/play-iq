import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { Trophy, Star, Share2 } from "lucide-react";

const showcaseItems = [
  { id: 1, title: "Dragon Tower", xp: 250, date: "Jan 24, 2026" },
  { id: 2, title: "Crystal Bridge", xp: 180, date: "Jan 23, 2026" },
  { id: 3, title: "Mystic Portal", xp: 320, date: "Jan 22, 2026" },
];

const Showcase = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your <span className="text-primary text-glow-primary">Showcase</span>
            </h1>
            <p className="text-muted-foreground">
              View your achievements and share your creations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {showcaseItems.map((item) => (
              <HUDPanel key={item.id}>
                <div className="aspect-video bg-muted/30 rounded-lg mb-4 flex items-center justify-center border border-border/30">
                  <Trophy className="w-12 h-12 text-tertiary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Star className="w-4 h-4 text-tertiary" />
                  <span>{item.xp} XP</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <HUDButton variant="ghost" size="sm" className="w-full">
                  <Share2 className="w-4 h-4" />
                  Share
                </HUDButton>
              </HUDPanel>
            ))}
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Showcase;
