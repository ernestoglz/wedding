import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGuest, submitRsvp } from './guestApi';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchGuest', () => {
  it('should return guest data when found', async () => {
    const guest = {
      id: 'abc123',
      nombre: 'Juan y María',
      asientos: 2,
      confirmado: false,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(guest),
    });

    const result = await fetchGuest('abc123');

    expect(result).toEqual(guest);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch.mock.calls[0][0]).toContain('id=abc123');
  });

  it('should return null when guest is not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ error: 'Not found' }),
    });

    const result = await fetchGuest('invalid');

    expect(result).toBeNull();
  });

  it('should return null when response is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(null),
    });

    const result = await fetchGuest('abc123');

    expect(result).toBeNull();
  });

  it('should throw on HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchGuest('abc123')).rejects.toThrow('HTTP 500');
  });
});

describe('submitRsvp', () => {
  it('should send payload with nombres and restricciones arrays', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await submitRsvp({
      id: 'abc123',
      nombres: ['Juan', 'María'],
      restricciones: ['Vegetariano', 'Sin gluten'],
    });

    expect(mockFetch).toHaveBeenCalledOnce();

    const url = mockFetch.mock.calls[0][0] as string;
    const payloadStr = url.split('payload=')[1];
    const decoded = JSON.parse(decodeURIComponent(payloadStr));

    expect(decoded).toEqual({
      id: 'abc123',
      nombres: ['Juan', 'María'],
      restricciones: ['Vegetariano', 'Sin gluten'],
    });
  });

  it('should send empty strings for guests without restrictions', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await submitRsvp({
      id: 'abc123',
      nombres: ['Juan', 'María'],
      restricciones: ['Vegetariano', ''],
    });

    const url = mockFetch.mock.calls[0][0] as string;
    const payloadStr = url.split('payload=')[1];
    const decoded = JSON.parse(decodeURIComponent(payloadStr));

    expect(decoded.restricciones).toEqual(['Vegetariano', '']);
  });

  it('should throw on HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(
      submitRsvp({ id: 'abc123', nombres: ['Juan'], restricciones: [''] }),
    ).rejects.toThrow('HTTP 500');
  });

  it('should throw on API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ error: 'Missing id' }),
    });

    await expect(
      submitRsvp({ id: '', nombres: [], restricciones: [] }),
    ).rejects.toThrow('Missing id');
  });
});
