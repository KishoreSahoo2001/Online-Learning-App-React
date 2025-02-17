import React from "react";

interface Question {
  id: number;
  question_text: string;
  options: string[];
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerChange: (questionId: number, option: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
}) => {
  return (
    <div className="question">
      <h3>{question.question_text}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <label key={`${question.id}-${index}`}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              onChange={() => onAnswerChange(question.id, option)}
              checked={selectedAnswer === option}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;