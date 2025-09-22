'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from '@/lib/types';
import { getBackdropUrl } from '@/lib/tmdb';
import { getTrendingMovies } from '@/lib/api';

export function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedMovie() {
      try {
        const trendingMovies = await getTrendingMovies('week');
        if (trendingMovies.length > 0) {
          // Get a random movie from the top 5 trending
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingMovies.length));
          setFeaturedMovie(trendingMovies[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading featured movie:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedMovie();
  }, []);

  if (isLoading || !featuredMovie) {
    return (
      <div className="relative h-[60vh] bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading featured movie...</div>
        </div>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(featuredMovie.backdrop_path, 'w1280');

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Movie Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {featuredMovie.title}
            </h1>

            {/* Rating and Year */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500 rounded-full">
                <Star className="w-4 h-4 fill-white text-white" />
                <span className="text-black font-semibold text-sm">
                  {featuredMovie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-white/80 text-lg">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
            </div>

            {/* Overview */}
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 line-clamp-3">
              {featuredMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/movies/${featuredMovie.id}`}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-black" />
                Watch Now
              </Link>
              <Link
                href={`/movies/${featuredMovie.id}`}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}