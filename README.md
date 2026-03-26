# PlayIQ

STEM Magnetic Building Blocks platform for kids ages 3+. Built with Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

This project is deployed on **Vercel**. Push to `main` to trigger a deploy.

### Environment Variables (Vercel)

Set the following in your Vercel project settings:

- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Your Supabase anon/public key

### Supabase Edge Functions

The `generate-blog` edge function requires:

- `GEMINI_API_KEY` — Google Gemini API key for AI blog generation
