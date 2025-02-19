import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../interceptor/api';
import '../styles/ExplorePage.css';
import BookCard from '../components/BookCard';
import CourseDetails from '../components/CourseDetails';
import { addToCart } from '../redux/cartSlice';
import { Article } from '../types/types'
import { AppDispatch } from '../redux/store';
import apiRoutes from "../routes/apiRoutes";

const ExplorePage: React.FC = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasedArticles, setPurchasedArticles] = useState<Set<number>>(new Set());
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const articleId = location.state?.articleId;
    const articlePrice: number = location.state?.articlePrice || 0;
    const articleTitle = location.state?.articleTitle;

    interface Purchase {
        id: number;
      }

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                const response = await api.get(apiRoutes.GET_ARTICLE_DETAILS(articleId));
                setArticle(response.data.articleDetails);
            } catch (error) {
                console.error('Error fetching article details:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchPurchasedArticles = async () => {
            try {
              const purchasesResponse = await api.get<{ purchases: Purchase[] }>(apiRoutes.PURCHASES);
          
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

    const handleAddToCart = (id: number, title: string, price: number) => {
        dispatch(addToCart({ id, title, price }));

        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

    if (loading) return <p>Loading...</p>;
    if (!article) return <p>Article not found</p>;

    const isPurchased = purchasedArticles.has(articleId);

    return (
        <div className="explore-container">
            <BookCard 
                id={article.id}
                title={articleTitle}
                author={article.author_name}
                image={article.book_image}
                price={articlePrice}
                purchased={isPurchased}
                onBuyNow={handleAddToCart}
            />
            {isAddedToCart && <div className="popup">Added to Cart</div>}

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