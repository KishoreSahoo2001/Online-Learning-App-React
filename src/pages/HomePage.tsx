import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../interceptor/api';
import { getArticleImage } from "../utils/imagePaths";
import { Article } from '../types/types';
import '../styles/HomePage.css';
import WelcomeSection from '../components/WelcomeSection';
import ArticlesList from '../components/ArticlesList';
import apiRoutes from "../routes/apiRoutes";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('User');
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem('username') ?? 'User');

    const fetchArticles = async () => {
      try {
        const response = await api.get(apiRoutes.GET_ARTICLES);
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = () => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
    setIsSearching(true);
  };

  const handleReset = () => {
    setFilteredArticles(articles);
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleExploreNowClick = (article: Article) => {
    navigate('/explore', { state: { articleId: article.id, articlePrice: article.price, articleTitle: article.title } });
  };

  return (
    <div className="homepage-container">
      <Header />
      <div className="content">
        
        <WelcomeSection
          username={username}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleReset={handleReset}
          isSearching={isSearching}
        />

        <ArticlesList 
          articles={filteredArticles.map(article => ({
            ...article,
            image: getArticleImage(article.title),
          }))}
          onExploreNowClick={handleExploreNowClick}
        />

      </div>
      <Footer />
    </div>
  );
};

export default HomePage;