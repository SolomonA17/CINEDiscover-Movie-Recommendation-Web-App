'use client';

import Image from 'next/image';
import { Star, Clock, Calendar, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MovieDetails, Movie } from '@/lib/types';
import { getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import { useFavorites } from '@/hooks/use-favorites';
import { MovieGrid } from '@/components/movie-grid';
import { cn } from '@/lib/utils';

interface MovieDetailsClientProps {
  movie: MovieDetails;
  recommendations: Movie[];
}

export function MovieDetailsClient({ movie, recommendations }: MovieDetailsClientProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Poster */}
              <div className="flex-shrink-0">
                <div className="relative w-80 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 space-y-6 text-white">
                {/* Back Button */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Movies
                </Link>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-xl italic text-white/90">"{movie.tagline}"</p>
                )}

                {/* Movie Stats */}
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-white/60">({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-lg leading-relaxed max-w-3xl text-white/90">
                  {movie.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleFavoriteClick}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200",
                      isMovieFavorite
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isMovieFavorite && "fill-current")} />
                    {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Movie Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                  <p className="text-gray-600">{movie.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Original Language</h3>
                  <p className="text-gray-600 uppercase">{movie.original_language}</p>
                </div>
                {movie.budget > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Budget</h3>
                    <p className="text-gray-600">{formatCurrency(movie.budget)}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Revenue</h3>
                    <p className="text-gray-600">{formatCurrency(movie.revenue)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Production Companies</h3>
                <div className="space-y-3">
                  {movie.production_companies.slice(0, 5).map((company) => (
                    <div key={company.id} className="text-gray-700">
                      {company.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Countries */}
            {movie.production_countries.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Countries</h3>
                <div className="space-y-2">
                  {movie.production_countries.map((country) => (
                    <div key={country.iso_3166_1} className="text-gray-700">
                      {country.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovieGrid 
            movies={recommendations.slice(0, 10)} 
            title="You might also like" 
          />
        </div>
      )}
    </div>
  );
}