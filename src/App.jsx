import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
