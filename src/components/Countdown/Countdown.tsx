import { useEffect, useState } from 'react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { TimeBox } from './components';

const WEDDING_DATE = new Date('2026-06-13T17:00:00');

const getTimeLeft = () => {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const Countdown = () => {
  const [time, setTime] = useState(getTimeLeft);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="bg-navy-light px-4 py-20 text-center">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <h2 className="mb-8 font-display text-4xl italic text-white sm:text-5xl">Falta</h2>
      </div>
      <div className="flex justify-center gap-4 sm:gap-6">
        <TimeBox value={time.days} label="días" delayClass="delay-1" />
        <TimeBox value={time.hours} label="hs" delayClass="delay-2" />
        <TimeBox value={time.minutes} label="min" delayClass="delay-3" />
        <TimeBox value={time.seconds} label="seg" delayClass="delay-4" />
      </div>
    </section>
  );
};
