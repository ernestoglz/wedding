import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GenericForm } from './GenericForm';

vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ ref: { current: null }, visible: true }),
}));

const mockGetItem = vi.fn();
const mockSetItem = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockGetItem.mockReturnValue('[]');
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: mockGetItem, setItem: mockSetItem },
    writable: true,
  });
});

describe('GenericForm', () => {
  it('should render name and dietary fields', () => {
    render(<GenericForm />);

    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Restricciones alimentarias')).toBeInTheDocument();
  });

  it('should show validation error when name is empty', async () => {
    const user = userEvent.setup();
    render(<GenericForm />);

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText('Por favor ingresa tu nombre')).toBeInTheDocument();
    });

    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it('should show validation error when dietary is empty', async () => {
    const user = userEvent.setup();
    render(<GenericForm />);

    await user.type(screen.getByLabelText('Nombre completo'), 'Juan');
    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Por favor indica tus restricciones alimentarias'),
      ).toBeInTheDocument();
    });

    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it('should save to localStorage and show success message on submit', async () => {
    const user = userEvent.setup();
    render(<GenericForm />);

    await user.type(screen.getByLabelText('Nombre completo'), 'Juan');
    await user.type(screen.getByLabelText('Restricciones alimentarias'), 'Vegano');

    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText('¡Gracias por confirmar!')).toBeInTheDocument();
    });

    expect(mockSetItem).toHaveBeenCalledWith(
      'rsvp_responses',
      expect.stringContaining('"name":"Juan"'),
    );
    expect(mockSetItem).toHaveBeenCalledWith(
      'rsvp_responses',
      expect.stringContaining('"dietary":"Vegano"'),
    );
  });
});
