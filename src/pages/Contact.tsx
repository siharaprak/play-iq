import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
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
              Contact <span className="text-primary text-glow-primary">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about PlayIQ? We'd love to hear from you!
            </p>
          </header>

          {/* Contact Options */}
          <section aria-label="Contact options" className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Support */}
              <HUDPanel variant="hero" glowColor="primary">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Mail className="w-12 h-12 text-primary" />
                      <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Email Support</h2>
                  <p className="text-muted-foreground">
                    For product questions, order inquiries, or general support
                  </p>
                  <a 
                    href="mailto:support@playiq.com"
                    className="inline-block text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    support@playiq.com
                  </a>
                </div>
              </HUDPanel>

              {/* Amazon Questions */}
              <HUDPanel variant="hero" glowColor="secondary">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <MessageSquare className="w-12 h-12 text-secondary" />
                      <div className="absolute -inset-2 bg-secondary/20 rounded-full blur-lg" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Amazon Orders</h2>
                  <p className="text-muted-foreground">
                    For order tracking, returns, or shipping questions
                  </p>
                  <a 
                    href="https://www.amazon.com/dp/B0F3LV725Z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-secondary hover:text-secondary/80 font-medium transition-colors"
                  >
                    Visit our Amazon Store
                  </a>
                </div>
              </HUDPanel>
            </div>

            {/* FAQ Link */}
            <div className="mt-8">
              <HUDPanel variant="default" glowColor="accent">
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-8 h-8 text-accent flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Have a common question?</h3>
                    <p className="text-sm text-muted-foreground">
                      Check our FAQ for quick answers about the product, safety, and compatibility.
                    </p>
                  </div>
                  <Link 
                    to="/faq"
                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    View FAQ →
                  </Link>
                </div>
              </HUDPanel>
            </div>
          </section>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Contact;
