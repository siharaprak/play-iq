import { useState, useEffect } from "react";
import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, Plus, Sparkles, Edit, Trash2, Eye, 
  Loader2, Save, Send, X
} from "lucide-react";
import { Link } from "react-router-dom";

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
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const BlogManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  // AI Generation state
  const [topic, setTopic] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    meta_description: "",
    featured_image_url: "",
    seo_keywords: "",
    long_tail_queries: "",
    author_name: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function generateBlogPost() {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for the blog post",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ topic, additionalContext }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Generation failed");
      }

      const generatedData = await response.json();

      // Open edit modal with generated content
      setEditingPost(null);
      setEditForm({
        title: generatedData.title,
        slug: generatedData.slug,
        content: generatedData.content,
        excerpt: generatedData.excerpt,
        meta_description: generatedData.meta_description,
        featured_image_url: "",
        seo_keywords: generatedData.seo_keywords.join(", "),
        long_tail_queries: generatedData.long_tail_queries.join(", "),
        author_name: "",
        status: "draft",
      });
      setEditModalOpen(true);
      setTopic("");
      setAdditionalContext("");

      toast({
        title: "Content generated!",
        description: "Review and edit the generated post before publishing",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  }

  function openEditModal(post: BlogPost) {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      content: post.content || "",
      excerpt: post.excerpt || "",
      meta_description: post.meta_description || "",
      featured_image_url: post.featured_image_url || "",
      seo_keywords: post.seo_keywords?.join(", ") || "",
      long_tail_queries: post.long_tail_queries?.join(", ") || "",
      author_name: post.author_name || "",
      status: post.status as "draft" | "published",
    });
    setEditModalOpen(true);
  }

  function openNewPostModal() {
    setEditingPost(null);
    setEditForm({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      meta_description: "",
      featured_image_url: "",
      seo_keywords: "",
      long_tail_queries: "",
      author_name: "",
      status: "draft",
    });
    setEditModalOpen(true);
  }

  async function savePost() {
    if (!editForm.title.trim() || !editForm.slug.trim()) {
      toast({
        title: "Required fields",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title: editForm.title,
        slug: editForm.slug,
        content: editForm.content || null,
        excerpt: editForm.excerpt || null,
        meta_description: editForm.meta_description || null,
        featured_image_url: editForm.featured_image_url || null,
        seo_keywords: editForm.seo_keywords
          ? editForm.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean)
          : [],
        long_tail_queries: editForm.long_tail_queries
          ? editForm.long_tail_queries.split(",").map((q) => q.trim()).filter(Boolean)
          : [],
        author_name: editForm.author_name || null,
        status: editForm.status,
        published_at: editForm.status === "published" ? new Date().toISOString() : null,
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        if (error) throw error;
        toast({ title: "Post updated!" });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);
        if (error) throw error;
        toast({ title: "Post created!" });
      }

      setEditModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Post deleted" });
      fetchPosts();
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Back Link */}
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Page Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Website SEAL <span className="text-primary text-glow-primary">Generator</span>
            </h1>
            <p className="text-muted-foreground">
              Create and manage SEO-optimized content with AI assistance
            </p>
          </header>

          {/* AI Generation Panel */}
          <section className="mb-8">
            <HUDPanel variant="hero" glowColor="accent" className="max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold text-foreground">AI SEAL Generator</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Benefits of STEM toys for early childhood development"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      disabled={generating}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="context">Additional Context (optional)</Label>
                    <Textarea
                      id="context"
                      placeholder="Any specific points to cover, target keywords, or audience notes..."
                      value={additionalContext}
                      onChange={(e) => setAdditionalContext(e.target.value)}
                      disabled={generating}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={generateBlogPost} 
                    disabled={generating || !topic.trim()}
                    className="w-full"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Blog Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </HUDPanel>
          </section>

          {/* Posts List */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">All Posts</h2>
              <Button onClick={openNewPostModal} size="sm">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <HUDPanel variant="default" glowColor="secondary" className="text-center py-12">
                <p className="text-muted-foreground">No blog posts yet. Generate one with AI or create manually!</p>
              </HUDPanel>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <HUDPanel key={post.id} variant="small" glowColor="primary">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground truncate">{post.title}</h3>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          /{post.slug}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {post.status === "published" && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </HUDPanel>
                ))}
              </div>
            )}
          </section>
        </main>

        <div className="h-12" />
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingPost ? "Edit Post" : "New Post"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-slug">Slug *</Label>
                <Input
                  id="edit-slug"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-excerpt">Excerpt</Label>
              <Input
                id="edit-excerpt"
                value={editForm.excerpt}
                onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                placeholder="Short preview for blog listings"
              />
            </div>

            <div>
              <Label htmlFor="edit-meta">Meta Description</Label>
              <Input
                id="edit-meta"
                value={editForm.meta_description}
                onChange={(e) => setEditForm({ ...editForm, meta_description: e.target.value })}
                placeholder="SEO meta description (150-160 chars)"
              />
            </div>

            <div>
              <Label htmlFor="edit-content">Content (Markdown)</Label>
              <Textarea
                id="edit-content"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-keywords">SEO Keywords (comma-separated)</Label>
                <Input
                  id="edit-keywords"
                  value={editForm.seo_keywords}
                  onChange={(e) => setEditForm({ ...editForm, seo_keywords: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-queries">Long-tail Queries (comma-separated)</Label>
                <Input
                  id="edit-queries"
                  value={editForm.long_tail_queries}
                  onChange={(e) => setEditForm({ ...editForm, long_tail_queries: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-image">Featured Image URL</Label>
                <Input
                  id="edit-image"
                  value={editForm.featured_image_url}
                  onChange={(e) => setEditForm({ ...editForm, featured_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="edit-author">Author Name</Label>
                <Input
                  id="edit-author"
                  value={editForm.author_name}
                  onChange={(e) => setEditForm({ ...editForm, author_name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="edit-status"
                checked={editForm.status === "published"}
                onCheckedChange={(checked) =>
                  setEditForm({ ...editForm, status: checked ? "published" : "draft" })
                }
              />
              <Label htmlFor="edit-status">Publish immediately</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button onClick={savePost} disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editForm.status === "published" ? (
                  <Send className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editForm.status === "published" ? "Publish" : "Save Draft"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </NebulaScene>
  );
};

export default BlogManager;
