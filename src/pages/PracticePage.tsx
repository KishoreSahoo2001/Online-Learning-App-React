import React, { useState, useEffect } from "react";
import api from "../interceptor/api";
import "../styles/PracticePage.css";
import QuizQuestion from "../components/QuizQuestion";
import SubmitButton from "../components/SubmitButton";

interface Question {
  id: number;
  question_text: string;
  options: string[];
}

interface QuizResponse {
  message: string;
  score: number;
}

const PracticePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/quizzes/2/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/quizzes/submit", {
        quiz_id: 2,
        answers,
      });

      const result: QuizResponse = response.data;
      setScore(result.score);
      alert(result.message);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="practice-container">
      <h1>Practice Quiz</h1>
      {questions.map((question: Question) => (
        <QuizQuestion
        key={question.id}
        question={question}
        selectedAnswer={answers[question.id]}
        onAnswerChange={handleAnswerChange}
      />
    ))}
    <SubmitButton
      onClick={handleSubmit}
      disabled={Object.keys(answers).length !== questions.length}
    />
    {score !== null && <p>Your Score: {score}</p>}
  </div>
);
};

export default PracticePage;