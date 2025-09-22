'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { Movie } from '@/lib/types';
import { getImageUrl } from '@/lib/tmdb';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const posterUrl = getImageUrl(movie.poster_path);
  const isMovieFavorite = isFavorite(movie.id);

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {!imageError ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className={cn(
                "object-cover transition-all duration-300 group-hover:scale-110",
                imageLoading ? "blur-sm" : "blur-0"
              )}
              priority={priority}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40"
            aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all duration-200",
                isMovieFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-white hover:text-red-300"
              )}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {movie.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-xl transition-colors duration-300" />
      </div>
    </Link>
  );
}