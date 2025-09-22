import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMovieDetails, getMovieRecommendations } from '@/lib/api';
import { MovieDetailsClient } from './movie-details-client';
import { MovieGridSkeleton } from '@/components/loading-skeleton';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const [movieDetails, recommendations] = await Promise.all([
      getMovieDetails(params.id),
      getMovieRecommendations(params.id)
    ]);

    return (
      <div className="min-h-screen">
        <Suspense fallback={<div>Loading movie details...</div>}>
          <MovieDetailsClient 
            movie={movieDetails}
            recommendations={recommendations}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading movie:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: MoviePageProps) {
  try {
    const movie = await getMovieDetails(params.id);
    return {
      title: `${movie.title} - CineDiscover`,
      description: movie.overview,
    };
  } catch {
    return {
      title: 'Movie Not Found - CineDiscover',
      description: 'The requested movie could not be found.',
    };
  }
}