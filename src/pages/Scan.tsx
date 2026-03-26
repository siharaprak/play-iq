import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { Camera, Upload } from "lucide-react";

const Scan = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <HUDPanel variant="hero" className="max-w-lg w-full text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/50 animate-pulse-glow">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  <span className="text-primary text-glow-primary">Scan</span> Your Blocks
                </h1>
                <p className="text-muted-foreground">
                  Point your camera at your PlayIQ blocks to unlock AR experiences and complete challenges.
                </p>
              </div>

              <div className="flex gap-4">
                <HUDButton variant="default" size="lg">
                  <Camera className="w-5 h-5" />
                  Open Camera
                </HUDButton>
                <HUDButton variant="outline" size="lg">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </HUDButton>
              </div>
            </div>
          </HUDPanel>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Scan;
