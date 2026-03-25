import { ChevronDown } from 'lucide-react';

import { StarrySky } from '@/components/StarrySky';

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-dark px-4 text-center">
      <StarrySky />

      <p
        className="animate-fade-in mb-4 font-sans text-sm uppercase tracking-[0.3em] text-gold"
        style={{ animationDelay: '0.3s' }}
      >
        Nos casamos
      </p>

      <h1
        className="animate-fade-in font-display text-5xl font-bold italic text-white sm:text-7xl md:text-8xl"
        style={{ animationDelay: '0.5s' }}
      >
        Ernesto{' '}
        <span className="font-display text-4xl font-normal not-italic text-gold sm:text-5xl md:text-6xl">
          &amp;
        </span>{' '}
        Priscila
      </h1>

      <div className="animate-grow-width mt-6 h-px bg-gold opacity-50" />

      <p
        className="animate-fade-in-up mt-6 font-display text-xl text-gold-light sm:text-2xl"
        style={{ animationDelay: '1s' }}
      >
        13 de Junio, 2026
      </p>

      <blockquote
        className="animate-fade-in-up mt-8 max-w-md px-4"
        style={{ animationDelay: '1.2s' }}
      >
        <p className="font-sans text-lg italic text-white/80 sm:text-xl">
          &ldquo;Amar no es mirarse el uno al otro; es mirar juntos en la misma dirección.&rdquo;
        </p>
        <footer className="mt-2 text-sm text-text-muted">
          — Antoine de Saint‑Exupéry
        </footer>
      </blockquote>

      {/*/!* Decorative bottom ornament *!/*/}
      {/*<div*/}
      {/*  className="animate-fade-in-up mt-6 rotate-180 text-gold opacity-60"*/}
      {/*  style={{ animationDelay: '1.2s' }}*/}
      {/*>*/}
      {/*  <svg*/}
      {/*    width="120"*/}
      {/*    height="24"*/}
      {/*    viewBox="0 0 120 24"*/}
      {/*    fill="none"*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*  >*/}
      {/*    <path*/}
      {/*      d="M60 4C45 4 35 12 20 12C12 12 6 8 0 4M60 4C75 4 85 12 100 12C108 12 114 8 120 4M60 20C45 20 35 12 20 12M60 20C75 20 85 12 100 12"*/}
      {/*      stroke="currentColor"*/}
      {/*      strokeWidth="1.5"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*</div>*/}

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })}
        className="animate-bounce-slow absolute bottom-8 text-gold transition-opacity hover:opacity-70"
        aria-label="Desplazar hacia abajo"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};
