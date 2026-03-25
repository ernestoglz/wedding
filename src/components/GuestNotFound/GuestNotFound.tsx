import { AlertCircle } from 'lucide-react';

type IProps = {
  isError?: boolean;
};

export const GuestNotFound = (props: IProps) => {
  const { isError } = props;

  return (
    <section className="bg-navy-light px-4 py-20 text-center">
      <AlertCircle className="mx-auto mb-4 text-gold" size={40} />
      <h2 className="mb-2 font-display text-3xl italic text-white">
        {isError ? 'Ocurrió un error' : 'Invitación no encontrada'}
      </h2>
      <p className="mx-auto max-w-sm text-text-muted">
        {isError
          ? 'No pudimos cargar tu invitación. Por favor, intenta de nuevo más tarde.'
          : 'El enlace que usaste no es válido. Verifica que sea el enlace correcto o contacta a los novios.'}
      </p>
    </section>
  );
};
