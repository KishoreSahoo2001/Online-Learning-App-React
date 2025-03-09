Online Learning Platform 🎓📚
An online learning web application that allows users to explore, purchase, and learn from various educational articles and quizzes, similar to Udemy.

🚀 Features
📌 Article Categories as Dropdowns – Users can browse articles by selecting categories.
📌 Explore Page – Displays article details such as author, price, content, and features.
📌 User Authentication – Secure login and sign-up using JWT authentication.
📌 My Learning Page – Displays purchased articles and allows users to continue learning.
📌 Quiz Feature – Users can take quizzes based on purchased articles.
📌 Payment Integration – Secure checkout for purchasing courses.
📌 Responsive Design – Fully responsive UI for mobile and desktop.

🛠 Tech Stack
Frontend: React.js (TypeScript), CSS
Backend: Node.js (Express.js), MySQL
Testing: Jest, Supertest
Authentication: JWT (JSON Web Tokens)
API Integration: Axios

📂 Project Structure
/online-learning-platform
│── frontend/                    # React.js frontend
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Main pages (Explore, My Learning, etc.)
│   │   ├── styles/              # CSS styles
│   │   ├── api.js               # API instance (Axios)
│   │   ├── App.tsx              # Main React app
│── resources/                    # JSON data files
│── README.md                     # Project documentation
│── package.json                  # Dependencies
│── .env                          # Environment variables

🔗 API Endpoints
📌 Articles API
Method	Endpoint	Description
GET	/articles/	Fetch all articles
GET	/articles/:id	Get a specific article
GET	/categories/	Get all categories
POST	/purchase/	Purchase an article
GET	/quizzes/:article_id	Fetch quizzes for an article
POST	/submit-quiz/	Submit quiz answers

📜 Usage
Users can browse articles by category using dropdowns.
Clicking on an article navigates to the Explore Page, showing details and a purchase button.
Purchased articles appear in My Learning where users can access content.
Users can take quizzes after completing an article.
The payment system allows users to buy articles securely.


📄 License
This project is open-source and available under the MIT License.