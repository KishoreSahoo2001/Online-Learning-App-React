import React from 'react';
import ArticleTile from './ArticleTile';
import { Article } from '../types/types';
import { getArticleImage } from '../utils/imagePaths';

interface ArticlesListProps {
  articles: Article[];
  onExploreNowClick: (article: Article) => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, onExploreNowClick }) => {
  return (
    <div>
      <h1>Articles</h1>
      <div className="article-tiles">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleTile
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
              image={getArticleImage(article.title)}
              onExploreClick={() => onExploreNowClick(article)}
            />
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;