import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Button } from "@material-tailwind/react";
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import Homepage from "./pages/Home";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoutes";



export default function App() {

  useEffect(() => {
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Required for Chrome
  };

  window.addEventListener("beforeunload", beforeUnloadHandler);

  return () => {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  };
}, []);

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<LoginForm />}></Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

// export default App;
