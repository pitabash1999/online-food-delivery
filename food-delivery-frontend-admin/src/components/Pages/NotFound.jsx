import { Link } from "react-router-dom"; // or 'next/link' for Next.js

export default function NotFound() {
  return (
    <div className="min-h-screen fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="animate-bounce">
            <svg
              className="h-24 w-24 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold text-red-500 dark:text-red-400">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Page not found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
}
