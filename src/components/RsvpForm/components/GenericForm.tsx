import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SuccessMessage } from './SuccessMessage';

type GenericRsvpData = {
  name: string;
  dietary: string;
};

export const GenericForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { ref, visible } = useScrollReveal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenericRsvpData>();

  const onSubmit = (data: GenericRsvpData) => {
    const existing = JSON.parse(localStorage.getItem('rsvp_responses') || '[]');
    existing.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('rsvp_responses', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <section className="bg-navy-light px-4 py-20">
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} mx-auto max-w-md text-center`}
      >
        <h2 className="mb-2 font-display text-4xl italic text-white sm:text-5xl">
          Confirma tu Asistencia
        </h2>
        <p className="mb-4 text-text-muted">
          Por favor, confirma antes del 15 de Mayo de 2026.
        </p>
        <p className="mb-8 text-sm italic text-text-muted">
          Queremos que te diviertas al máximo y que nunca dejés de bailar, por eso nuestra boda será sólo para adultos.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gold-light">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-gold/30 bg-navy-dark px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
              {...register('name', { required: 'Por favor ingresa tu nombre' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="dietary" className="mb-1 block text-sm font-medium text-gold-light">
              Restricciones alimentarias
            </label>
            <textarea
              id="dietary"
              rows={3}
              placeholder="Alergias, vegetariano, vegano, etc."
              className="w-full resize-none rounded-lg border border-gold/30 bg-navy-dark px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
              {...register('dietary', { required: 'Por favor indica tus restricciones alimentarias' })}
            />
            {errors.dietary && (
              <p className="mt-1 text-sm text-red-400">{errors.dietary.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-navy-dark transition-colors hover:bg-gold-light"
          >
            <Send size={18} />
            Confirmar Asistencia
          </button>
        </form>
      </div>
    </section>
  );
};
