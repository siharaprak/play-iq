import { NebulaScene, HUDNav, HUDPanel, HUDProgressBar, HUDButton } from "@/components/hud";
import { User, Trophy, Star, Calendar, Edit } from "lucide-react";

const Profile = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Profile Header */}
            <HUDPanel variant="hero" className="mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/50">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border hover:bg-muted/80 transition-colors">
                    <Edit className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-1">Player Name</h1>
                  <p className="text-muted-foreground mb-4">Joined January 2026</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-tertiary" />
                      <span className="text-sm">Level 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-tertiary" />
                      <span className="text-sm">1,250 XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm">7 Day Streak</span>
                    </div>
                  </div>
                </div>

                <HUDButton variant="outline">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </HUDButton>
              </div>
            </HUDPanel>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <HUDPanel>
                <h3 className="text-lg font-bold text-foreground mb-4">Weekly Progress</h3>
                <div className="space-y-4">
                  <HUDProgressBar label="Effort Points" value={75} max={100} color="primary" />
                  <HUDProgressBar label="Mastery Points" value={45} max={100} color="secondary" />
                  <HUDProgressBar label="Play Points" value={90} max={100} color="tertiary" />
                </div>
              </HUDPanel>

              <HUDPanel>
                <h3 className="text-lg font-bold text-foreground mb-4">Achievements</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-lg border flex items-center justify-center ${
                        i <= 3 
                          ? 'bg-tertiary/20 border-tertiary/50' 
                          : 'bg-muted/30 border-border/30'
                      }`}
                    >
                      <Trophy className={`w-6 h-6 ${i <= 3 ? 'text-tertiary' : 'text-muted-foreground'}`} />
                    </div>
                  ))}
                </div>
              </HUDPanel>
            </div>
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Profile;
