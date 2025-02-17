import React, { useState, useEffect } from "react";
import api from "../interceptor/api";
import "../styles/PracticePage.css";
import QuizSelection from "../components/QuizSelection";
import QuizQuestion from "../components/QuizQuestion";
import SubmitButton from "../components/SubmitButton";

interface Article {
  id: number;
  title: string;
}

interface Quiz {
  id: number;
  title: string;
}

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
  const [purchasedArticles, setPurchasedArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchPurchasedArticles = async () => {
      try {
        const response = await api.get("/articles/purchases");
        setPurchasedArticles(response.data.purchases || []);
      } catch (error) {
        console.error("Error fetching purchased articles:", error);
        setPurchasedArticles([]);
      }
    };

    fetchPurchasedArticles();
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      const fetchQuizzes = async () => {

        if (!selectedArticle) return;
        
        try {
          const response = await api.get(`/quizzes/${selectedArticle}`);
          setQuizzes(response.data.quizzes || []);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      };

      fetchQuizzes();
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (selectedQuiz) {
      const fetchQuestions = async () => {
        try {
          const response = await api.get(`/quizzes/${selectedQuiz}/questions`);
          setQuestions(response.data.questions);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      fetchQuestions();
    }
  }, [selectedQuiz]);

  const handleAnswerChange = (questionId: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/quizzes/submit", {
        quiz_id: selectedQuiz,
        answers,
      });

      const result: QuizResponse = response.data;
      setScore(result.score);
      alert(result.message);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const isSubmitEnabled = questions.length > 0 && questions.every(
    (question) => answers[question.id] !== undefined
  );

  useEffect(() => {
    setAnswers({});
    setScore(null);
  }, [selectedArticle, selectedQuiz]);

  return (
    <div className="practice-container">
      <QuizSelection
        purchasedArticles={purchasedArticles}
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        quizzes={quizzes}
        selectedQuiz={selectedQuiz}
        setSelectedQuiz={setSelectedQuiz}
      />
      {questions.length > 0 &&
        questions.map((question: Question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id]}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      {questions.length > 0 && (
        <SubmitButton
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
        />
      )}
      {score !== null && <p>Your Score: {score}</p>}
    </div>
  );
};

export default PracticePage;