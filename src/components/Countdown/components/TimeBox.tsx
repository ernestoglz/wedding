import { useScrollReveal } from '@/hooks/useScrollReveal';

type IProps = {
  value: number;
  label: string;
  delayClass: string;
};

export const TimeBox = (props: IProps) => {
  const { value, label, delayClass } = props;
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} flex flex-col items-center`}
    >
      <div className="flex min-w-[4rem] flex-col items-center rounded-xl border border-gold/20 bg-gold/5 px-3 py-3 sm:min-w-[5rem] sm:px-4 sm:py-4">
        <span className="inline-block w-[2.5ch] text-center font-serif text-4xl font-bold text-gold sm:text-5xl">
          {String(value).padStart(2, '0')}
        </span>
        <span className="mt-1 text-xs uppercase tracking-wider text-text-muted">{label}</span>
      </div>
    </div>
  );
};
