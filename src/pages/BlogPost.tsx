import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft, Calendar, User, Tag, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  seo_keywords: string[];
  long_tail_queries: string[];
  author_name: string | null;
  published_at: string | null;
  created_at: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

// Simple markdown renderer (basic implementation)
function renderMarkdown(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-foreground mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
    .replace(/\n/g, '<br/>');
  
  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<h') && !html.startsWith('<p')) {
    html = '<p class="text-muted-foreground leading-relaxed mb-4">' + html + '</p>';
  }
  
  return html;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setPost(data);
          
          // Update page meta tags
          document.title = `${data.title} | PlayIQ Blog`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && data.meta_description) {
            metaDesc.setAttribute("content", data.meta_description);
          }

          // Fetch related posts
          const { data: related } = await supabase
            .from("blog_posts")
            .select("id, title, slug, excerpt, featured_image_url, published_at, created_at")
            .eq("status", "published")
            .neq("id", data.id)
            .limit(3);
          
          setRelatedPosts(related || []);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <NebulaScene>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </NebulaScene>
    );
  }

  if (notFound || !post) {
    return (
      <NebulaScene>
        <div className="min-h-screen flex flex-col">
          <header className="pt-4 px-4">
            <HUDNav />
          </header>
          <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
            <HUDPanel variant="hero" glowColor="secondary" className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </HUDPanel>
          </main>
        </div>
      </NebulaScene>
    );
  }

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          <article className="max-w-3xl mx-auto">
            <HUDPanel variant="hero" glowColor="primary">
              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-background/50">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {post.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author_name}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }}
              />

              {/* Keywords */}
              {post.seo_keywords && post.seo_keywords.length > 0 && (
                <div className="mt-8 pt-6 border-t border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Topics</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.seo_keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </HUDPanel>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Related <span className="text-primary">Posts</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} to={`/blog/${related.slug}`}>
                      <HUDPanel 
                        variant="small" 
                        glowColor="secondary"
                        className="h-full transition-transform hover:scale-[1.02]"
                      >
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                          {related.title}
                        </h3>
                        {related.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {related.excerpt}
                          </p>
                        )}
                      </HUDPanel>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default BlogPostPage;
