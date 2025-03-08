export const mockArticleDetails = {
  id: 1,
  title: "React Basics",
  author_name: 'John Doe',
  book_image: 'https://via.placeholder.com/150',
  language: 'English',
  rating: 4.5,
  rating_count: 120,
  learners: 5000,
  what_you_will_learn: ['Understand React', 'Learn TypeScript', 'Use React Hooks'],
  course_includes: ['10 Hours of Video', '5 Articles', 'Certificate of Completion'],
  course_content: ['Introduction', 'React Basics', 'Advanced React', 'Project'],
};
  
  export const mockArticles = [
    {
      id: 1,
      title: 'React Fundamentals',
      price: 29.99
    }
  ];

  export const mockUserProgress = [
    {
      id: 1,
      title: 'React Basics',
      progress: 80,
    },
    {
      id: 2,
      title: 'Advanced React',
      progress: 50,
    },
    {
      id: 3,
      title: 'React Fundamentals',
      progress: 0,
    }
  ];

  export const mockPurchases = [
    {
      id: 1,
      title: 'React Complete Guide',
      price: 49.99,
    },
    {
      id: 2,
      title: 'JavaScript Mastery',
      price: 39.99,
    },
    {
      id: 3,
      title: 'React Fundamentals',
      price: 29.99,
    }
  ];
  

  export const mockPurchasedArticles = [
    {
      id: 1,
      title: "Introduction to React",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
    },
  ];
  
  export const mockQuizzes = [
    {
      id: 101,
      title: "React Basics Quiz",
      article_id: 1,
    },
    {
      id: 102,
      title: "JavaScript ES6+ Quiz",
      article_id: 2,
    },
  ];
  
  export const mockQuestions = [
    {
      id: 1,
      question_text: "What is React?",
      options: ["Library", "Framework", "Language", "Tool"],
    },
    {
      id: 2,
      question_text: "What does JSX stand for?",
      options: ["JavaScript XML", "JSON", "Java Standard Extension", "JavaScript Syntax"],
    },
  ];