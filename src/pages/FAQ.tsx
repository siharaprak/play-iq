import { useEffect } from "react";
import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is included in the PlayIQ 181-Piece Magnetic Building Blocks Set?",
    answer: "The set includes 181 pieces: galactic print magnetic blocks, glow-in-the-dark alien figures, astronaut characters, LED light-up figures, a double-sided magnetic board for stacking stability, a scene guidebook with 6 buildable designs, and a convenient storage box."
  },
  {
    question: "What age is this toy recommended for?",
    answer: "PlayIQ Magnetic Building Blocks are designed for children ages 3 and up. The set supports developmental stages from 3-7 years old, offering screen-free educational play that grows with your child."
  },
  {
    question: "Are PlayIQ blocks safe for young children?",
    answer: "Yes! PlayIQ blocks are made with BPA-free, CE-certified, eco-friendly materials. They feature durable construction, strong magnets that are securely enclosed, and child-safe rounded edges to prevent injuries."
  },
  {
    question: "Are PlayIQ blocks compatible with other magnetic building blocks?",
    answer: "Yes, PlayIQ blocks are fully compatible with other 2x2cm magnetic blocks. You can easily expand your collection by mixing PlayIQ with other standard-sized magnetic building sets."
  },
  {
    question: "What STEM skills do children learn with PlayIQ?",
    answer: "PlayIQ supports STEM skill development including spatial reasoning, 3D thinking, geometry concepts, fine motor skills, problem-solving, and creativity. Children learn engineering principles through hands-on building experiences."
  },
  {
    question: "What makes the glow-in-the-dark and LED features special?",
    answer: "Unlike standard magnetic block sets, PlayIQ features glow-in-the-dark aliens and astronauts that charge in light and glow in darkness, plus LED-powered characters that light up for exciting day-to-night play experiences."
  },
  {
    question: "Where can I buy PlayIQ Magnetic Building Blocks?",
    answer: "PlayIQ is available exclusively on Amazon. Search for 'PlayIQ 181-Piece Magnetic Building Blocks' or visit our product page directly at amazon.com/dp/B0F3LV725Z."
  },
  {
    question: "Can all 6 scene designs in the guidebook be built with just this set?",
    answer: "Yes! Every scene shown in the guidebook—including 'Galactic Station' and 'Alien Base'—can be built using only the pieces included in this set. No additional purchases are required."
  }
];

const FAQ = () => {
  // Inject FAQ JSON-LD schema
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("faq-schema");
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

          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-primary text-glow-primary">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about PlayIQ Magnetic Building Blocks
            </p>
          </header>

          {/* FAQ Accordion */}
          <section aria-label="Frequently asked questions" className="max-w-3xl mx-auto">
            <HUDPanel variant="hero" glowColor="primary">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-primary/20"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </HUDPanel>
          </section>

          {/* Contact CTA */}
          <section className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
            >
              Contact Us
            </Link>
          </section>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default FAQ;
