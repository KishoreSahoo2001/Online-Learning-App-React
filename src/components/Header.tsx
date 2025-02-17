import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import { imagePaths } from "../utils/imagePaths";
import api from '../interceptor/api';

interface Article {
  id: number;
  title: string;
  price: number;
  tags: string;
}

const categories = [
  { name: "Development", image: imagePaths.Development },
  { name: "Business", image: imagePaths.Business },
  { name: "Finance", image: imagePaths.Finance },
  { name: "Software", image: imagePaths.Software },
  { name: "Design", image: imagePaths.Design },
  { name: "Health", image: imagePaths.Health },
  { name: "Music", image: imagePaths.Music },
  { name: "Sports", image: imagePaths.Sports },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticlesForDropdown, setFilteredArticlesForDropdown] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleMouseEnter = (category: string) => {
    setActiveCategory(category);
    const filtered = articles.filter((article) =>
      article.tags.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredArticlesForDropdown(filtered);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setFilteredArticlesForDropdown([]);
  };

  const handleDropdownArticleClick = (article: Article) => {
    navigate('/explore', { state: { articleId: article.id, articlePrice: article.price, articleTitle: article.title } });
  };

  return (
    <header className="header">
      <div className="Upper">
        <img src="/assets/images/logo.png" alt="logo" className="logo" />
        <div className="nav-buttons">
        {location.pathname !== "/home" && (
            <button onClick={() => navigate('/home')}>Home</button>
          )}
          <button onClick={() => navigate('/purchases')}>My Purchases</button>
          <button onClick={() => navigate('/practice')}>Practice</button>
          <button onClick={() => navigate('/my-learning')}>My Learning</button>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Category Dropdowns */}
      <div className="Lower">
        <div className="category-dropdowns">
          {categories.map((category) => (
            <div
              key={category.name}
              className="dropdown"
              onMouseEnter={() => handleMouseEnter(category.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`dropdown-button ${activeCategory === category.name ? "active" : ""}`}
              >
                {category.name}
              </button>

              {/* Dropdown Content */}
              {activeCategory === category.name && (
                <div className="dropdown-content">
                  {filteredArticlesForDropdown.length > 0 ? (
                    filteredArticlesForDropdown.map((article) => (
                      <div
                        key={article.id}
                        className="article-item"
                        onClick={() => handleDropdownArticleClick(article)}
                      >
                        <img
                          src={category.image}
                          alt={article.title}
                          className="article-img"
                        />
                        <p>{article.title}</p>
                      </div>
                    ))
                  ) : (
                    <p>No articles found</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;