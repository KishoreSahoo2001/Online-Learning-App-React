import React, { useState, useEffect } from 'react';
import api from '../interceptor/api';
import '../styles/MyLearningPage.css';
import MyLearningCard from '../components/MyLearningCard';
import apiRoutes from "../routes/apiRoutes";

const MyLearningPage: React.FC = () => {

  interface Progress {
    id: number;
    article_id: number;
    status: string;
  }
  
  interface PurchasedArticle {
    id: number;
    title: string;
  }
  const [progress, setProgress] = useState<Progress[]>([]);
  const [purchasedArticles, setPurchasedArticles] = useState<PurchasedArticle[]>([]);


  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const progressResponse = await api.get(apiRoutes.OVERALL_PROGRESS);
          setProgress(progressResponse.data.progress);
          
          const purchasedResponse = await api.get(apiRoutes.PURCHASES);
          setPurchasedArticles(purchasedResponse.data.purchases); 
        } catch (error) {
          console.error('Error fetching progress or articles:', error);
        }
      }
    };
    fetchProgress();
  }, []);

  const handleUpdateProgress = async (articleId: number, quizId: number, status: string, score: number) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await api.put(apiRoutes.UPDATE_PROGRESS, {
          article_id: articleId,
          quiz_id: quizId,
          status,
          score,
        });
        alert('Progress updated successfully!');

        const updatedProgressResponse = await api.get(apiRoutes.OVERALL_PROGRESS);
        setProgress(updatedProgressResponse.data.progress);
        
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const getArticleProgress = (articleId: number) => {
    const articleProgress = progress.find((p) => p.article_id === articleId);
    return articleProgress ? articleProgress.status : 'not Started';
  };

  const toggleProgress = (articleId: number) => {
    const currentStatus = getArticleProgress(articleId);
    const newStatus = currentStatus === 'completed' ? 'not started' : 'completed';
    
    handleUpdateProgress(articleId, 1, newStatus, 5);
  };

  return (
    <div className="learning-container">
      <h1>My Learning Progress</h1>
      <div className="purchased-articles">
        {purchasedArticles.length === 0 ? (
          <p>No purchased articles found.</p>
        ) : (
          purchasedArticles.map((article) => (
            <MyLearningCard
              key={article.id}
              title={article.title}
              status={getArticleProgress(article.id)}
              onToggleStatus={() => toggleProgress(article.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;