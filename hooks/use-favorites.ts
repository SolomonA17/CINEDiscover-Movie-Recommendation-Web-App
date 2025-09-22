'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/types';

const FAVORITES_KEY = 'movie-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (newFavorites: Movie[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  const addToFavorites = (movie: Movie) => {
    if (!isFavorite(movie.id)) {
      const newFavorites = [...favorites, movie];
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (movieId: number) => {
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  return {
    favorites,
    isLoaded,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}