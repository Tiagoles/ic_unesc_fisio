import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Certifique-se de que o auth está configurado corretamente
import logoUnesc from "../../assets/logos/logo_unesc.png"; // Certifique-se de que o caminho está correto

const LoginUserSystem = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({ tipo: "", mensagem: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firebase Authentication login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado com sucesso:", userCredential);

      setAlerta({ tipo: "success", mensagem: "Login realizado com sucesso!" });
      resetForm();

      // Redireciona para a rota protegida "Home"
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setAlerta({ tipo: "danger", mensagem: "Erro ao realizar login. Verifique suas credenciais." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex">
      {alerta.mensagem && (
        <div className={`alert alert-${alerta.tipo} alert-dismissible fade show position-absolute top-0 left-0`} role="alert">
          {alerta.mensagem}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="justify-content-center mx-auto">
        <div className="text-center">
          <img
            src={logoUnesc}
            alt="Unesc.br"
            className="rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
        </div>

        <h4 className="text-center my-3">Login</h4>

        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              className="mt-1 form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha:</label>
            <input
              type="password"
              className="mt-1 form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUserSystem;
