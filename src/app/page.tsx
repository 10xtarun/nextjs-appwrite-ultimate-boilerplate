import { HeroSection } from './_shared/components/sections/hero-section';
import { FeaturesSection } from './_shared/components/sections/features-section';
import { CtaSection } from './_shared/components/sections/cta-section';
import type { HomepageFeature } from './_shared/types/homepage-section';

/**
 * Home page using Hero, Features, and CTA sections.
 */
export default function Home(): React.ReactElement {
  // Static features data
  const features: readonly HomepageFeature[] = [
    {
      imageSrc: '/feature1.png',
      title: 'Fast & Secure',
      description:
        'Experience lightning-fast performance and robust security for your data.',
    },
    {
      imageSrc: '/feature2.png',
      title: 'Seamless Collaboration',
      description:
        'Work together in real-time with team members across the globe.',
    },
    {
      imageSrc: '/feature3.png',
      title: 'Integrated Tools',
      description:
        'All the essential tools you need, fully integrated and easy to use.',
    },
    {
      imageSrc: '/feature4.png',
      title: '24/7 Support',
      description:
        'Get help whenever you need it from our dedicated support team.',
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <HeroSection
          headline="Welcome to Ultimate Boilerplate!"
          subheading="Kickstart your Next.js & Appwrite projects."
          description="A modern, scalable starter kit for rapid product development. Secure, fast, and ready for your next big idea."
          imageSrc="/hero-image.png"
        />
        <FeaturesSection features={features} />
        <CtaSection
          headline="Ready to get started?"
          description="Create your free account or log in to access all features."
        />
      </main>
    </div>
  );
}
