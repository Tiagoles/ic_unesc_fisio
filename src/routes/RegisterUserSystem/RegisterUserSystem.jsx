import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import logoUnesc from "../../assets/logos/logo_unesc.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const RegisterUserSystem = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [flAcesso, setFlAcesso] = useState("1");
    const [alerta, setAlerta] = useState({ tipo: "", mensagem: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault();

        // Verifica se a senha e a confirmação são iguais
        if (senha !== confirmaSenha) {
            setAlerta({ tipo: "danger", mensagem: "As senhas não coincidem." });
            return;
        }

        setIsLoading(true); // Inicia o carregamento

        try {
            // Obtém instância do Firebase Auth
            const auth = getAuth();

            // Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const userId = userCredential.user.uid;

            console.log("Usuário criado com sucesso:", userCredential);

            // Adiciona o usuário ao Firestore
            await setDoc(doc(db, "usuarios", userId), {
                nome,
                email,
                fl_acesso: Number(flAcesso), // Certifique-se de enviar números corretamente
            });

            setAlerta({ tipo: "success", mensagem: "Usuário cadastrado com sucesso!" });
            resetForm(); // Função para limpar o formulário (como setNome, setEmail, etc.)
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setAlerta({ tipo: "danger", mensagem: error.message });
        } finally {
            setIsLoading(false); // Finaliza o carregamento após a operação
        }
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

                <h4 className="text-center my-3">Cadastro de Usuário</h4>



                <form onSubmit={handleCadastro}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
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
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Confirmar Senha:</label>
                        <input
                            type="password"
                            className="mt-1 form-control"
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Tipo de Acesso:</label>
                        <select
                            className="form-select mt-1"
                            value={flAcesso}
                            onChange={(e) => setFlAcesso(e.target.value)}
                        >
                            <option value="1">Preceptor</option>
                            <option value="2">Estagiário</option>
                        </select>
                    </div>

                    <div className="mt-3 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isLoading} // Desabilita o botão enquanto o formulário está sendo enviado
                        >
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUserSystem;
