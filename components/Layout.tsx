import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'Book Reviews', description = 'Aplicación de reseñas de libros' }: LayoutProps) {
  const router = useRouter();

  const publicRoutes = ['/login', '/signup', '/'];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {!isPublicRoute && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  href="/reviews"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    router.pathname === '/reviews'
                      ? 'border-b-2 border-blue-500 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </Link>
                <Link
                  href="/add-review"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    router.pathname === '/add-review'
                      ? 'border-b-2 border-blue-500 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Add Review
                </Link>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        )}

        <main className={isPublicRoute ? '' : 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'}>
          {children}
        </main>
      </div>
    </>
  );
}
