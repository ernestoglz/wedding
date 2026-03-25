import { CheckCircle } from 'lucide-react';

export const SuccessMessage = () => {
  return (
    <section className="bg-navy-light px-4 py-20 text-center">
      <CheckCircle className="animate-fade-in mx-auto mb-4 text-gold" size={48} />
      <h2
        className="animate-fade-in-up mb-2 font-display text-4xl italic text-white"
        style={{ animationDelay: '0.2s' }}
      >
        ¡Gracias por confirmar!
      </h2>
      <p
        className="animate-fade-in-up text-text-muted"
        style={{ animationDelay: '0.4s' }}
      >
        Nos emociona mucho contar contigo.
      </p>
      <p
        className="animate-fade-in-up mx-auto mt-4 max-w-md text-sm italic text-text-muted"
        style={{ animationDelay: '0.6s' }}
      >
        Queremos que te diviertas al máximo y que nunca dejés de bailar, por eso nuestra boda será sólo para adultos.
      </p>
    </section>
  );
};
