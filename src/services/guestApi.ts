import type { Guest, RsvpPayload } from '@/types/guest';

const API_URL = import.meta.env.VITE_GUEST_API_URL as string;

export async function fetchGuest(id: string): Promise<Guest | null> {
  const res = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data || data.error) return null;
  return data as Guest;
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const encoded = encodeURIComponent(JSON.stringify(payload));
  const res = await fetch(`${API_URL}?payload=${encoded}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
}
