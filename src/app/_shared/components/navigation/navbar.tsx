'use client';
import React from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useSession } from '../../hooks/use-session';
import { useRouter } from 'next/navigation';

/**
 * Navbar component provides a responsive, accessible navigation menu.
 * - Hamburger menu for mobile
 * - Horizontal links for desktop
 * - Uses Tailwind breakpoints and accessibility best practices
 * - Includes theme toggle using next-themes
 */
export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // eslint-disable-next-line
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Prevent hydration mismatch by only rendering toggle after mount
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);
  const handleLinkClick = () => handleClose();
  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Session logic
  const { user, loading, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav
      className="container mx-auto flex items-center justify-between p-4"
      aria-label="Main navigation"
    >
      <div className="font-bold text-xl tracking-tight">
        <Link href="/">Brand</Link>
      </div>
      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 text-base">
        <li>
          {mounted && (
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={
                resolvedTheme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="mr-4 text-xl focus:outline-none focus:ring-2 focus:ring-primary-600 rounded transition-colors duration-200"
            >
              {resolvedTheme === 'dark' ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
          )}
        </li>
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
        {!loading && user && (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-primary-600 focus:outline-none focus:underline"
            >
              Logout
            </button>
          </li>
        )}
        {!loading && !user && (
          <li>
            <Link
              href="/login"
              className="hover:text-primary-600 focus:outline-none focus:underline"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
      {/* Hamburger Button (Mobile) */}
      <button
        type="button"
        className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={handleToggle}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {/* Mobile Menu */}
      <ul
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-8 text-lg font-medium transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        {/* Close button (top-right) */}
        <button
          type="button"
          className="absolute top-6 right-6 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded"
          aria-label="Close navigation menu"
          onClick={handleClose}
        >
          <FaTimes size={28} />
        </button>
        {/* Theme toggle in mobile menu */}
        {mounted && (
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={
              resolvedTheme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            className="text-2xl focus:outline-none focus:ring-2 focus:ring-primary-600 rounded transition-colors duration-200"
          >
            {resolvedTheme === 'dark' ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700 dark:text-gray-200" />
            )}
          </button>
        )}
        <li>
          <Link
            href="/"
            className="hover:text-primary-600 focus:outline-none focus:underline"
            tabIndex={menuOpen ? 0 : -1}
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-primary-600 focus:outline-none focus:underline"
            tabIndex={menuOpen ? 0 : -1}
            onClick={handleLinkClick}
          >
            About
          </Link>
        </li>
        {!loading && user && (
          <li>
            <button
              onClick={async () => {
                await handleLogout();
                handleClose();
              }}
              className="hover:text-primary-600 focus:outline-none focus:underline"
              tabIndex={menuOpen ? 0 : -1}
            >
              Logout
            </button>
          </li>
        )}
        {!loading && !user && (
          <li>
            <Link
              href="/login"
              className="hover:text-primary-600 focus:outline-none focus:underline"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleLinkClick}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
      {/* Overlay for closing menu by clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10 md:hidden"
          aria-hidden="true"
          onClick={handleClose}
        />
      )}
    </nav>
  );
};
