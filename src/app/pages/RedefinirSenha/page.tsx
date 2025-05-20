'use client';
import { useSearchParams, useRouter } from "next/navigation";
import Logo from "@/app/components/Logo/logo";
import React, { useState, useEffect } from "react";
import Input from "@/app/components/Input/input";
import { useAuth } from "@/app/hook/useAuth";

const RedefinirSenha = () => {

    useAuth();


  const searchParams = useSearchParams();
  const router = useRouter();
  const idUsuario = searchParams.get("id");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // ✅ Verifica se o usuário logado tem permissão
  useEffect(() => {
    const dados = localStorage.getItem("usuarioLogado");
    if (!dados) {
      alert("⚠️ Você precisa estar logado para acessar esta página.");
      router.push("/pages/Login");
      return;
    }

    const usuario = JSON.parse(dados);
    if (usuario.cargo !== "Engenheiro de Sistemas") {
      alert("❌ Acesso negado. Apenas Engenheiros de Sistemas podem redefinir senhas.");
      router.push("/pages/Menu");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senha || senha.length < 6) {
      setMensagem("❗ A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("❗ As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/usuarios/${idUsuario}/senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "text/plain",
        },
        body: senha,
      });

      if (res.ok) {
        setMensagem("✅ Senha redefinida com sucesso.");
        setTimeout(() => router.push("/pages/Colaborador"), 1500);
      } else {
        const erro = await res.text();
        setMensagem(`❌ Erro: ${erro}`);
      }
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-8 box-border bg-[#F4F4F4]">
      <Logo
        src="/image/senha_nova.png"
        alt="Imagem de redefinição"
        texto="Área para redefinir a senha de um colaborador"
      />
      <form
        onSubmit={handleSubmit}
        className="w-[600px] h-[735px] bg-white rounded-r-3xl p-6 shadow-2xl flex flex-col"
      >
        <h1 className="text-3xl font-bold text-[#3B48EF] mb-6">Redefinir Senha</h1>

        <div className="w-full h-[800px] flex flex-col justify-center items-center gap-10">
          <Input
            label="Senha"
            placeholder="Digite a nova senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Input
            label="Confirmar Senha"
            placeholder="Confirme a nova senha"
            name="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {mensagem && <p className="text-red-500 text-sm mt-2">{mensagem}</p>}

          <button
            type="submit"
            className="w-full bg-[#3B48EF] text-white py-2 rounded-xl text-lg mt-6"
          >
            Confirmar Redefinição
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedefinirSenha;
