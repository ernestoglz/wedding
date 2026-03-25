import { Hero } from '@/components/Hero';
import { Countdown } from '@/components/Countdown';
import { Timeline } from '@/components/Timeline';
import { EventDetails } from '@/components/EventDetails';
import { RsvpForm } from '@/components/RsvpForm';
import { SpotifyPlaylist } from '@/components/SpotifyPlaylist';
import { DressCode } from '@/components/DressCode';
import { Gifts } from '@/components/Gifts';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Footer } from '@/components/Footer';
import { GuestWelcome } from '@/components/GuestWelcome';
import { GuestLoading } from '@/components/GuestLoading';
import { GuestNotFound } from '@/components/GuestNotFound';
import { useGuest } from '@/hooks/useGuest';

export function App() {
  const { guest, status } = useGuest();

  return (
    <>
      <Hero />
      <Countdown />
      <EventDetails />
      <Timeline />
      <SpotifyPlaylist />

      <DressCode />
      <Gifts />

      {status !== 'idle' && (
        <>
          {status === 'loading' && <GuestLoading />}
          {status === 'found' && guest && <GuestWelcome guest={guest} />}

          <RsvpForm guest={guest} guestStatus={status} />
        </>
      )}

      <MusicPlayer />
      <Footer />
    </>
  );
}
