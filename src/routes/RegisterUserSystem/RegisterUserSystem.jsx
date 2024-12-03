import React, { useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import logoUnesc from "../../assets/logos/logo_unesc.png";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Importando signOut
import { setDoc, doc } from "firebase/firestore";

const RegisterUserSystem = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmaPassword, setConfirmaPassword] = useState("");
    const [confirmaLicenseId, setConfirmaLicenseId] = useState("");

    const [licenseId, setlicenseId] = useState("");
    const [alerta, setAlerta] = useState({ tipo: "", mensagem: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (password !== confirmaPassword) {
            setAlerta({ tipo: "danger", mensagem: "As passwords não coincidem." });
            return;
        }
        if (licenseId !== confirmaLicenseId) {
            setAlerta({ tipo: "danger", mensagem: "As matrículas não coincidem." });
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            console.log("Usuário criado com sucesso:", userCredential);

            await setDoc(doc(firestore, "Users", userId), {
                name,
                email,
                licenseId,
            });

            // Logout automático após cadastro
            await signOut(auth);
            console.log("Usuário deslogado após cadastro.");

            setAlerta({ tipo: "success", mensagem: "Usuário cadastrado com sucesso!" });
            resetForm();
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setAlerta({ tipo: "danger", mensagem: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmaPassword("");
        setlicenseId("");
        setConfirmaLicenseId("");
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Confirmar Senha:</label>
                        <input
                            type="password"
                            className="mt-1 form-control"
                            value={confirmaPassword}
                            onChange={(e) => setConfirmaPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Matrícula:</label>
                        <input
                            type="text"
                            className="mt-1 form-control"
                            value={licenseId}
                            onChange={(e) => setlicenseId(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Confirmar Matrícula:</label>
                        <input
                            type="text"
                            className="mt-1 form-control"
                            value={confirmaLicenseId}
                            onChange={(e) => setConfirmaLicenseId(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-3 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isLoading}
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
