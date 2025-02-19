const apiRoutes = {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    GET_ARTICLES: "/articles",
    GET_ARTICLE_DETAILS: (articleId: number | string) => `/articles/article-details/${articleId}`,
    PURCHASES: "/articles/purchases",
    BUY_ARTICLE: "/payments/buy",
    CONFIRM_PAYMENT: "/payments/confirm",
    OVERALL_PROGRESS: "/progress/overall",
    UPDATE_PROGRESS: "/progress/update",
    GET_QUIZZES: (selectedArticle: number | null) => `/quizzes/${selectedArticle}`,
    GET_QUIZ_QUESTIONS: (selectedQuiz: number | null) => `/quizzes/${selectedQuiz}/questions`,
    SUBMIT_QUIZ: "/quizzes/submit"
};

export default apiRoutes;