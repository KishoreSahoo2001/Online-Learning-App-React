import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PaymentPage from '../pages/PaymentPage';
import api from '../interceptor/api';

jest.mock('../interceptor/api', () => ({
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() } },
}));

describe('PaymentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders PaymentPage correctly', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/payment', state: { articleId: 3, title: 'React Fundamentals', price: 29.99 } }]}>
        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Payment for Article/i)).toBeInTheDocument();
    expect(screen.getByText(/React Fundamentals/i)).toBeInTheDocument();
    expect(screen.getByText(/₹29.99/i)).toBeInTheDocument();
  });

  test('handles successful payment', async () => {
    (api.post as jest.Mock)
      .mockResolvedValueOnce({ data: { transactionId: '12345' }, status: 200 })
      .mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/payment', state: { articleId: 3, title: 'React Fundamentals', price: 29.99 } }]}>
        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter amount'), { target: { value: '29.99' } });
    fireEvent.click(screen.getByText('Pay Now'));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/payments/buy', { articleId: 3, amount: 29.99 }));
    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/payments/confirm', { transactionId: '12345' }));

    expect(screen.getByText('Payment confirmed successfully!')).toBeInTheDocument();
  });

  test('displays error on incorrect amount', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/payment', state: { articleId: 3, title: 'React Fundamentals', price: 29.99 } }]}>
        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter amount'), { target: { value: '30.00' } });
    fireEvent.click(screen.getByText('Pay Now'));

    expect(screen.getByText(/Provided amount is incorrect/i)).toBeInTheDocument();
  });
});