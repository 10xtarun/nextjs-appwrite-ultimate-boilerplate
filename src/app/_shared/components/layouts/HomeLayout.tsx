import React from 'react';
import { Navbar } from '../navigation/navbar';

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
      <Navbar />
    </header>
    {/* Main Section */}
    <main className="flex-1 container mx-auto px-4 py-8" id="main-content">
      {children}
    </main>
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
      &copy; {new Date().getFullYear()} Brand. All rights reserved.
    </footer>
  </div>
);
