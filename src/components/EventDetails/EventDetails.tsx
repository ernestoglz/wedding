import type { IconName } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { EventCard } from './components';

// ──────────────────────────────────────────────
// Edit these values to update venue information
// ──────────────────────────────────────────────
const EVENTS: Record<string, {
  title: string;
  iconName: IconName;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
}> = {
  ceremony: {
    title: 'Ceremonia',
    iconName: 'church',
    date: 'Sábado 13 de Junio, 2026',
    time: '2:00 PM',
    venue: 'Iglesia San Rafael Arcángel',
    address: 'Av. Fernández Delgado, San José, Escazú, Costa Rica',
    mapsUrl: 'https://waze.com/ul?q=Iglesia+San+Rafael+Arc%C3%A1ngel+Escaz%C3%BA&navigate=yes',
  },
  reception: {
    title: 'Recepción',
    iconName: 'reception',
    date: 'Sábado 13 de Junio, 2026',
    time: '',
    venue: 'Hotel InterContinental\n',
    address: 'Escazú',
    mapsUrl: 'https://waze.com/ul?q=Hotel+InterContinental+Escaz%C3%BA&navigate=yes',
  },
};

export const EventDetails = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="bg-navy px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''} mb-12 text-center font-display text-4xl italic text-white sm:text-5xl`}
        >
          Detalles del Evento
        </h2>
        <div className="flex flex-col gap-8 md:flex-row">
          <EventCard event={EVENTS.ceremony} delayClass="delay-1" />
          <EventCard event={EVENTS.reception} delayClass="delay-2" />
        </div>
      </div>
    </section>
  );
};
