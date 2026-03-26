import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client to verify user role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user from JWT
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (roleError || !roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { topic, additionalContext } = await req.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert SEO and AEO (Answer Engine Optimization) blog writer for PlayIQ, a company that sells educational magnetic building blocks for children and offers AI-powered STEM courses.

Your writing style:
- Direct and no-fluff
- Conversational but professional
- Parent-friendly (target audience: parents of kids 3-7)
- Educational yet engaging

AEO Rules (critical for AI search visibility):
- Use question-style H2 and H3 headings (e.g., "What makes magnetic blocks educational?")
- Keep paragraphs under 80 words
- Front-load answers at the start of each section
- Include numbered lists and bullet points where appropriate
- Write content that could be directly quoted by AI assistants

Content Structure:
1. Hook (engaging opening that addresses the reader's problem)
2. Atomic sections (each section answers ONE question completely)
3. Practical tips or actionable advice
4. CTA mentioning PlayIQ products or courses naturally

Output must be valid JSON matching the tool schema exactly.`;

    const userPrompt = `Generate a comprehensive, AEO-optimized blog post about: "${topic}"
${additionalContext ? `\nAdditional context: ${additionalContext}` : ""}

The post should be 800-1200 words, well-structured for both human readers and AI systems.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_post",
              description: "Create a structured blog post with all SEO and AEO elements",
              parameters: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "SEO-optimized title, 50-60 characters ideal",
                  },
                  metaDescription: {
                    type: "string",
                    description: "Meta description for SEO, 150-160 characters",
                  },
                  excerpt: {
                    type: "string",
                    description: "Short preview excerpt for blog listings, 100-150 characters",
                  },
                  content: {
                    type: "string",
                    description: "Full blog post content in markdown format",
                  },
                  seoKeywords: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 SEO keywords",
                  },
                  longTailQueries: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 long-tail search queries this post answers",
                  },
                },
                required: ["title", "metaDescription", "excerpt", "content", "seoKeywords", "longTailQueries"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_blog_post" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI generation failed");
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("Invalid AI response structure");
    }

    const blogData = JSON.parse(toolCall.function.arguments);

    // Generate unique slug
    const baseSlug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60);

    const timestamp = Date.now().toString(36);
    const slug = `${baseSlug}-${timestamp}`;

    console.log("Generated blog post:", blogData.title);

    return new Response(
      JSON.stringify({
        title: blogData.title,
        slug,
        content: blogData.content,
        excerpt: blogData.excerpt,
        meta_description: blogData.metaDescription,
        seo_keywords: blogData.seoKeywords,
        long_tail_queries: blogData.longTailQueries,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("generate-blog error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
