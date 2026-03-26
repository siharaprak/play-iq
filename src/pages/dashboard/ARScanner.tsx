import { HUDPanel, HUDButton, HoloIcon } from "@/components/hud";
import { Scan, Download, QrCode, Smartphone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const arMarkers = [
  { id: 1, name: "Dragon Egg Marker", description: "Watch your dragon hatch!" },
  { id: 2, name: "Crystal Cave Marker", description: "Explore the crystal formations" },
  { id: 3, name: "Space Station Marker", description: "Launch into orbit" },
  { id: 4, name: "Ocean World Marker", description: "Dive into the deep sea" },
];

const ARScanner = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AR <span className="text-primary text-glow-primary">Scanner</span>
        </h1>
        <p className="text-muted-foreground">
          Scan your blocks and watch them come alive!
        </p>
      </div>

      {/* Scanner CTA */}
      <HUDPanel className="mb-8" glowColor="primary">
        <div className="flex flex-col md:flex-row items-center gap-6 py-4">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <Scan className="w-12 h-12 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ready to Scan?
            </h2>
            <p className="text-muted-foreground mb-4">
              Point your camera at any PlayIQ block to unlock AR experiences
            </p>
            <Link to="/scan">
              <HUDButton>
                <Scan className="w-4 h-4 mr-2" />
                Open Scanner
              </HUDButton>
            </Link>
          </div>
        </div>
      </HUDPanel>

      {/* Instructions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <HUDPanel variant="small">
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">1. Download Markers</h3>
            <p className="text-sm text-muted-foreground">Print the AR markers below</p>
          </div>
        </HUDPanel>
        <HUDPanel variant="small">
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">2. Open Scanner</h3>
            <p className="text-sm text-muted-foreground">Use the AR scanner above</p>
          </div>
        </HUDPanel>
        <HUDPanel variant="small">
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-foreground mb-1">3. Watch Magic!</h3>
            <p className="text-sm text-muted-foreground">See your blocks come alive</p>
          </div>
        </HUDPanel>
      </div>

      {/* Downloadable Markers */}
      <h2 className="text-xl font-bold text-foreground mb-4">Download AR Markers</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {arMarkers.map((marker) => (
          <HUDPanel key={marker.id} variant="small" className="hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-muted/20 flex items-center justify-center border border-primary/20">
                <QrCode className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{marker.name}</h3>
                <p className="text-sm text-muted-foreground">{marker.description}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </HUDPanel>
        ))}
      </div>
    </div>
  );
};

export default ARScanner;
