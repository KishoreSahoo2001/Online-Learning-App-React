import React from 'react';

interface BookCardProps {
  id?: number;
  title: string;
  author: string;
  image: string;
  price: number;
  purchased: boolean;
  onBuyNow?: (id: number, title: string, price: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, price, purchased, onBuyNow }) => {

  return (
    <div className="left-section">
      <img src={image} alt={title} className="book-image" />
      <div className="book-details">
        <h2>{title}</h2>
        {author && <p>by {author}</p>}
        <p className="price">₹{price}</p>
        {!purchased && onBuyNow && id && ( <button className="buy-button" onClick={() => onBuyNow(id, title, price)}>Add to cart</button>)}
      </div>
    </div>
  );
};

export default BookCard;