import { HUDPanel } from "@/components/hud";
import { Users, Heart, MessageCircle, Share2, Award, Sparkles } from "lucide-react";

const posts = [
  {
    id: 1,
    author: "Alex M.",
    avatar: "A",
    time: "2 hours ago",
    content: "Just completed my first AI project! Used ChatGPT to help me write a story about space exploration. So proud of how it turned out! 🚀",
    likes: 24,
    comments: 8,
    badge: "Rising Star",
  },
  {
    id: 2,
    author: "Sarah K.",
    avatar: "S",
    time: "5 hours ago",
    content: "Pro tip: When prompting AI, be specific about what you want! I learned this in Module 2 and it changed everything.",
    likes: 42,
    comments: 12,
    badge: null,
  },
  {
    id: 3,
    author: "PlayIQ Team",
    avatar: "P",
    time: "1 day ago",
    content: "🎉 New module alert! 'Creative AI Projects' is now live. Learn to create amazing art and stories with AI assistance!",
    likes: 156,
    comments: 34,
    badge: "Official",
  },
];

const Community = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Community <span className="text-primary text-glow-primary">Hub</span>
        </h1>
        <p className="text-muted-foreground">
          Connect with fellow learners and share your journey
        </p>
      </div>

      {/* Quick Stats */}
      <HUDPanel className="mb-6" glowColor="accent">
        <div className="flex items-center justify-around py-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">1,247</p>
            <p className="text-sm text-muted-foreground">Members</p>
          </div>
          <div className="w-px h-12 bg-primary/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">Online Now</p>
          </div>
          <div className="w-px h-12 bg-primary/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">342</p>
            <p className="text-sm text-muted-foreground">Posts Today</p>
          </div>
        </div>
      </HUDPanel>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <HUDPanel key={post.id}>
            <div className="space-y-3">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{post.author}</span>
                    {post.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        post.badge === "Official" 
                          ? "bg-secondary/20 text-secondary" 
                          : "bg-accent/20 text-accent"
                      }`}>
                        {post.badge === "Official" ? <Sparkles className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                        {post.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{post.time}</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-6 pt-2 border-t border-primary/10">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </HUDPanel>
        ))}
      </div>
    </div>
  );
};

export default Community;
