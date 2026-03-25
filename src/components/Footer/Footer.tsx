import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Footer = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <footer
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} bg-navy-dark px-4 py-10 text-center`}
    >
      <div className="mx-auto mb-2 h-px w-16 bg-gold/30" />
      <p className="mt-4 font-serif text-text-muted">
        Hecho con <span className="text-gold">&hearts;</span> para Pri & Ernesto
      </p>
      <p className="mt-1 text-sm text-text-muted">13 de Junio, 2026</p>
    </footer>
  );
};
