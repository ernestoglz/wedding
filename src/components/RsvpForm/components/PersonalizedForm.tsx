import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Send, Loader2 } from 'lucide-react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { submitRsvp } from '@/services/guestApi';
import type { Guest } from '@/types/guest';
import { SuccessMessage } from './SuccessMessage';

type NameRow = {
  name: string;
};

type PersonalizedRsvpData = {
  guests: NameRow[];
  restricciones: string;
};

type IProps = {
  guest: Guest;
};

export const PersonalizedForm = (props: IProps) => {
  const { guest } = props;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { ref, visible } = useScrollReveal(0);

  const defaultGuests: NameRow[] = Array.from({ length: guest.asientos }, (_, i) => ({
    name: i === 0 ? guest.nombre.split(' y ')[0] : '',
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalizedRsvpData>({
    defaultValues: { guests: defaultGuests, restricciones: '' },
  });

  const { fields } = useFieldArray({ control, name: 'guests' });

  const onSubmit = async (data: PersonalizedRsvpData) => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitRsvp({
        id: guest.id,
        nombres: data.guests.map((g) => g.name),
        restricciones: data.restricciones,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <section className="bg-navy-light px-4 py-20">
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} mx-auto max-w-lg text-center`}
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-gold/20 bg-navy-dark/50 p-4"
            >
              <p className="mb-3 text-sm font-medium text-gold">
                Invitado {index + 1} de {guest.asientos}
              </p>

              <div>
                <label
                  htmlFor={`guests.${index}.name`}
                  className="mb-1 block text-sm font-medium text-gold-light"
                >
                  Nombre
                </label>
                <input
                  id={`guests.${index}.name`}
                  type="text"
                  placeholder="Nombre del invitado"
                  className="w-full rounded-lg border border-gold/30 bg-navy-dark px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  {...register(`guests.${index}.name`, {
                    required: 'Por favor ingresa el nombre',
                  })}
                />
                {errors.guests?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.guests[index].name?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div>
            <label
              htmlFor="restricciones"
              className="mb-1 block text-sm font-medium text-gold-light"
            >
              Restricciones alimentarias
            </label>
            <textarea
              id="restricciones"
              rows={3}
              placeholder="Alergias, intolerancias, etc."
              className="w-full resize-none rounded-lg border border-gold/30 bg-navy-dark px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
              {...register('restricciones', {
                required: 'Por favor indica las restricciones alimentarias',
              })}
            />
            {errors.restricciones && (
              <p className="mt-1 text-sm text-red-400">{errors.restricciones.message}</p>
            )}
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-400">
              Hubo un error al enviar. Por favor, intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-navy-dark transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send size={18} />
                Confirmar Asistencia
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
