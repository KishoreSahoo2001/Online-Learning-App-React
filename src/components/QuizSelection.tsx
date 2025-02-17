import React from "react";

interface Article {
  id: number;
  title: string;
}

interface Quiz {
  id: number;
  title: string;
}

interface QuizSelectionProps {
  purchasedArticles: Article[];
  selectedArticle: number | null;
  setSelectedArticle: (id: number) => void;
  quizzes: Quiz[];
  selectedQuiz: number | null;
  setSelectedQuiz: (id: number) => void;
}

const QuizSelection: React.FC<QuizSelectionProps> = ({
  purchasedArticles,
  selectedArticle,
  setSelectedArticle,
  quizzes,
  selectedQuiz,
  setSelectedQuiz,
}) => {
  return (
    <div className="quiz-selection">
      <h1>Practice Quiz</h1>

      {/* 🔹 Dropdown to select purchased article */}
      <div className="dropdown-container">
        <label>Select an article:</label>
        <select
          value={selectedArticle ?? ""}
          onChange={(e) => setSelectedArticle(Number(e.target.value))}
        >
          <option value="">-- Select an article --</option>
          {purchasedArticles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Dropdown to select quiz after choosing an article */}
      {quizzes.length > 0 && (
        <div className="dropdown-container">
          <label>Select a quiz:</label>
          <select
            value={selectedQuiz ?? ""}
            onChange={(e) => setSelectedQuiz(Number(e.target.value))}
          >
            <option value="">-- Select a quiz --</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default QuizSelection;