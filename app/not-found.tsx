import Link from 'next/link';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <Film className="w-24 h-24 text-gray-400 mx-auto" />
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Movie Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Sorry, the movie you're looking for doesn't exist or has been removed from our database.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Movies
        </Link>
      </div>
    </div>
  );
}