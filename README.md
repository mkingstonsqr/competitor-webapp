# Meta Ads Competitor Analysis Dashboard

A modern web application for analyzing Meta advertising data with AI-powered insights, built with Next.js, React, and Tailwind CSS.

## Features

- 🔍 **Search & Filter**: Search ads by content, page name, or URL
- 📊 **Real-time Data**: Direct integration with Supabase database
- 🤖 **AI Insights**: OpenAI-powered analysis of advertising trends (optional)
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed
- 🎨 **Modern UI**: Clean, Twitter-like interface with smooth animations

## Quick Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Optional (for AI insights):
- `NEXT_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_API_KEY`: Your OpenAI API key (server-side)

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the application: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

## Database Setup

Make sure your Supabase database has a `meta_ads` table with the following structure:

```sql
CREATE TABLE meta_ads (
  id SERIAL PRIMARY KEY,
  library_id TEXT UNIQUE,
  ad_creative_body TEXT,
  page_name TEXT,
  ad_snapshot_url TEXT,
  ad_delivery_start_time TIMESTAMP,
  delivery_by_region JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Features Overview

### Search & Filtering
- Search across ad content, page names, and URLs
- Filter by specific Facebook pages
- Real-time filtering as you type

### AI Insights (Optional)
- Powered by OpenAI GPT-3.5 Turbo
- Analyzes advertising trends and strategies
- Provides actionable recommendations
- Automatically disabled if OpenAI API key is not provided

### Data Visualization
- Clean card-based layout for easy scanning
- Status indicators for active/inactive ads
- Direct links to ad snapshots on Facebook
- Responsive design for all screen sizes

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase
- **AI**: OpenAI API (optional)
- **Deployment**: Vercel/Netlify ready

## Troubleshooting

### Common Issues

1. **Build Errors**: Make sure all environment variables are properly set
2. **Database Connection**: Verify your Supabase URL and API key
3. **AI Insights Not Working**: Check your OpenAI API key and billing status

### Environment Variables Not Loading

If environment variables aren't loading properly:

1. Make sure `.env.local` exists and has the correct format
2. Restart your development server after adding new variables
3. For production, set variables in your deployment platform's dashboard

## License

MIT License - feel free to use this project for your own needs.
