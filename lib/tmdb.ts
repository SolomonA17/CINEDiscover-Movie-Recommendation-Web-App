const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const TMDB_CONFIG = {
  BASE_URL: TMDB_BASE_URL,
  IMAGE_BASE_URL: TMDB_IMAGE_BASE_URL,
  API_KEY: TMDB_API_KEY,
};

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: string = 'w1280'): string {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function fetchFromTMDB(endpoint: string) {
  if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
    throw new Error('TMDB API key is missing or not configured. Please add your API key to .env.local file.');
  }
  
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const separator = endpoint.includes('?') ? '&' : '?';
  
  const response = await fetch(`${url}${separator}api_key=${TMDB_API_KEY}`);
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API key. Please check your API key in .env.local file.');
    }
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}