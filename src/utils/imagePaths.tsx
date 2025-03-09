const articleCategoryMap: Record<string, string> = {
  "Learn SQL Basics": "Development",
  "Clean Code": "Development",
  "AI in 2024": "Software",
  "My Tech Book": "Software",
  "Design Patterns": "Software",
  "The Lean Startup": "Business",
  "Personal Finance Tips": "Finance",
  "The Psychology of Money": "Finance",
  "The Design of Everyday Things": "Design",
  "Universal Principles of Design": "Design",
  "Healthy Living": "Health",
  "The Obesity Code": "Health",
  "Work-Life Balance": "Health",
  "Musicophilia": "Music",
  "How Music Works": "Music",
  "The Sports Gene": "Sports",
  "Cricket Article": "Sports",
};

export const imagePaths: Record<string, string> = {
  Development: "/Online-Learning-App-React/assets/images/Development.jpg",
  Business: "/Online-Learning-App-React/assets/images/Business.jpg",
  Finance: "/Online-Learning-App-React/assets/images/Finance.jpg",
  Software: "/Online-Learning-App-React/assets/images/Software.jpg",
  Design: "/Online-Learning-App-React/assets/images/Design.jpg",
  Health: "/Online-Learning-App-React/assets/images/Health.jpg",
  Music: "/Online-Learning-App-React/assets/images/Music.jpg",
  Sports: "/Online-Learning-App-React/assets/images/Sports.jpg",
  Default: "/Online-Learning-App-React/assets/images/image2.jpg",
};

export const getArticleImage = (title: string): string => {
  const category = articleCategoryMap[title];
  return category ? imagePaths[category] : imagePaths.Default;
};