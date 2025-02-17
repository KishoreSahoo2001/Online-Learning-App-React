import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../interceptor/api';
import '../styles/PaymentPage.css';
import PaymentDetails from '../components/PaymentDetails';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [articleDetails, setArticleDetails] = useState<{ id: number, title: string, price: number } | null>(null);

  const articleId = location.state?.articleId || 0;
  const articlePrice = parseFloat(location.state?.price || '0');
  const articleTitle = location.state?.title || '';

  useEffect(() => {
    if (!articleId || !articlePrice) {
      navigate('/explore');
      return;
    }

    setArticleDetails({
      id: articleId,
      title: articleTitle,
      price: articlePrice,
    });
  }, [articleId, articlePrice, articleTitle, navigate]);

  const formattedPrice = typeof articleDetails?.price === 'number' ? articleDetails.price.toFixed(2) : '0.00';

  const handlePayment = async () => {
    const enteredAmount = parseFloat(amount);
    if (isNaN(enteredAmount) || enteredAmount !== articlePrice) {
      setMessage(`Provided amount is incorrect. The price of the article is ₹${articlePrice.toFixed(2)}.`);
      return;
    }

    try {
      const paymentResponse = await api.post('/payments/buy', {
        articleId,
        amount: enteredAmount,
      });

      if (paymentResponse.status === 200) {
        const { transactionId } = paymentResponse.data;
        setMessage('Payment initiated. Please confirm the payment.');

        const confirmResponse = await api.post('/payments/confirm', {
          transactionId,
        });

        if (confirmResponse.status === 200) {
          setMessage('Payment confirmed successfully!');
        } else {
          setMessage('Payment confirmation failed. Please try again.');
        }
      }
    } catch (error) {
      setMessage('Error processing payment. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="payment-container">
      <PaymentDetails
        title={articleDetails?.title ?? ''}
        price={formattedPrice}
        amount={amount}
        setAmount={setAmount}
        handlePayment={handlePayment}
        message={message}
      />
    </div>
  );
};

export default PaymentPage;