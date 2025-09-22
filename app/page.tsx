'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/types';
import { getTrendingMovies, getPopularMovies, searchMovies } from '@/lib/api';
import { HeroSection } from '@/components/hero-section';
import { SearchBar } from '@/components/search-bar';
import { MovieGrid } from '@/components/movie-grid';
import { MovieGridSkeleton } from '@/components/loading-skeleton';
import { ErrorMessage } from '@/components/error-message';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [trending, popular] = await Promise.all([
        getTrendingMovies('week'),
        getPopularMovies(1).then(data => data.results)
      ]);
      
      setTrendingMovies(trending);
      setPopularMovies(popular);
    } catch (error) {
      setError('Failed to load movies. Please check your API configuration and try again.');
      console.error('Error loading movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage 
          message={error}
          onRetry={loadMovies}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for movies..."
          />
        </div>
      </div>

      {/* Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {searchQuery ? (
          <MovieGrid 
            movies={searchResults} 
            title={`Search results for "${searchQuery}"`} 
          />
        ) : isLoading ? (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 animate-pulse rounded w-64"></div>
              <MovieGridSkeleton />
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <MovieGrid 
              movies={trendingMovies} 
              title="Trending This Week" 
            />
            <MovieGrid 
              movies={popularMovies} 
              title="Popular Movies" 
            />
          </div>
        )}
      </div>
    </div>
  );
}