"use client";
import React, { useState, useEffect } from "react";
import Input from "../Input/input";
import { useRouter } from "next/navigation"; // Para redirecionamento
import SelecionarUsuario from "../SelecionarUsuario/selecionarusuario";
import { useMemo } from "react";


type InputConfig = {
    label: string;
    placeholder: string;
    name: string;
    type?: string;
};

type PreencherProps = {
    titulo?: string;
    corTexto?: string;
    inputs: InputConfig[];
    botaoTitulo: string;
    type?: string;
    tipo: "login" | "cadastro" | "redefinirSenha";  // NOVA PROP
};


const Preencher: React.FC<PreencherProps> = ({
    titulo = "Título",
    corTexto = "green",
    inputs = [],
    botaoTitulo = "Enviar",
    tipo
}) => {
    const router = useRouter(); // Hook para redirecionamento

    // Inicializar os estados com os inputs fornecidos
    const initialFormData = useMemo(() => {
        return inputs.reduce((acc, input) => {
            acc[input.name] = "";
            return acc;
        }, {} as { [key: string]: string });
    }, [inputs]);

    const [formData, setFormData] = useState<{ [key: string]: string }>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Atualizar o estado quando os inputs mudarem
    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors: { [key: string]: string } = {};

        if (tipo === "cadastro" && !formData["cargo"]) {
            validationErrors["cargo"] = "Selecione um cargo";
          }
    
        inputs.forEach((input) => {
            if (!formData[input.name] || formData[input.name].trim().length === 0) {
                validationErrors[input.name] = `${input.label} é obrigatório.`;
            } else if (input.name === "usuario" && formData[input.name].length < 3) {
                validationErrors[input.name] = "Usuário deve ter pelo menos 3 caracteres.";
            } else if (input.name === "senha" && formData[input.name].length < 6) {
                validationErrors[input.name] = "A senha deve ter pelo menos 6 caracteres.";
            } else if (input.name === "confirmarSenha" && formData[input.name] !== formData["senha"]) {
                validationErrors[input.name] = "As senhas não conferem.";
            }
        });
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        if (tipo === "login") {
            fetch("http://localhost:8080/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: formData.usuario,
                    senha: formData.senha,
                }),
            })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json(); 
                    localStorage.setItem("usuarioLogado", JSON.stringify({
                    login: data.login,
                    cargo: data.cargo,
                    idUsuario: data.idUsuario
                    }));
                    router.push("/pages/Menu");
                } else {
                    const erro = await response.text();
                    setErrors({ geral: erro || "Erro ao tentar login." });
                }
            })

            .catch((err) => {
                console.error("Erro na requisição:", err);
                setErrors({ geral: "Erro ao conectar com o servidor." });
            });

            }
            else if (tipo === "cadastro") {
            fetch("http://localhost:8080/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: formData.usuario,
                    senha: formData.senha,
                    cargo: formData.cargo,
                }),
            })
            .then(async (response) => {
                if (response.ok) {
                    alert("✅ Cadastro realizado com sucesso!");
                    router.push("/pages/Cadastro");
                } else {
                    const erro = await response.text();
                    setErrors({ geral: erro || "Erro ao cadastrar usuário." });
                }
            })
            .catch((err) => {
                console.error("Erro na requisição:", err);
                setErrors({ geral: "Erro ao conectar com o servidor." });
            });
        }
    };
    return (
        <div className="w-[600px] h-[735px] bg-white rounded-r-3xl p-6 shadow-2xl">
            <h1 className="text-[30px] font-semibold mb-4" style={{ color: corTexto }}>
                {titulo}
            </h1>

            <form onSubmit={handleSubmit} className="h-[600px] flex flex-col justify-center items-center mt-4 ">
                <div className="w-full mb-10">
                    {tipo === "cadastro" && (
                        <>
                    
                            <SelecionarUsuario
                                name="cargo"
                                value={formData["cargo"] || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                            {errors["cargo"] && (
                                <p className="text-red-500 text-sm">{errors["cargo"]}</p>
                            )}
                        </>
                        
                    )}
                </div>


                {inputs.map((input, index) => (
                    <div key={index} className="w-full mb-10">
                        <Input
                            label={input.label}
                            placeholder={input.placeholder}
                            type={input.type || "text"}
                            name={input.name}
                            value={formData[input.name] || ""}
                            onChange={handleChange}
                        />
                        {errors[input.name] && <p className="text-red-500 text-sm">{errors[input.name]}</p>}
                    </div>
                ))}

                {errors.geral && <p className="text-red-500 text-sm">{errors.geral}</p>}

                <button type="submit" className="w-full bg-[#3B48EF] text-2xl font-semibold text-white py-2 rounded-2xl mt-4">
                    {botaoTitulo}
                </button>
            </form>
        </div>
    );
};

export default Preencher;
