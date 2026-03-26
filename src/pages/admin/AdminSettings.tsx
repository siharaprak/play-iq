import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-6">
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin <span className="text-primary text-glow-primary">Settings</span>
            </h1>
          </header>

          <HUDPanel variant="hero" glowColor="accent" className="max-w-2xl mx-auto text-center">
            <Construction className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">
              Site settings and configuration interface is under development.
            </p>
          </HUDPanel>
        </main>

        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default AdminSettings;
