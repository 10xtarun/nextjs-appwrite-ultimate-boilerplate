'use client';
import Image from 'next/image';
import type { FC } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { useState } from 'react';

/**
 * HeroSection component displays the main headline, subheading, description, and an optional image.
 */
type HeroSectionProps = {
  readonly headline: string;
  readonly subheading: string;
  readonly description: string;
  readonly imageSrc?: string;
};

/**
 * @description Hero section for the homepage.
 */
export const HeroSection: FC<HeroSectionProps> = ({
  headline,
  subheading,
  description,
  imageSrc,
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <section className="w-full flex flex-col items-center text-center gap-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        {headline}
      </h1>
      <h2 className="text-xl md:text-2xl text-primary-600 font-semibold">
        {subheading}
      </h2>
      <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-300 mx-auto">
        {description}
      </p>
      {imageSrc && !imgError ? (
        <div className="mt-6">
          <Image
            src={imageSrc}
            alt="Hero"
            width={400}
            height={240}
            className="rounded-lg mx-auto"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <FaRegImage
            size={120}
            className="text-gray-300 dark:text-gray-600"
            aria-label="hero image"
          />
        </div>
      )}
    </section>
  );
};
