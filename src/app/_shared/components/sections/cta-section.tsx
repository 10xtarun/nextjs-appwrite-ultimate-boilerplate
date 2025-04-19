import type { FC } from 'react';
import Link from 'next/link';

/**
 * Call-to-Action section props.
 */
type CtaSectionProps = {
  readonly headline: string;
  readonly description: string;
};

/**
 * @description CTA section with Signup/Login buttons.
 */
export const CtaSection: FC<CtaSectionProps> = ({ headline, description }) => (
  <section className="w-full flex flex-col items-center gap-4 py-12 bg-primary-50 dark:bg-primary-900 rounded-lg mt-8">
    <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-200">
      {headline}
    </h2>
    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
      {description}
    </p>
    <div className="flex gap-4">
      <Link
        href="/signup"
        className="px-6 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="px-6 py-2 rounded border border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 dark:hover:bg-primary-800 transition"
      >
        Login
      </Link>
    </div>
  </section>
);
