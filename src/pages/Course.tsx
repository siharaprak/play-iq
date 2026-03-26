import { NebulaScene, HUDNav, HUDPanel, HUDButton, HoloIcon } from "@/components/hud";
import { Brain, Zap, Sparkles, Check, Star, BookOpen, Wrench, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const valueProps = [
  {
    icon: Brain,
    title: "Learn Smarter & Faster",
    description: "AI adapts to your child's unique learning pace and style, making education more efficient and personalized.",
    color: "primary" as const,
  },
  {
    icon: Zap,
    title: "Build Future-Ready Skills",
    description: "Master the AI tools that are shaping tomorrow's workforce. Give your child a head start in the digital age.",
    color: "secondary" as const,
  },
  {
    icon: Sparkles,
    title: "Fun & Engaging",
    description: "Gamified learning experiences that kids actually enjoy. Better engagement means better retention.",
    color: "accent" as const,
  },
];

const curriculumModules = [
  { title: "Introduction to AI Tools", lessons: 5, icon: BookOpen },
  { title: "Prompt Engineering Basics", lessons: 6, icon: Wrench },
  { title: "AI for Homework & Research", lessons: 5, icon: Brain },
  { title: "Creative AI Projects", lessons: 4, icon: Sparkles },
  { title: "Advanced Custom AI Training", lessons: 4, icon: Cpu, powerSuiteOnly: true },
];

const Course = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Education for Kids</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Future-Proof Your Child's Skills{" "}
                <span className="text-primary text-glow-primary">with AI</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Empower your child to learn smarter, faster, and have more fun with AI-powered education. 
                The skills they learn today will shape their tomorrow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?tier=power_suite">
                  <HUDButton variant="glow" size="lg">
                    Start Learning Today
                    <ArrowRight className="w-5 h-5" />
                  </HUDButton>
                </Link>
                <a href="#pricing">
                  <HUDButton variant="outline" size="lg">
                    View Pricing
                  </HUDButton>
                </a>
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why AI Education <span className="text-primary">Matters</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                In a world increasingly shaped by artificial intelligence, 
                giving your child AI literacy is one of the best investments you can make.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {valueProps.map((prop) => {
                const Icon = prop.icon;
                return (
                  <HUDPanel key={prop.title} glowColor={prop.color} className="h-full">
                    <div className="text-center py-4">
                      <HoloIcon icon={Icon} label="" color={prop.color} size="lg" />
                      <h3 className="text-xl font-bold text-foreground mt-4 mb-2">{prop.title}</h3>
                      <p className="text-muted-foreground text-sm">{prop.description}</p>
                    </div>
                  </HUDPanel>
                );
              })}
            </div>
          </section>

          {/* Curriculum Overview Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What Your Child Will <span className="text-primary">Learn</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive curriculum covers everything from AI basics to advanced model training, 
                taught in bite-sized, engaging lessons.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {curriculumModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <HUDPanel 
                    key={module.title} 
                    variant="small"
                    glowColor={module.powerSuiteOnly ? "secondary" : "primary"}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{module.title}</h3>
                          {module.powerSuiteOnly && (
                            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                              Power Suite
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{module.lessons} lessons</p>
                      </div>
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </HUDPanel>
                );
              })}
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="container mx-auto px-4 py-16 pb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Choose Your <span className="text-primary">Plan</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start with a single tool mastery track, or unlock the full power of AI education.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Tier 1: Single Tool Mastery */}
              <HUDPanel className="relative">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Single Tool Mastery</h3>
                  <p className="text-muted-foreground mb-6">Focus on mastering one AI tool at a time</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$20</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Access to one learning track</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Weekly structured lessons</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Basic assessments & quizzes</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </li>
                  </ul>
                  
                  <Link to="/auth?tier=single_tool" className="block">
                    <HUDButton variant="outline" className="w-full">
                      Get Started
                    </HUDButton>
                  </Link>
                </div>
              </HUDPanel>

              {/* Tier 2: AI Power Suite */}
              <HUDPanel glowColor="secondary" className="relative">
                {/* Best Value Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    BEST VALUE
                  </div>
                </div>
                
                <div className="p-6 pt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">AI Power Suite</h3>
                  <p className="text-muted-foreground mb-6">Complete AI education package</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$50</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <div className="mb-6 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                    <p className="text-sm font-medium text-secondary mb-2">Includes 3 Learning Tracks:</p>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>1. Learn Smarter & Faster with AI</li>
                      <li>2. AI Tools & Prompt Engineering</li>
                      <li>3. Custom AI Training</li>
                    </ul>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>All learning tracks included</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Unlimited access to all content</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                  
                  <Link to="/auth?tier=power_suite" className="block">
                    <HUDButton variant="glow" className="w-full">
                      Unlock Full Access
                    </HUDButton>
                  </Link>
                </div>
              </HUDPanel>
            </div>
          </section>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Course;
