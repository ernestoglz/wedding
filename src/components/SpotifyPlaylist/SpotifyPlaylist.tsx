import { Icon } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PLAYLIST_URL =
  'https://open.spotify.com/playlist/5Ev4ja9s4ikQMDkDZSm11B?si=4667abdac44147eb';

export const SpotifyPlaylist = () => {
  const { ref: titleRef, visible: titleVisible } = useScrollReveal();
  const { ref: cardRef, visible: cardVisible } = useScrollReveal();

  return (
    <section className="bg-navy-light px-4 py-20 text-center">
      <div ref={titleRef} className={`reveal ${titleVisible ? 'visible' : ''}`}>
        <Icon name="music" size={64} className="mx-auto mb-4 text-gold" />
        <h2 className="mb-4 font-display text-4xl italic text-white sm:text-5xl">
          Playlist de la Boda
        </h2>
        <p className="mx-auto mb-8 max-w-md text-text-muted">
          ¡La pista de baile empieza acá!<br/>
          Sumá tus canciones favoritas y construyamos juntos una playlist perfecto para que nadie se quiera sentar.
        </p>
      </div>

      <div
        ref={cardRef}
        className={`reveal delay-2 ${cardVisible ? 'visible' : ''}`}
      >
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-navy-dark"
        >
          <Icon name="spotify" size={20} />
          Abrir Playlist en Spotify
        </a>
      </div>
    </section>
  );
};
