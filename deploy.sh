#!/bin/bash

echo "🚀 Competitor Analysis Webapp - Auto Deploy Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the competitor-webapp directory.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

echo -e "${BLUE}🔧 Installing Vercel CLI...${NC}"
npm install -g vercel

echo -e "${YELLOW}⚠️  You'll need to answer a few questions for Vercel...${NC}"
echo -e "${GREEN}✅ When prompted:${NC}"
echo "   - Set up and deploy? → Y"
echo "   - Which scope? → (choose your account)"
echo "   - Link to existing project? → N"
echo "   - Project name? → competitor-analysis"
echo "   - Directory? → ./ (just press Enter)"
echo "   - Override settings? → N"
echo ""

echo -e "${BLUE}🚀 Starting Vercel deployment...${NC}"
vercel

echo ""
echo -e "${YELLOW}🔑 Now let's add your environment variables...${NC}"
echo -e "${GREEN}✅ Adding Supabase URL...${NC}"
vercel env add NEXT_PUBLIC_SUPABASE_URL

echo -e "${GREEN}✅ Adding Supabase Anon Key...${NC}"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

echo -e "${BLUE}🌐 Deploying to production...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${BLUE}Your competitor analysis webapp is now live!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Your live URL will be shown above"
echo "2. Test the webapp by visiting the URL"
echo "3. The app will connect to your Supabase database"
echo "4. Start analyzing competitor ads!"
echo ""
echo -e "${GREEN}✨ Enjoy your amazing competitor analysis tool!${NC}"
