import { useScrollReveal } from '@/hooks/useScrollReveal';

type IProps = {
  event: {
    label: string;
    icon: React.ReactNode;
  };
  index: number;
};

export const TimelineItem = (props: IProps) => {
  const { event, index } = props;
  const { ref, visible } = useScrollReveal();
  const delayClass = `delay-${Math.min(index + 1, 4)}`;

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8`}
    >
      {/* Icon (left) */}
      <div className="flex justify-end text-gold">
        {event.icon}
      </div>

      {/* Spacer for the line */}
      <div className="w-3" />

      {/* Label (right) */}
      <p className="font-serif text-xl tracking-[0.15em] text-white sm:text-2xl">
        {event.label}
      </p>
    </div>
  );
};
