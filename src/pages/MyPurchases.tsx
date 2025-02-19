import React, { useState, useEffect } from "react";
import api from "../interceptor/api";
import "../styles/MyPurchases.css";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { getArticleImage } from "../utils/imagePaths";
import apiRoutes from "../routes/apiRoutes";

interface Purchase {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
}

const MyPurchases: React.FC = () => {
  const [purchasedBooks, setPurchasedBooks] = useState<Purchase[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await api.get(apiRoutes.PURCHASES);
        setPurchasedBooks(response.data.purchases);
      } catch (error) {
        console.error("Error fetching purchased books:", error);
      }
    };

    fetchPurchasedBooks();
  }, []);

  const handleExploreMore = (book: Purchase) => {
    navigate("/explore", {
      state: {
        articleId: book.id,
        articlePrice: book.price,
        articleTitle: book.title,
      },
    });
  };

  return (
    <div className="purchases-container">
      <h1>My Purchases</h1>
      <div className="purchases-list">
        {purchasedBooks.length === 0 ? (
          <p>No purchased books found.</p>
        ) : (
          purchasedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <BookCard
                title={book.title}
                author={book.author}
                image={getArticleImage(book.title)}
                price={book.price}
                purchased={true}
              />
              <button className="explore-button" onClick={() => handleExploreMore(book)}>
                Explore More
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPurchases;