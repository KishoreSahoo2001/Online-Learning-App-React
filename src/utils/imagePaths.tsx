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
  Development: "${process.env.PUBLIC_URL}/assets/images/Development.jpg",
  Business: "${process.env.PUBLIC_URL}/assets/images/Business.jpg",
  Finance: "${process.env.PUBLIC_URL}/assets/images/Finance.jpg",
  Software: "${process.env.PUBLIC_URL}/assets/images/Software.jpg",
  Design: "${process.env.PUBLIC_URL}/assets/images/Design.jpg",
  Health: "${process.env.PUBLIC_URL}/assets/images/Health.jpg",
  Music: "${process.env.PUBLIC_URL}/assets/images/Music.jpg",
  Sports: "${process.env.PUBLIC_URL}/assets/images/Sports.jpg",
  Default: "${process.env.PUBLIC_URL}/assets/images/image2.jpg",
};

export const getArticleImage = (title: string): string => {
  const category = articleCategoryMap[title];
  return category ? imagePaths[category] : imagePaths.Default;
};