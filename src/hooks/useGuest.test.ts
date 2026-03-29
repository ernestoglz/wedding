import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGuest } from './useGuest';

const mockFetchGuest = vi.fn();

vi.mock('@/services/guestApi', () => ({
  fetchGuest: (...args: unknown[]) => mockFetchGuest(...args),
}));

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'location', {
    value: { search: '' },
    writable: true,
  });
});

describe('useGuest', () => {
  it('should return idle status when no ref param is present', () => {
    window.location.search = '';

    const { result } = renderHook(() => useGuest());

    expect(result.current.status).toBe('idle');
    expect(result.current.guest).toBeNull();
    expect(mockFetchGuest).not.toHaveBeenCalled();
  });

  it('should fetch and return guest when ref param is present', async () => {
    const guest = {
      id: 'abc123',
      nombre: 'Juan y María',
      asientos: 2,
      confirmado: false,
    };
    mockFetchGuest.mockResolvedValueOnce(guest);
    window.location.search = '?ref=abc123';

    const { result } = renderHook(() => useGuest());

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('found');
    });

    expect(result.current.guest).toEqual(guest);
    expect(mockFetchGuest).toHaveBeenCalledWith('abc123');
  });

  it('should set not-found status when guest is not found', async () => {
    mockFetchGuest.mockResolvedValueOnce(null);
    window.location.search = '?ref=invalid';

    const { result } = renderHook(() => useGuest());

    await waitFor(() => {
      expect(result.current.status).toBe('not-found');
    });

    expect(result.current.guest).toBeNull();
  });

  it('should set error status when fetch fails', async () => {
    mockFetchGuest.mockRejectedValueOnce(new Error('Network error'));
    window.location.search = '?ref=abc123';

    const { result } = renderHook(() => useGuest());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.guest).toBeNull();
  });
});
