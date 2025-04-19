'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { FaRegImage } from 'react-icons/fa';
import type { FeaturesSectionProps } from '../../types/homepage-section';
import { useState } from 'react';

/**
 * FeaturesSection displays a set of feature cards.
 */
export const FeaturesSection: FC<FeaturesSectionProps> = ({ features }) => {
  // Track image errors per feature index
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (idx: number): void => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <section className="w-full py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
          >
            {feature.imageSrc && !imgErrors[idx] ? (
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                width={64}
                height={64}
                className="mb-4"
                onError={() => handleImgError(idx)}
              />
            ) : (
              <FaRegImage
                size={64}
                className="mb-4 text-gray-300 dark:text-gray-600"
                aria-label="feature icon"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
