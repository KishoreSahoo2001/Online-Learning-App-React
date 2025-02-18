import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import api from '../interceptor/api';
import '../styles/CheckoutPage.css';
import { clearCart, removeFromCart } from '../redux/cartSlice';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const amount = cartItems.reduce((total, item) => {
            const price = Number(item.price);
            return total + (isNaN(price) ? 0 : price);
        }, 0);
        setTotalAmount(amount);
    }, [cartItems]);

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handlePayment = async () => {
        try {
            for (const item of cartItems) {
                const paymentResponse = await api.post('/payments/buy', {
                    articleId: item.id,
                    amount: item.price,
                });

                if (paymentResponse.status !== 200) {
                    throw new Error('Payment failed');
                }

                const { transactionId } = paymentResponse.data;
                await api.post('/payments/confirm', { transactionId });
            }

            dispatch(clearCart());
            navigate('/purchases');
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-header">Checkout</h2>

            {cartItems.length > 0 ? (
                <div className="checkout-items">
                    {cartItems.map((item) => (
                        <div className="checkout-item-card" key={item.id}>
                            <div className="checkout-item-info">
                                <h3>{item.title}</h3>
                                <p>₹{Number(item.price).toFixed(2)}</p>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="checkout-summary">
                        <h4>Order Summary</h4>
                        <div className="total-price">
                            Total: ₹{totalAmount.toFixed(2)}
                        </div>
                    </div>

                    <div className="checkout-buttons">
                        <button onClick={handleClearCart} className="cancel-btn">
                            Clear Cart
                        </button>
                        <button onClick={handlePayment} className="pay-now-btn">
                            Pay Now
                        </button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CheckoutPage;