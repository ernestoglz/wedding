import { useEffect, useState } from 'react';

import type { Guest, GuestStatus } from '@/types/guest';
import { fetchGuest } from '@/services/guestApi';

export function useGuest() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [status, setStatus] = useState<GuestStatus>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('ref');
    if (!id) return;

    setStatus('loading');

    fetchGuest(id)
      .then((data) => {
        if (data) {
          setGuest(data);
          setStatus('found');
        } else {
          setStatus('not-found');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return { guest, status };
}
