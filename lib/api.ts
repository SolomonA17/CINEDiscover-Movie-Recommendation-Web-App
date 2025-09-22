import { TMDBResponse, Movie, MovieDetails } from './types';
import { fetchFromTMDB } from './tmdb';

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
  try {
    const data: TMDBResponse = await fetchFromTMDB(`/trending/movie/${timeWindow}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  try {
    const data = await fetchFromTMDB(`/movie/popular?page=${page}`);
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  try {
    const data = await fetchFromTMDB(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function getMovieRecommendations(movieId: string): Promise<Movie[]> {
  try {
    const data: TMDBResponse = await fetchFromTMDB(`/movie/${movieId}/recommendations`);
    return data.results;
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw error;
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
  try {
    const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}