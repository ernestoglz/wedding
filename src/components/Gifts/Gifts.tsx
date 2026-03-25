import { Icon } from '@/components/primitives';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { CopyButton } from './components';

// ──────────────────────────────────────────────
// Edit these values with your bank details
// ──────────────────────────────────────────────
const BANK_INFO = {
  bank: 'BAC San José',
  beneficiary: 'Priscila Fallas Pacheco',
  accountNumber: 'CR28010200009710439061',
};

export const Gifts = () => {
  const { ref, visible } = useScrollReveal();
  const { ref: cardRef, visible: cardVisible } = useScrollReveal();

  return (
    <section className="bg-navy-light px-4 py-20 text-center">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <Icon name="gift" size={64} className="mx-auto mb-4 text-gold" />
        <h2 className="mb-4 font-display text-4xl italic text-white sm:text-5xl">
          Muestras de cariño
        </h2>
        <p className="mx-auto mb-8 max-w-md text-text-muted">
          Tu compañía es el mejor regalo.<br/>
          Si deseas hacernos algún tipo obsequio, te agradeceremos realizarlo mediante una transferencia bancaria:
        </p>
      </div>

      <div
        ref={cardRef}
        className={`reveal delay-2 ${cardVisible ? 'visible' : ''} mx-auto max-w-sm rounded-xl border border-gold/20 bg-navy-dark p-6`}
      >
        <h3 className="mb-4 font-serif text-lg font-semibold text-white">
          Transferencia Bancaria
        </h3>

        <div className="space-y-3 text-left text-sm">
          <div>
            <span className="text-text-muted">Banco</span>
            <p className="font-medium text-white">{BANK_INFO.bank}</p>
          </div>
          <div>
            <span className="text-text-muted">Beneficiario</span>
            <p className="font-medium text-white">{BANK_INFO.beneficiary}</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Número de cuenta</span>
              <CopyButton text={BANK_INFO.accountNumber} />
            </div>
            <p className="font-mono font-medium text-gold-light">{BANK_INFO.accountNumber}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
