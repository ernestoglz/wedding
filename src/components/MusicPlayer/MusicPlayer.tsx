import { useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop />
      <button
        onClick={toggle}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy-light text-gold shadow-lg ring-1 ring-gold/30 transition-transform hover:scale-110 active:scale-95 ${playing ? 'animate-pulse-ring' : ''}`}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? <VolumeX size={20} /> : <Music size={20} />}
      </button>
    </>
  );
};
