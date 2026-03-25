import { Icon } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const DressCode = () => {
  const { ref: titleRef, visible: titleVisible } = useScrollReveal();
  const { ref: iconsRef, visible: iconsVisible } = useScrollReveal();

  return (
    <section className="bg-navy px-4 py-20 text-center">
      <div ref={titleRef} className={`reveal ${titleVisible ? 'visible' : ''}`}>
        <h2 className="mb-8 font-display text-4xl italic text-white sm:text-5xl">
          Código de Vestimenta
        </h2>
      </div>

      <div className="mx-auto max-w-lg">
        <p
          ref={iconsRef}
          className={`reveal delay-1 ${iconsVisible ? 'visible' : ''} mb-6 font-serif text-2xl text-gold`}
        >
          Formal / Etiqueta
        </p>

        {/* Visual illustrations */}
        <div className="mb-8 flex items-end justify-center gap-12">
          {/* Suit icon */}
          <div className="flex flex-col items-center">
            <Icon name="suit" size={64} className="text-gold sm:h-24 sm:w-24" />
            <span className="mt-3 text-sm text-text-muted">Caballeros</span>
          </div>

          {/* Dress icon */}
          <div className="flex flex-col items-center">
            <Icon name="dress" size={64} className="text-gold sm:h-24 sm:w-24" />
            <span className="mt-3 text-sm text-text-muted">Damas</span>
          </div>
        </div>

        <p className="text-text-muted">
          Para acompañarnos en esta celebración, les invitamos a vestir formal.
        </p>

        <p className="text-text-muted">
          Después de tanto bailar, ¡la comodidad es bienvenida! Puedes traer tenis para la recepción.
        </p>

      </div>
    </section>
  );
};
