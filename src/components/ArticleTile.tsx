import React from 'react';

interface ArticleTileProps {
  id: number;
  title: string;
  content: string;
  image: string;
  onExploreClick: () => void;
}

const ArticleTile: React.FC<ArticleTileProps> = ({ id, title, content, image, onExploreClick }) => {
  return (
    <div key={id} className="article-tile">
      <div className="article-image-container">
        <img src={image} alt={title} className="article-image" />
      </div>
      <div className="article-content">
        <h3>{title}</h3>
        <p>{content}</p>
        <button onClick={onExploreClick}>Explore Now</button>
      </div>
    </div>
  );
};

export default ArticleTile;