import { Icon } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Guest } from '@/types/guest';

type IProps = {
  guest: Guest;
};

export const GuestWelcome = (props: IProps) => {
  const { guest } = props;
  const { ref, visible } = useScrollReveal();

  return (
    <section className="bg-navy px-4 py-16">
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} mx-auto max-w-lg text-center`}
      >
        {guest.confirmado ? (
          <Icon name="confirmation" size={64} className="mx-auto mb-4 text-gold" />
        ) : (
          <Icon name="wedding-rings" size={64} className="mx-auto mb-4 text-gold" />
        )}
        <h2 className="mb-2 font-display text-4xl italic text-white sm:text-5xl">
          ¡Esperamos que puedas compartir este día con nosotros, {guest.nombre.split(' ')[0]}!
        </h2>
        <p className="mb-2 text-lg text-gold-light">
          Tienes {guest.asientos}{' '}
          {guest.asientos === 1 ? 'lugar reservado' : 'lugares reservados'}
        </p>
        {guest.confirmado && (
          <p className="text-sm text-text-muted">
            Ya confirmaste tu asistencia el{' '}
            {guest.fecha_confirmacion
              ? new Date(guest.fecha_confirmacion).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
              : 'anteriormente'}
            .
          </p>
        )}
      </div>
    </section>
  );
};
