import React from 'react';
import '../styles/MyLearningPage.css';

interface MyLearningCardProps {
  title: string;
  status: string;
  onToggleStatus: () => void;
}

const MyLearningCard: React.FC<MyLearningCardProps> = ({ title, status, onToggleStatus }) => {
  return (
    <div className="learning-card">
      <h2>{title}</h2>
      <p className={`status ${status === 'completed' ? 'completed' : 'not-started'}`}>
        Status: {status}
      </p>
      <button
        className={`status-button ${status === 'completed' ? 'completed-btn' : 'not-started-btn'}`}
        onClick={onToggleStatus}
      >
        {status === 'completed' ? 'Mark as Not Started' : 'Mark as Completed'}
      </button>
    </div>
  );
};

export default MyLearningCard;