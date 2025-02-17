import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  image: string;
  price: number;
  purchased: boolean;
  onBuyNow?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, image, price, purchased, onBuyNow }) => {
  return (
    <div className="left-section">
      <img src={image} alt={title} className="book-image" />
      <div className="book-details">
        <h2>{title}</h2>
        {author && <p>by {author}</p>}
        <p className="price">₹{price}</p>
        {!purchased && <button className="buy-button" onClick={onBuyNow}>Buy Now</button>}
      </div>
    </div>
  );
};

export default BookCard;