import React from 'react';
import Link from 'next/link';

/**
 * Props for HomeLayout component.
 */
export interface HomeLayoutProps {
  /** Page content to render inside main section */
  readonly children: React.ReactNode;
}

/**
 * Homepage layout with header, main, and footer.
 * Applies consistent navigation and branding site-wide.
 * @param children Page content
 */
export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    {/* Header Section */}
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <nav
        className="container mx-auto flex items-center justify-between p-4"
        aria-label="Main navigation"
      >
        <div className="font-bold text-xl tracking-tight">
          <Link href="/">Brand</Link>
        </div>
        <ul className="flex space-x-6 text-base">
          <li>
            <Link
              href="/"
              className="hover:text-primary-600 focus:outline-none focus:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-primary-600 focus:outline-none focus:underline"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hover:text-primary-600 focus:outline-none focus:underline"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>

    {/* Main Section */}
    <main className="flex-1 container mx-auto px-4 py-8" id="main-content">
      {children}
    </main>

    {/* Footer Section */}
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
    </footer>
  </div>
);
