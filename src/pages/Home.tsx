import { 
  NebulaScene, 
  HUDNav, 
  HUDPanel 
} from "@/components/hud";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import dragonEgg from "@/assets/dragon-egg.png";
import playiqLogoLight from "@/assets/playiq-logo-light.png";
import playiqToySetHome from "@/assets/playiq-toy-set-home.png";
import cyberneticBrain from "@/assets/cybernetic-brain.png";

const AMAZON_LINK = "https://www.amazon.com/dp/B0F3LV725Z";

const Home = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Logo - Centered below nav */}
          <div className="flex justify-center mb-4">
            <img 
              src={playiqLogoLight} 
              alt="PlayIQ - Imagine. Build. Grow." 
              className="w-80 md:w-96 lg:w-[28rem] object-contain drop-shadow-[0_0_40px_hsl(185,100%,50%,0.4)] animate-float"
            />
          </div>

          {/* AI Course Panel - First */}
          <div className="flex justify-center mb-8">
            <HUDPanel variant="hero" className="max-w-3xl w-full" glowColor="accent">
              <div className="flex items-center gap-8 p-2">
                {/* Cybernetic Brain Image - Clickable */}
                <Link to="/course" className="relative flex-shrink-0 animate-float -ml-4 hover:scale-105 transition-transform" style={{ animationDelay: '0.3s' }}>
                  <img 
                    src={cyberneticBrain} 
                    alt="AI-Powered Learning" 
                    className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_40px_hsl(280,85%,55%,0.5)]"
                  />
                  {/* Circular energy rings */}
                  <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-pulse-glow" />
                  <div className="absolute inset-2 border border-secondary/20 rounded-full" />
                  {/* Glow platform */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-accent/30 blur-xl rounded-full" />
                </Link>
                
                {/* Text Content */}
                <div className="flex-1 pr-4">
                  <Link to="/course">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-2 hover:text-accent transition-colors">
                      Super Charge Your
                      <br />
                      <span className="text-accent text-glow-accent">Learning With AI</span>
                    </h2>
                  </Link>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                    Future-proof your skills with AI-powered education. Master prompt engineering, train custom models, and learn smarter & faster.
                  </p>
                  <Link 
                    to="/course"
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent/20 border border-accent/60 text-accent font-bold tracking-wider uppercase transition-all duration-300 hover:bg-accent/30 hover:shadow-[0_0_40px_hsl(var(--accent)/0.6)] glow-accent text-sm animate-pulse-glow"
                  >
                    <span>Explore Courses</span>
                  </Link>
                </div>
              </div>
            </HUDPanel>
          </div>

          {/* Featured Product Panel */}
          <div className="flex justify-center mb-8">
            <HUDPanel variant="hero" className="max-w-3xl w-full" glowColor="secondary">
              <div className="flex items-center gap-8 p-2">
                {/* Product Image - Clickable */}
                <Link to="/product" className="relative flex-shrink-0 animate-float -ml-4 hover:scale-105 transition-transform" style={{ animationDelay: '0.5s' }}>
                  <img 
                    src={playiqToySetHome} 
                    alt="PlayIQ Magnetic Building Blocks" 
                    className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_40px_hsl(185,100%,50%,0.5)]"
                  />
                  {/* Circular energy rings */}
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse-glow" />
                  <div className="absolute inset-2 border border-secondary/20 rounded-full" />
                  {/* Glow platform */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-primary/30 blur-xl rounded-full" />
                </Link>
                
                {/* Text Content */}
                <div className="flex-1 pr-4">
                  <Link to="/product">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-2 hover:text-primary transition-colors">
                      181-Piece Magnetic
                      <br />
                      <span className="text-secondary text-glow-secondary">Building Blocks Set</span>
                    </h2>
                  </Link>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                    STEM Toys for Kids Ages 3+ | Educational Space-Themed Magnetic Construction Kit with LED Light-Up Cubes
                  </p>
                  <a 
                    href={AMAZON_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] glow-primary text-sm animate-pulse-glow"
                  >
                    <span>Buy Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </HUDPanel>
          </div>

          {/* Hero Panel - Centered */}
          <div className="flex justify-center mb-8">
            <HUDPanel variant="hero" className="max-w-3xl w-full">
              <div className="flex items-center gap-8 p-2">
                {/* Dragon Egg */}
                <div className="relative flex-shrink-0 animate-float -ml-4" style={{ animationDelay: '0.7s' }}>
                  <img 
                    src={dragonEgg} 
                    alt="Dragon Egg" 
                    className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_40px_hsl(300,85%,55%,0.5)]"
                  />
                  {/* Circular energy rings */}
                  <div className="absolute inset-0 border-2 border-secondary/30 rounded-full animate-pulse-glow" />
                  <div className="absolute inset-2 border border-primary/20 rounded-full" />
                  {/* Glow platform */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-secondary/30 blur-xl rounded-full" />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
                    Your First
                    <br />
                    <span className="text-primary text-glow-primary">Character Awaits</span>
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-5">
                    Set in or hold dragon with your pulse and hoist/guide dragon egg.
                  </p>
                  <button className="relative px-6 py-2.5 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] glow-primary text-sm">
                    Start Now
                  </button>
                </div>
              </div>
            </HUDPanel>
          </div>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Home;