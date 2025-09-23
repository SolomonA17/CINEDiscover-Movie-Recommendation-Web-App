# CineDiscover - Movie Recommendation Web App

A modern, responsive movie recommendation web app built with Next.js, TypeScript, and Tailwind CSS. Browse trending movies, get personalized recommendations, and manage your favorites with a beautiful, intuitive interface.

![image]("https://github.com/user-attachments/assets/5c8d372f-b7ae-4d0a-a21e-28eb4e562400")

## ✨ Features

- **🎬 Movie Discovery**: Browse trending and popular movies with real-time data from TMDB
- **🔍 Advanced Search**: Find movies by title with instant search results
- **💝 Favorites Management**: Save movies to favorites with persistent localStorage
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop experiences
- **🎨 Modern UI**: Clean, Apple-inspired design with smooth animations
- **⚡ Fast Performance**: Optimized images, lazy loading, and efficient API calls
- **🔗 Dynamic Routing**: Individual movie detail pages with recommendations
- **♿ Accessible**: Semantic HTML and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cinediscover
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   To get your TMDB API key:
   - Sign up at [TMDB](https://www.themoviedb.org/)
   - Go to Settings → API
   - Create a new API key (v3 auth)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
cinediscover/
├── app/                          # Next.js app directory
│   ├── favorites/               # Favorites page
│   ├── movies/[id]/            # Dynamic movie details pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── not-found.tsx           # 404 page
├── components/                  # Reusable UI components
│   ├── error-message.tsx       # Error handling component
│   ├── hero-section.tsx        # Homepage hero
│   ├── loading-skeleton.tsx    # Loading states
│   ├── movie-card.tsx          # Movie card component
│   ├── movie-grid.tsx          # Movie grid layout
│   ├── navigation.tsx          # Main navigation
│   └── search-bar.tsx          # Search functionality
├── hooks/                       # Custom React hooks
│   └── use-favorites.ts        # Favorites management
├── lib/                        # Utilities and API
│   ├── api.ts                 # TMDB API functions
│   ├── tmdb.ts                # TMDB configuration
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Utility functions
└── public/                     # Static assets
```

## 🔧 API Configuration

The app uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) for movie data.

### Required Environment Variables

```env
# .env.local
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

### API Endpoints Used

- `/trending/movie/week` - Trending movies
- `/movie/popular` - Popular movies
- `/movie/{id}` - Movie details
- `/movie/{id}/recommendations` - Related movies
- `/search/movie` - Movie search

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - CTAs and highlights
- **Secondary**: Gray scales for text and backgrounds
- **Accent**: Red (#EF4444) for favorites
- **Success**: Green (#10B981) for positive actions

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular (400) and Medium (500)
- **Responsive**: Fluid typography with clamp()

### Spacing
- **System**: 8px base unit (0.5rem)
- **Consistent**: Uses Tailwind's spacing scale
- **Responsive**: Adaptive spacing for different screens

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2-3 columns)
- **Desktop**: > 1024px (4-5 columns)
- **Large**: > 1280px (5+ columns)

### Features
- Touch-friendly interface on mobile
- Optimized navigation for all screen sizes
- Responsive images with Next.js Image optimization
- Mobile-first CSS approach

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

3. **Environment Variables**
   
   Add in Vercel dashboard:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to [Netlify](https://netlify.com)
   - Or connect your Git repository for automatic deploys

3. **Environment Variables**
   
   Add in Netlify dashboard under Site Settings > Environment Variables

### Manual Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint code
npm run lint
```

### Git Workflow

```bash
# Feature development
git checkout -b feat/new-feature
git commit -m "feat: add new feature"

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug description"

# Styling updates
git checkout -b style/ui-improvements
git commit -m "style: improve component styling"
```

## 🔍 API Rate Limits

TMDB API has the following limits:
- **Free tier**: 1,000 requests per day
- **Paid tier**: Higher limits available

The app implements efficient caching and request optimization to stay within limits.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Movies not loading**
- Check your TMDB API key in `.env.local`
- Verify API key is valid and active
- Check browser console for error messages

**Images not displaying**
- TMDB images require valid API access
- Check network tab for failed image requests
- Verify image URLs are correctly formatted

**Favorites not saving**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Check browser console for JavaScript errors

### Getting Help

- Check the [Issues](https://github.com/yourusername/cinediscover/issues) page
- Review TMDB API documentation
- Check browser developer tools for errors

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Imgbb](https://imgbb.com/) for placeholder images
- [Lucide React](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
