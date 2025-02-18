import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import Layout from './components/Layout';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ExplorePage from './pages/ExplorePage';
import CheckoutPage from './pages/CheckoutPage';
import MyLearningPage from './pages/MyLearningPage';
import PracticePage from './pages/PracticePage';
import MyPurchasesPage from './pages/MyPurchases';
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/purchases" element={<MyPurchasesPage />} />
            </Route>
          </Route>

          <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
};

export default App;