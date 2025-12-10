import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MOODS = [
  { value: 'happy', label: 'Happy 😊', emoji: '😊' },
  { value: 'sad', label: 'Sad 😢', emoji: '😢' },
  { value: 'excited', label: 'Excited 🤩', emoji: '🤩' },
  { value: 'thoughtful', label: 'Thoughtful 🤔', emoji: '🤔' },
  { value: 'inspired', label: 'Inspired 💡', emoji: '💡' },
  { value: 'calm', label: 'Calm 😌', emoji: '😌' },
  { value: 'angry', label: 'Angry 😠', emoji: '😠' },
  { value: 'nostalgic', label: 'Nostalgic 🥲', emoji: '🥲' },
];

export default function AddReview() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    book_title: '',
    rating: 5,
    review: '',
    mood: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error(data.error || 'Failed to create review');
      }

      router.push('/reviews');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add New Review</h1>
            <Link
              href="/reviews"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium"
            >
              Back to Reviews
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="book_title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Book Title
              </label>
              <input
                id="book_title"
                type="text"
                required
                value={formData.book_title}
                onChange={(e) =>
                  setFormData({ ...formData, book_title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900"
                placeholder="Enter the book title"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Rating: {formData.rating} / 5
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="rating"
                  type="range"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="mood"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mood <span className="text-red-500">*</span>
              </label>
              <select
                id="mood"
                required
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900"
              >
                <option value="">Select your mood while reading</option>
                {MOODS.map((mood) => (
                  <option key={mood.value} value={mood.value}>
                    {mood.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                This field captures your emotional state while reading the book
              </p>
            </div>

            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Review
              </label>
              <textarea
                id="review"
                required
                rows={6}
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none text-gray-900"
                placeholder="Write your review here (minimum 10 characters)"
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.review.length} characters (minimum 10 required)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Creating Review...' : 'Create Review'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
