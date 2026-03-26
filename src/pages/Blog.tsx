import { useState, useEffect } from "react";
import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  seo_keywords: string[];
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, featured_image_url, seo_keywords, published_at, created_at")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
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
              PlayIQ <span className="text-primary text-glow-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              STEM learning tips, creative building ideas, and updates from the PlayIQ universe
            </p>
          </header>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <section aria-label="Blog launch announcement">
              <HUDPanel variant="hero" glowColor="primary" className="max-w-2xl mx-auto text-center">
                <div className="space-y-6 py-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Coming Soon!
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We're preparing exciting content about STEM education, creative building projects, 
                    and the science behind magnetic construction. Check back soon for updates!
                  </p>
                </div>
              </HUDPanel>
            </section>
          ) : (
            <section aria-label="Blog posts" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <HUDPanel 
                    variant="default" 
                    glowColor="primary" 
                    className="h-full transition-transform hover:scale-[1.02]"
                  >
                    {post.featured_image_url && (
                      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-background/50">
                        <img 
                          src={post.featured_image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {post.seo_keywords && post.seo_keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.seo_keywords.slice(0, 3).map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </HUDPanel>
                </Link>
              ))}
            </section>
          )}
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Blog;
