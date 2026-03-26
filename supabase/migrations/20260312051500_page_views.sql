-- Create page_views table for lightweight first-party analytics
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  title text,
  session_id text NOT NULL,
  referrer text,
  user_agent text,
  device_type text DEFAULT 'unknown',
  viewport text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for performant queries
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views (path);
CREATE INDEX idx_page_views_session_id ON public.page_views (session_id);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to insert page views for tracking
CREATE POLICY "Allow public page view inserts"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow only admins to read analytics data
CREATE POLICY "Allow admin select on page_views"
  ON public.page_views
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
