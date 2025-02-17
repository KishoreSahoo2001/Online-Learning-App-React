import React from 'react';

interface PaymentDetailsProps {
  title: string;
  price: string;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handlePayment: () => void;
  message: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ title, price, amount, setAmount, handlePayment, message }) => {
  return (
    <div className="payment-box">
      <h1 className="payment-title">Payment for Article : {title}</h1>
      <p className="payment-price">Price: ₹{price}</p>

      <div className="payment-form">
        <label htmlFor="amount">Enter Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="pay-button" onClick={handlePayment}>Pay Now</button>
      </div>

      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default PaymentDetails;