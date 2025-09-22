'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { MovieGrid } from '@/components/movie-grid';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-4xl font-bold text-gray-900">Your Favorites</h1>
        </div>
        <p className="text-gray-600 text-lg">
          {favorites.length === 0 
            ? "You haven't added any movies to your favorites yet." 
            : `You have ${favorites.length} favorite movie${favorites.length === 1 ? '' : 's'}.`
          }
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No favorites yet</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start browsing movies and click the heart icon to add them to your favorites!
          </p>
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Movies
          </a>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}