import { Icon } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { TimelineItem } from './components';

const EVENTS = [
  {
    label: 'Celebración',
    icon: <Icon name="celebration" size={56} />,
  },
  {
    label: 'Cóctel',
    icon: <Icon name="cocktail" size={56} />,
  },
  {
    label: 'Brindis',
    icon: <Icon name="cheers" size={56} />,
  },
  {
    label: 'Cena',
    icon: <Icon name="dinner" size={56} />,
  },
  {
    label: 'Fiesta',
    icon: <Icon name="party" size={56} />,
  },
];

export const Timeline = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="bg-navy-dark px-4 py-20 text-center">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <h2 className="mb-12 font-display text-4xl italic text-white sm:text-5xl">
          ¡Acompáñanos de Principio a Fin!
        </h2>
      </div>

      <div className="relative mx-auto max-w-md">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gold/30" />

        {/* Top dot */}
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-gold" />

        <div className="flex flex-col gap-10 py-8">
          {EVENTS.map((event, i) => (
            <TimelineItem key={event.label} event={event} index={i} />
          ))}
        </div>

        {/* Bottom dot */}
        <div className="absolute left-1/2 bottom-0 h-3 w-3 -translate-x-1/2 rounded-full bg-gold" />
      </div>
    </section>
  );
};
