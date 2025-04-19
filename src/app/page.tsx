import Image from 'next/image';
// import { SectionMapping } from './_shared/components/sections/SectionMapping/SectionMapping';

/**
 * Home page using SectionMapping for layout and design (reference-based).
 */
export default function Home(): JSX.Element {
  // Example data, replace with actual data fetching logic as needed

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
