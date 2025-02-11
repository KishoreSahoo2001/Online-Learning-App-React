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
  Development: "/assets/images/Development.jpg",
  Business: "/assets/images/Business.jpg",
  Finance: "/assets/images/Finance.jpg",
  Software: "/assets/images/Software.jpg",
  Design: "/assets/images/Design.jpg",
  Health: "/assets/images/Health.jpg",
  Music: "/assets/images/Music.jpg",
  Sports: "/assets/images/Sports.jpg",
  Default: "/assets/images/image2.jpg",
};

export const getArticleImage = (title: string): string => {
  const category = articleCategoryMap[title];
  return category ? imagePaths[category] : imagePaths.Default;
};