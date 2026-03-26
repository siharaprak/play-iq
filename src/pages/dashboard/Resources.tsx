import { HUDPanel, HoloIcon } from "@/components/hud";
import { FileText, Download, FileImage, FileSpreadsheet, Book } from "lucide-react";

const resources = [
  { 
    id: 1, 
    name: "AI Prompt Cheat Sheet", 
    description: "Quick reference for crafting effective prompts",
    type: "PDF",
    icon: FileText,
    size: "1.2 MB",
    category: "Guide",
  },
  { 
    id: 2, 
    name: "Learning Tracker Worksheet", 
    description: "Track your AI learning progress",
    type: "PDF",
    icon: FileSpreadsheet,
    size: "450 KB",
    category: "Worksheet",
  },
  { 
    id: 3, 
    name: "AI Tools Comparison Chart", 
    description: "Compare popular AI tools and their features",
    type: "PDF",
    icon: FileImage,
    size: "2.1 MB",
    category: "Reference",
  },
  { 
    id: 4, 
    name: "Parent's Guide to AI Education", 
    description: "Help your child navigate AI safely",
    type: "PDF",
    icon: Book,
    size: "3.5 MB",
    category: "Guide",
  },
];

const categories = ["All", "Guide", "Worksheet", "Reference"];

const Resources = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Resource <span className="text-primary text-glow-primary">Library</span>
        </h1>
        <p className="text-muted-foreground">
          Download PDFs, worksheets, and learning materials
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              category === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/20 text-muted-foreground hover:bg-muted/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <HUDPanel 
              key={resource.id} 
              variant="small" 
              className="hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-0.5 rounded-full">
                      {resource.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{resource.size}</span>
                  </div>
                  <h3 className="font-bold text-foreground truncate">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                </div>
                <button className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </HUDPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
