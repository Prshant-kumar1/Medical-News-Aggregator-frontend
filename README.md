# Medical News Aggregator - Frontend

A modern, responsive Next.js application for aggregating and displaying medical news from various trusted sources.

## Tech Stack

- **Framework**: Next.js 14.0.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Features

- 📰 Real-time medical news aggregation
- 🔍 Advanced search functionality
- 📂 Article categorization
- 📊 Trending and latest articles
- 🎨 Modern, responsive UI with smooth animations
- 🚀 Optimized performance with Next.js

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Prshant-kumar1/Medical-News-Aggregator-frontend.git
cd Medical-News-Aggregator-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com`)
4. Deploy

### Environment Variables

- `NEXT_PUBLIC_API_URL`: The URL of your backend API (required)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── category/          # Category pages
│   ├── search/            # Search functionality
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── services/              # API services
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## API Integration

The frontend connects to the backend API through the `services/api.ts` file. Available endpoints:

- `getArticles()` - Get paginated articles with filters
- `getLatestArticles()` - Get latest articles
- `getTrendingArticles()` - Get trending articles
- `getTodayArticles()` - Get today's articles
- `getWeekArticles()` - Get articles from the past week
- `getCategories()` - Get all categories
- `getCategoryArticles()` - Get articles by category
- `getSources()` - Get all news sources

## License

MIT
