# 🌾 CentralAlbertaMarkets.ca

Full-stack Next.js web app for Central Alberta farmers markets.

## Features

- **Clean homepage** showing all Central Alberta farmers markets with schedules
- **Interactive map** using Leaflet with market locations
- **Whats Fresh This Weekend** section
- **User subscription** at $20/month using Stripe
  - Free tier: basic schedule
  - Paid tier: daily email/text alerts for specific vendors/items, early deal access, private map layers
- **Vendor dashboard** for market managers to update today's available items in real-time
- **"Find a First Date Spot"** button linking to the dating site

## Tech Stack

- Next.js 14 (App Router)
- PostgreSQL (Supabase or Railway)
- Prisma ORM
- Stripe for payments
- Leaflet for maps
- Cheerio for web scraping (scheduled cron)

## Getting Started

```bash
# Install dependencies
npm install

# Set up database
cp .env.example .env
# Edit .env with your database URL and Stripe keys

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Run development server
npm run dev
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@host:5432/database
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment (Railway)

1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Deploy with `npm run build`
4. Add a PostgreSQL service
5. Run migrations: `npx prisma migrate deploy`

## Theme

Matches **Central Alberta After Dark** dating site:
- Primary: `#FFEB43` (yellow)
- Secondary: `#003594` (deep blue)
- Background: `#0a0a1a` (dark navy)

## License

MIT# test
