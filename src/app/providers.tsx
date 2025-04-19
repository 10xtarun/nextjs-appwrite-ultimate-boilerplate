'use client';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Providers wraps the app with the next-themes ThemeProvider for global dark/light mode.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
