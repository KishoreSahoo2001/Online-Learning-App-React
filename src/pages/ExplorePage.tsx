import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../interceptor/api';
import '../styles/ExplorePage.css';
import BookCard from '../components/BookCard';
import CourseDetails from '../components/CourseDetails';
import { Article } from '../types/types'

const ExplorePage: React.FC = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasedArticles, setPurchasedArticles] = useState<Set<number>>(new Set());
    const location = useLocation();
    const navigate = useNavigate();
    const articleId = location.state?.articleId;
    const articlePrice = location.state?.articlePrice;
    const articleTitle = location.state?.articleTitle;

    interface Purchase {
        id: number;
      }

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                const response = await api.get(`/articles/article-details/${articleId}`);
                setArticle(response.data.articleDetails);
            } catch (error) {
                console.error('Error fetching article details:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchPurchasedArticles = async () => {
            try {
              const purchasesResponse = await api.get<{ purchases: Purchase[] }>('/articles/purchases');
          
              const purchasedArticleIds: Set<number> = new Set(
                purchasesResponse.data.purchases.map((purchase) => purchase.id)
              );
          
              setPurchasedArticles(purchasedArticleIds);
            } catch (error) {
              console.error('Error fetching purchased articles:', error);
            }
          };

        fetchArticleDetails();
        fetchPurchasedArticles();
    }, [articleId]);

    if (loading) return <p>Loading...</p>;
    if (!article) return <p>Article not found</p>;

    const handleBuyNow = () => {
        navigate('/payment', {
            state: {
                articleId: articleId,
                price: articlePrice,
                title: articleTitle
            }
        });
    };

    const isPurchased = purchasedArticles.has(articleId);

    return (
        <div className="explore-container">
            <BookCard 
                title={articleTitle}
                author={article.author_name}
                image={article.book_image}
                price={articlePrice}
                purchased={isPurchased}
                onBuyNow={handleBuyNow}
            />

            <CourseDetails 
                language={article.language}
                rating={article.rating}
                ratingCount={article.rating_count}
                learners={article.learners}
                whatYouWillLearn={Array.isArray(article.what_you_will_learn) ? article.what_you_will_learn.join(', ') : article.what_you_will_learn || ""}
                courseIncludes={Array.isArray(article.course_includes) ? article.course_includes.join(', ') : article.course_includes || ""}
                courseContent={Array.isArray(article.course_content) ? article.course_content.join(', ') : article.course_content || ""}
            />
        </div>
    );
};

export default ExplorePage;