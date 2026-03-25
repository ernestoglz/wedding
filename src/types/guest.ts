export type Guest = {
  id: string;
  nombre: string;
  asientos: number;
  confirmado: boolean;
  fecha_confirmacion?: string;
  nombres?: string[];
  restricciones?: string;
};

export type RsvpPayload = {
  id: string;
  nombres: string[];
  restricciones: string;
};

export type GuestStatus = 'idle' | 'loading' | 'found' | 'not-found' | 'error';
