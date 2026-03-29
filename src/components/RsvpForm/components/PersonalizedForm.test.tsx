import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonalizedForm } from './PersonalizedForm';
import type { Guest } from '@/types/guest';

const mockSubmitRsvp = vi.fn();

vi.mock('@/services/guestApi', () => ({
  submitRsvp: (...args: unknown[]) => mockSubmitRsvp(...args),
}));

vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ ref: { current: null }, visible: true }),
}));

const makeGuest = (overrides?: Partial<Guest>): Guest => ({
  id: 'abc123',
  nombre: 'Juan y María',
  asientos: 2,
  confirmado: false,
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockSubmitRsvp.mockResolvedValue(undefined);
});

describe('PersonalizedForm', () => {
  it('should render one card per seat', () => {
    render(<PersonalizedForm guest={makeGuest({ asientos: 3 })} />);

    expect(screen.getByText('Invitado 1 de 3')).toBeInTheDocument();
    expect(screen.getByText('Invitado 2 de 3')).toBeInTheDocument();
    expect(screen.getByText('Invitado 3 de 3')).toBeInTheDocument();
  });

  it('should pre-fill the first guest name from the guest nombre', () => {
    render(<PersonalizedForm guest={makeGuest()} />);

    const firstNameInput = screen.getByDisplayValue('Juan');
    expect(firstNameInput).toBeInTheDocument();
  });

  it('should render a restricciones field per guest', () => {
    render(<PersonalizedForm guest={makeGuest({ asientos: 2 })} />);

    const restriccionesFields = screen.getAllByPlaceholderText(
      'Alergias, intolerancias, etc.',
    );
    expect(restriccionesFields).toHaveLength(2);
  });

  it('should submit with per-guest restricciones', async () => {
    const user = userEvent.setup();
    render(<PersonalizedForm guest={makeGuest()} />);

    const nameInputs = screen.getAllByPlaceholderText('Nombre del invitado');
    await user.clear(nameInputs[1]);
    await user.type(nameInputs[1], 'María');

    const restriccionesFields = screen.getAllByPlaceholderText(
      'Alergias, intolerancias, etc.',
    );
    await user.type(restriccionesFields[0], 'Vegetariano');
    await user.type(restriccionesFields[1], 'Sin gluten');

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(mockSubmitRsvp).toHaveBeenCalledWith({
        id: 'abc123',
        nombres: ['Juan', 'María'],
        restricciones: ['Vegetariano', 'Sin gluten'],
      });
    });
  });

  it('should allow empty restricciones', async () => {
    const user = userEvent.setup();
    render(<PersonalizedForm guest={makeGuest({ asientos: 1, nombre: 'Juan' })} />);

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(mockSubmitRsvp).toHaveBeenCalledWith({
        id: 'abc123',
        nombres: ['Juan'],
        restricciones: [''],
      });
    });
  });

  it('should show validation error when name is empty', async () => {
    const user = userEvent.setup();
    render(<PersonalizedForm guest={makeGuest({ asientos: 1, nombre: 'Juan' })} />);

    const nameInput = screen.getByDisplayValue('Juan');
    await user.clear(nameInput);

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText('Por favor ingresa el nombre')).toBeInTheDocument();
    });

    expect(mockSubmitRsvp).not.toHaveBeenCalled();
  });

  it('should show success message after successful submission', async () => {
    const user = userEvent.setup();
    render(<PersonalizedForm guest={makeGuest({ asientos: 1, nombre: 'Juan' })} />);

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText('¡Gracias por confirmar!')).toBeInTheDocument();
    });
  });

  it('should show error message when submission fails', async () => {
    mockSubmitRsvp.mockRejectedValueOnce(new Error('Network error'));
    const user = userEvent.setup();
    render(<PersonalizedForm guest={makeGuest({ asientos: 1, nombre: 'Juan' })} />);

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Hubo un error al enviar. Por favor, intenta de nuevo.'),
      ).toBeInTheDocument();
    });
  });
});
