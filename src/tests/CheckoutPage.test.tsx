import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CheckoutPage from '../pages/CheckoutPage';
import api from '../interceptor/api';
import { clearCart, removeFromCart } from '../redux/cartSlice';

jest.mock('../interceptor/api', () => ({
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() } },
}));

const mockStore = configureStore([]);

describe('CheckoutPage', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore({
            cart: {
                items: [
                    { id: 101, title: 'JavaScript Basics', price: 49.99 },
                    { id: 102, title: 'React Advanced', price: 79.99 },
                ],
            },
        });
        store.dispatch = jest.fn();
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/checkout']}>
                    <Routes>
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/purchases" element={<div>Purchases Page</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    };

    test('renders CheckoutPage correctly', () => {
        renderComponent();

        expect(screen.getByText('Checkout')).toBeInTheDocument();
        expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
        expect(screen.getByText('React Advanced')).toBeInTheDocument();
        expect(screen.getByText('₹49.99')).toBeInTheDocument();
        expect(screen.getByText('₹79.99')).toBeInTheDocument();
        expect(screen.getByText('Total: ₹129.98')).toBeInTheDocument();
    });

    test('removes an item from the cart', () => {
        renderComponent();

        const removeButton = screen.getAllByText('Remove')[0];
        fireEvent.click(removeButton);

        expect(store.dispatch).toHaveBeenCalledWith(removeFromCart(101));
    });

    test('clears the cart when "Clear Cart" is clicked', () => {
        renderComponent();

        fireEvent.click(screen.getByText('Clear Cart'));

        expect(store.dispatch).toHaveBeenCalledWith(clearCart());
    });

    test('handles successful payment', async () => {
        (api.post as jest.Mock)
            .mockResolvedValueOnce({ data: { transactionId: '12345' }, status: 200 })
            .mockResolvedValueOnce({ status: 200 })
            .mockResolvedValueOnce({ data: { transactionId: '67890' }, status: 200 })
            .mockResolvedValueOnce({ status: 200 });

        renderComponent();

        fireEvent.click(screen.getByText('Pay Now'));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/payments/buy', { articleId: 101, amount: 49.99 });
        });
    
        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/payments/confirm', { transactionId: '12345' });
        });
    
        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/payments/buy', { articleId: 102, amount: 79.99 });
        });
    
        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/payments/confirm', { transactionId: '67890' });
        });
    });

    test('handles payment failure', async () => {
        (api.post as jest.Mock).mockRejectedValueOnce(new Error('Payment failed'));

        renderComponent();

        fireEvent.click(screen.getByText('Pay Now'));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/payments/buy', { articleId: 101, amount: 49.99 });
        });

        expect(screen.getByText('Checkout')).toBeInTheDocument();
    });

    test('displays message when cart is empty', () => {
        store = mockStore({ cart: { items: [] } });
        renderComponent();

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});