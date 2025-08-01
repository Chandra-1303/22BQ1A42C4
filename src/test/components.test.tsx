import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading Button')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-red-600');
  });
});

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Test Input" />);
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Test Input" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByLabelText(/test input/i)).toHaveClass('border-red-500');
  });

  it('shows helper text when no error', () => {
    render(<Input label="Test Input" helperText="Enter your information" />);
    expect(screen.getByText('Enter your information')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const handleChange = vi.fn();
    render(<Input label="Test Input" onChange={handleChange} />);
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.change(input, { target: { value: 'test value' } });
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
