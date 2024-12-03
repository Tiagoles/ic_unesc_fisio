import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Certifique-se de configurar corretamente
import About from "../routes/About/About";
import RegisterUserSystem from "../routes/RegisterUserSystem/registerUserSystem";
import Navbar from "../components/navbar/Navbar";
import LoginUserSystem from "../routes/LoginUserSystem/LoginUserSystem";
import Home from "../routes/app/home/Home";


// Componente para rotas protegidas
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Exibe um indicador de carregamento enquanto verifica o estado do usuário
  }

  return user ? children : <Navigate to="/login/user/system" />;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="register/user/system" element={<RegisterUserSystem />} />
          <Route path="login/user/system" element={<LoginUserSystem />} />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
