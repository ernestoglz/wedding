import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type IProps = {
  text: string;
};

export const CopyButton = (props: IProps) => {
  const { text } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gold transition-colors hover:bg-gold/10"
      aria-label="Copiar al portapapeles"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
};
