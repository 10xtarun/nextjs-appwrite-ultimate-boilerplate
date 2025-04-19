'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

/**
 * Navbar component provides a responsive, accessible navigation menu.
 * - Hamburger menu for mobile
 * - Horizontal links for desktop
 * - Uses Tailwind breakpoints and accessibility best practices
 */
export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  // Close menu on navigation (mobile)
  const handleLinkClick = () => handleClose();

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
