# 🚀 Competitor Analysis Webapp

A stunning, X.com-inspired competitor analysis platform built for Square Intelligence. Track, analyze, and outperform your competition with AI-powered insights.

## ✨ Features

- **🎨 X.com-inspired Design**: Clean, modern black & white interface
- **📊 Real-time Data**: Live competitor ad tracking from Supabase
- **🤖 AI Insights**: OpenAI-powered strategic analysis
- **🔍 Advanced Filtering**: Filter by brand, country, media type, and more
- **📱 Responsive**: Perfect on desktop, tablet, and mobile
- **⚡ Fast**: Built with Next.js 14 and optimized for performance

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4 for insights
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### 1. Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd competitor-webapp

# Install dependencies
npm install
\`\`\`

### 2. Environment Setup

Create a \`.env.local\` file in the root directory:

\`\`\`bash
# Copy the example file
cp env.example .env.local
\`\`\`

Update \`.env.local\` with your credentials:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cgpytyopncnrfvwymcel.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI Configuration (for AI insights)
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 🌐 Deploy to Vercel (Free)

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/competitor-webapp.git
   git push -u origin main
   \`\`\`

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Option 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY

# Redeploy with env vars
vercel --prod
\`\`\`

## 📊 Database Setup

Your Supabase database should have a \`meta_ads\` table with these columns:

\`\`\`sql
CREATE TABLE meta_ads (
  id SERIAL PRIMARY KEY,
  library_id TEXT UNIQUE NOT NULL,
  ad_library_url TEXT,
  primary_thumbnail TEXT,
  media_type TEXT,
  brand TEXT,
  ad_text TEXT,
  ad_title TEXT,
  is_active BOOLEAN DEFAULT false,
  scraped_at TIMESTAMPTZ,
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  dataset_id TEXT,
  dataset_name TEXT
);

-- Add indexes for performance
CREATE INDEX idx_meta_ads_brand ON meta_ads(brand);
CREATE INDEX idx_meta_ads_imported_at ON meta_ads(imported_at);
CREATE INDEX idx_meta_ads_is_active ON meta_ads(is_active);
\`\`\`

## 🎯 Key Components

### Navigation
- Clean, responsive navigation bar
- Mobile-friendly hamburger menu
- Brand logo and action buttons

### Ad Tiles
- Beautiful image tiles with hover effects
- Overlay information and metadata
- Selection system for AI analysis
- Modal views for detailed inspection

### AI Insights Panel
- Real-time analysis of selected ads
- Strategic recommendations for Square
- Competitive threat identification
- Opportunity highlighting

### Filter System
- Advanced filtering by multiple criteria
- Date range selection
- Media type filtering
- Quick filter presets

## 🔧 Customization

### Colors & Branding
Update \`tailwind.config.js\` to customize colors:

\`\`\`js
theme: {
  extend: {
    colors: {
      'brand-primary': '#your-color',
      'brand-secondary': '#your-color',
    }
  }
}
\`\`\`

### AI Insights
Modify \`app/api/insights/route.ts\` to customize AI analysis:

\`\`\`typescript
const prompt = \`
Your custom analysis prompt here...
\`
\`\`\`

## 📱 Mobile Optimization

The app is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized image loading
- Smooth animations on all devices

## 🚀 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads
- **Caching**: Intelligent caching strategies
- **Lazy Loading**: Components load as needed

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- API route protection
- Input validation and sanitization

## 📈 Analytics (Optional)

Add Google Analytics by updating \`.env.local\`:

\`\`\`env
GOOGLE_ANALYTICS_ID=your_ga_id_here
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your Supabase URL and anon key
   - Check if your table exists and has the correct schema

2. **Images Not Loading**
   - Update \`next.config.js\` with your image domains
   - Check if image URLs are accessible

3. **AI Insights Not Working**
   - Verify your OpenAI API key
   - Check API usage limits

### Debug Mode

Run with debug logging:

\`\`\`bash
DEBUG=* npm run dev
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your projects!

## 🎉 What's Next?

- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: More detailed performance metrics
- **Export Features**: PDF and CSV export capabilities
- **Team Collaboration**: Multi-user support and sharing
- **Mobile App**: React Native version

---

Built with ❤️ for Square Intelligence Team
