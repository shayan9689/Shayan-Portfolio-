import React, { useState } from 'react';

// Prominent, reliable logos (Simple Icons CDN – consistent format, no white squares)
const TECHNOLOGIES = [
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'Python', slug: 'python', color: '#3776AB' },
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933' },
  { name: 'Flutter', slug: 'flutter', color: '#02569B' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00' },
  { name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C' },
  { name: 'Docker', slug: 'docker', color: '#2496ED' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { name: 'Firebase', slug: 'firebase', color: '#FFCA28' },
  { name: 'AWS', slug: 'amazonaws', color: '#232F3E' },
  { name: 'Git', slug: 'git', color: '#F05032' },
];

const LogoImage = ({ tech, isDark }) => {
  const [errored, setErrored] = useState(false);
  const hex = isDark ? '58A4B0' : tech.color.replace('#', '');
  const src = `https://cdn.simpleicons.org/${tech.slug}/${hex}`;
  return (
    <div className="flex flex-col items-center justify-center flex-shrink-0 mx-4 sm:mx-5">
      <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl dark:bg-darkGray-section/80 dark:border dark:border-white/10 overflow-hidden">
        {/* Metallic gradient overlay: bright left, darker right (silver sheen) */}
        {isDark && !errored && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none rounded-xl"
            style={{
              background: 'linear-gradient(105deg, rgba(255,255,255,0.35) 0%, transparent 45%, transparent 55%, rgba(0,0,0,0.25) 100%)',
            }}
            aria-hidden
          />
        )}
        <div className="relative z-0 flex items-center justify-center w-full h-full p-3">
          {errored ? (
            <span className="text-xs sm:text-sm font-semibold text-dark dark:text-gray-300 truncate max-w-full text-center" title={tech.name}>
              {tech.name}
            </span>
          ) : (
            <img
              src={src}
              alt={tech.name}
              title={tech.name}
              loading="lazy"
              onError={() => setErrored(true)}
              className="w-full h-full object-contain opacity-95 dark:opacity-100"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TechnologiesMarquee = ({ isDark = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderLogos = (slot) =>
    TECHNOLOGIES.map((tech, i) => (
      <LogoImage key={`${tech.slug}-${slot}-${i}`} tech={tech} isDark={isDark} />
    ));

  return (
    <section
      id="technologies"
      className="section-padding bg-light dark:bg-darkGray overflow-hidden overflow-x-hidden scrollbar-hide relative"
      aria-label="Technologies I work with"
      style={{ overflow: 'hidden' }}
    >
      {/* Subtle grid pattern on dark background (like reference) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06] hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-light mb-2">
            Technologies I Work With
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-primary-light max-w-xl mx-auto">
            These are the tools and technologies I use to bring ideas to life.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden relative z-10" style={{ overflow: 'hidden' }}>
        {/* Left edge: blur + inward (concave) curve so visible area curves in from left */}
        <div
          className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none w-24 sm:w-28 md:w-36 lg:w-40 dark:hidden"
          style={{
            background: 'linear-gradient(to right, #d8dbe2 0%, rgba(216,219,226,0.96) 15%, rgba(216,219,226,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            clipPath: 'polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none w-24 sm:w-28 md:w-36 lg:w-40 hidden dark:block"
          style={{
            background: 'linear-gradient(to right, #1b1b1e 0%, rgba(55,63,81,0.95) 15%, rgba(55,63,81,0) 100%)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            clipPath: 'polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)',
          }}
          aria-hidden
        />
        {/* Right edge: blur + inward (concave) curve so visible area curves in from right */}
        <div
          className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none w-24 sm:w-28 md:w-36 lg:w-40 dark:hidden"
          style={{
            background: 'linear-gradient(to left, #d8dbe2 0%, rgba(216,219,226,0.96) 15%, rgba(216,219,226,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 12% 50%, 0 0)',
          }}
          aria-hidden
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none w-24 sm:w-28 md:w-36 lg:w-40 hidden dark:block"
          style={{
            background: 'linear-gradient(to left, #1b1b1e 0%, rgba(55,63,81,0.95) 15%, rgba(55,63,81,0) 100%)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 12% 50%, 0 0)',
          }}
          aria-hidden
        />

        <div
          className="overflow-hidden scrollbar-hide"
          style={{ overflow: 'hidden', overflowX: 'hidden' }}
          data-aos="fade-up"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex items-center py-6 animate-technologies-scroll"
            style={{
              width: 'max-content',
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {renderLogos(0)}
            {renderLogos(1)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesMarquee;
