import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface LoginProps {
  message?: string;
}

export default function Login({ message }: LoginProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(message || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/reviews");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">
          📚
        </div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 -rotate-12">
          📖
        </div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-10 rotate-6">
          📕
        </div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-10 -rotate-6">
          📗
        </div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-10 rotate-12">
          📘
        </div>
        <div className="absolute top-1/3 right-1/3 text-6xl opacity-10 -rotate-12">
          📙
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-amber-200">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="text-7xl animate-bounce">📚</div>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700 mb-2">
              BookShelf
            </h1>
            <p className="text-amber-800 text-lg font-medium">
              Welcome Back, Reader!
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md text-sm flex items-start gap-2">
              <span className="text-lg">✅</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2"
              >
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-gray-900 bg-white hover:border-amber-300"
                placeholder="reader@bookshelf.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2"
              >
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-gray-900 bg-white hover:border-amber-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-amber-700 hover:via-orange-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Opening your library...</span>
                </>
              ) : (
                <>
                  <span>📖</span>
                  <span>Enter Library</span>
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-amber-600">✦</span>
            </div>
          </div>

          <p className="text-center text-sm text-amber-800">
            New to BookShelf?{" "}
            <Link
              href="/signup"
              className="text-amber-700 hover:text-orange-700 font-semibold underline decoration-wavy decoration-amber-400 hover:decoration-orange-500 transition"
            >
              Create your reading account
            </Link>
          </p>

          <div className="mt-6 text-center text-xs text-amber-600 italic">
            "A reader lives a thousand lives"
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  const { message } = context.query;

  return {
    props: typeof message === "string" ? { message } : {},
  };
};
