import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Certifique-se de que o caminho está correto
import { signOut } from 'firebase/auth'; // Importando a função de logout do Firebase
import styles from './navbar.module.css'; // Opcional, para personalização adicional.

export default function Navbar() {
  const [user, setUser] = useState(null); // Para armazenar o estado do usuário autenticado

  useEffect(() => {
    // Escuta o estado de autenticação do Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Se o usuário estiver autenticado, armazena as informações dele
    });

    // Limpeza do listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Realiza o logout
      console.log("Usuário deslogado com sucesso.");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <nav className="bg-light navbar navbar-expand-lg navbar-light py-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3 ms-auto">
            {/* Links de "Sobre", "Registrar" e "Entrar" visíveis apenas quando o usuário não estiver autenticado */}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `nav-link fs-5 ${isActive ? 'text-primary' : 'text-secondary'}`
                    }
                  >
                    Sobre
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="register/user/system" 
                    className={({ isActive }) => 
                      `nav-link fs-5 ${isActive ? 'text-primary' : 'text-secondary'}`
                    }
                  >
                    Registrar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="login/user/system" 
                    className={({ isActive }) => 
                      `nav-link fs-5 ${isActive ? 'text-primary' : 'text-secondary'}`
                    }
                  >
                    Entrar
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="app/home" 
                    className={({ isActive }) => 
                      `nav-link fs-5 ${isActive ? 'text-primary' : 'text-secondary'}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link fs-5 btn btn-link text-secondary"
                    onClick={handleLogout} // Chama a função de logout
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
