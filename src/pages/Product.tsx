import { useEffect } from "react";
import { 
  NebulaScene, 
  HUDNav, 
  HUDPanel 
} from "@/components/hud";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import playiqToySet from "@/assets/playiq-toy-set.png";
import productImage1 from "@/assets/product-image-1.jpg";
import productImage2 from "@/assets/product-image-2.jpg";
import productImage3 from "@/assets/product-image-3.jpg";
import productImage4 from "@/assets/product-image-4.jpg";
import productImage5 from "@/assets/product-image-5.jpg";

const AMAZON_LINK = "https://www.amazon.com/dp/B0F3LV725Z";

const productSections = [
  {
    title: "COMPLETE 181-PIECE SPACE-THEMED MAGNETIC BUILDING SET",
    description: "Unlock endless creativity with galactic print magnetic blocks, glow-in-the-dark aliens, astronauts, LED light-up figures, and a sturdy double-sided magnetic board for stacking stability. Includes everything you need — even a convenient storage box to keep playtime organized. Perfect for kids ages 3+.",
    image: productImage1
  },
  {
    title: "GALACTIC GLOW-IN-THE-DARK ALIENS & LIGHT-UP FIGURES",
    description: "Time to embark on an interstellar adventure! Unlike standard magnetic block sets, PlayIQ features glow-in-the-dark aliens, astronauts, and LED-powered characters that light up, adding excitement for day-to-night play.",
    image: productImage2
  },
  {
    title: "STEM LEARNING THROUGH PLAY",
    description: "Supports STEM skill development, creativity, 3D thinking, and fine motor skills through hands-on building. Designed for children ages 3–7, this set offers screen-free, educational fun that grows with your child.",
    image: productImage3
  },
  {
    title: "PREMIUM QUALITY & SAFE DESIGN",
    description: "Made with BPA-free, CE-certified, eco-friendly materials. Features durable construction, strong magnets, and child-safe rounded edges. Fully compatible with other 2x2cm magnetic blocks — expand your universe with ease.",
    image: productImage4
  },
  {
    title: "BUILD REAL SPACE SCENES",
    description: "Includes a scene guidebook with 6 fully buildable designs like \"Galactic Station\" and \"Alien Base.\" Every scene shown can be built using only this set — no inflated images, no missing pieces, just real imaginative play.",
    image: productImage5
  }
];

const Product = () => {
  // Inject Product JSON-LD schema
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "product-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "PlayIQ 181-Piece Magnetic Building Blocks Set",
      "description": "STEM educational magnetic building blocks with glow-in-the-dark aliens, LED light-up figures, and space-themed designs for kids ages 3+.",
      "brand": {
        "@type": "Brand",
        "name": "PlayIQ"
      },
      "audience": {
        "@type": "PeopleAudience",
        "suggestedMinAge": 3,
        "suggestedMaxAge": 7
      },
      "category": "Toys & Games > Building Toys > Magnetic Building Sets",
      "material": "BPA-free plastic",
      "offers": {
        "@type": "Offer",
        "url": "https://www.amazon.com/dp/B0F3LV725Z",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Amazon"
        }
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Piece Count",
          "value": "181"
        },
        {
          "@type": "PropertyValue",
          "name": "Safety Certifications",
          "value": "CE Certified, BPA-Free"
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("product-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Back Link */}
          <Link 
            to="/home" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Product Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Product Image */}
            <HUDPanel variant="hero" glowColor="secondary">
              <div className="flex items-center justify-center p-4">
                <img 
                  src={playiqToySet} 
                  alt="PlayIQ 181-Piece Magnetic Building Blocks Set" 
                  className="w-full max-w-md object-contain drop-shadow-[0_0_40px_hsl(300,85%,55%,0.4)] animate-float"
                />
              </div>
            </HUDPanel>

            {/* Product Info */}
            <HUDPanel variant="hero" glowColor="primary">
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  181-Piece Magnetic Building Blocks Set
                </h1>
                <p className="text-lg text-primary font-semibold">
                  STEM Toys for Kids Ages 3+
                </p>
                <p className="text-muted-foreground">
                  Educational Space-Themed Magnetic Construction Kit with LED Light-Up Cubes | Sensory Gift Toy for Boys & Girls
                </p>
                
                {/* Buy Now Button */}
                <a 
                  href={AMAZON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] glow-primary text-lg animate-pulse-glow"
                >
                  <span>Buy Now on Amazon</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </HUDPanel>
          </div>

          {/* Alternating Copy and Image Sections */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Product <span className="text-primary text-glow-primary">Features</span>
            </h2>
            
            {productSections.map((section, index) => (
              <div key={index} className="space-y-6">
                {/* Copy Panel */}
                <HUDPanel variant="default" glowColor={index % 2 === 0 ? "primary" : "secondary"}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-primary">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </HUDPanel>

                {/* Image Panel */}
                <HUDPanel variant="hero" glowColor={index % 2 === 0 ? "secondary" : "primary"}>
                  <div className="flex items-center justify-center">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full max-w-4xl rounded-lg object-contain"
                    />
                  </div>
                </HUDPanel>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-12">
            <a 
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-10 py-5 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)] glow-primary text-xl animate-pulse-glow"
            >
              <span>Buy Now on Amazon</span>
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Product;
