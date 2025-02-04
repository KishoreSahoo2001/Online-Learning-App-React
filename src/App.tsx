import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
    </Route>
    <Route path="*" element={<LoginPage />} />
  </Routes>
   </Router>
  );
};

export default App;