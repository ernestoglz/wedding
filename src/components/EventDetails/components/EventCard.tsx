import { MapPin } from 'lucide-react';

import { Icon, type IconName } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type IProps = {
  event: {
    title: string;
    iconName: IconName;
    date: string;
    time: string;
    venue: string;
    address: string;
    mapsUrl: string;
  };
  delayClass: string;
};

export const EventCard = (props: IProps) => {
  const { event, delayClass } = props;
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} flex flex-1 flex-col items-center rounded-xl border border-gold/20 bg-navy-dark p-8`}
    >
      <div className="mb-4 text-gold">
        <Icon name={event.iconName} size={56} />
      </div>
      <h3 className="mb-4 font-serif text-2xl font-semibold text-white">{event.title}</h3>
      <p className="text-sm text-text-muted">{event.date}</p>
      <p className="mt-1 text-lg font-semibold text-gold">{event.time}</p>
      <div className="my-4 h-px w-16 bg-gold/30" />
      <p className="font-serif text-lg text-white">{event.venue}</p>
      <p className="mt-1 text-sm text-text-muted">{event.address}</p>
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-navy-dark"
      >
        <MapPin size={16} />
        Ver en Waze
      </a>
    </div>
  );
};
