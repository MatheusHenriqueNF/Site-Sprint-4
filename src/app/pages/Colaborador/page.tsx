'use client';

import Image from "next/image";
import BotaoFiltro from "@/app/components/BotaoFiltro/botaoFiltro";
import Link from "next/link";
import ToggleSwitch from "@/app/components/ToggleSwitch/toggleswitch";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hook/useAuth";

type Usuario = {
  idUsuario: number;
  login: string;
  cargo: string;
  status: string;
};

const Colaborador = () => {

  useAuth();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [loading, setLoading] = useState(true);
  const [cargoLogado, setCargoLogado] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 🔐 Recupera o cargo do usuário logado
    const dadosUsuario = localStorage.getItem("usuarioLogado");
    if (dadosUsuario) {
      try {
        const usuario = JSON.parse(dadosUsuario);
        setCargoLogado(usuario.cargo);
      } catch (e) {
        console.error("Erro ao ler o usuário logado:", e);
      }
    }

    // 🔄 Carrega usuários
    fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then((data: Usuario[]) => {
        setUsuarios(data);
        setFiltro("todos");
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const usuariosFiltrados = usuarios.filter((user) => {
    switch (filtro) {
      case "ativo":
        return user.status === "1";
      case "desativado":
        return user.status === "0";
      default:
        return true;
    }
  });

  return (
    <div className="flex h-screen w-full p-10">
      <aside className="w-1/4 bg-[#3B48EF] text-white p-6 flex flex-col items-start border-2 rounded-l-2xl shadow-lg">
        <div className="w-full flex items-center gap-3 border-b-2 mb-4">
          <Image src="/image/logo_ccr.png" alt="CCR ViaSmart" width={60} height={60} />
          <div className='w-[2] h-[30] bg-white'></div>
          <h1 className="text-lg font-light">ViaSmart</h1>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-3xl font-medium">Filtros</h2>
          <BotaoFiltro src="/image/icon-pause.png" titulo="Desativado" onClick={() => setFiltro("desativado")} />
          <BotaoFiltro src="/image/icon-check.png" titulo="Ativado" onClick={() => setFiltro("ativo")} />
          <br />

          <h2 className="text-3xl font-medium">Ações</h2>
          <Link className="w-full flex items-center justify-center" href="/pages/Cadastro">
            <BotaoFiltro src="/image/icon-adicionar.png" titulo="Cadastrar" />
          </Link>
        </div>
      </aside>

      <main className="w-3/4 bg-white p-10 rounded-r-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Colaboradores</h2>
        {loading ? (
          <div className="w-full text-center py-10 text-lg text-gray-600">🔄 Carregando usuários...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-center p-2">Usuário</th>
                <th className="text-center p-2">Cargo</th>
                <th className="text-center p-2">Redefinir Senha</th>
                <th className="text-center p-2">Ação</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((item, index) => {
                const statusTexto = item.status === "1" ? "Ativo" : "Pausada";

                return (
                  <tr key={index} className="border-b">
                    <td className="p-4 text-center">{item.login}</td>
                    <td className="p-4 text-center">{item.cargo}</td>
                    <td className="p-4 text-center">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => {
                          if (cargoLogado === "Engenheiro de Sistemas") {
                            router.push(`/pages/RedefinirSenha?id=${item.idUsuario}`);
                          } else {
                            alert("❌ Você não tem permissão para redefinir senhas.");
                          }
                        }}
                      >
                        Redefinir senha
                      </button>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <ToggleSwitch
                        enabled={item.status === "1"}
                        onToggle={(newState: boolean) => {
                          const novoStatus = newState ? "1" : "0";

                          fetch(`http://localhost:8080/usuarios/${item.idUsuario}/status`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "text/plain",
                            },
                            body: novoStatus,
                          })
                            .then((res) => {
                              if (res.ok) {
                                console.log(`Status de ${item.login} atualizado para ${novoStatus}`);
                                setUsuarios((prev) =>
                                  prev.map((u) =>
                                    u.idUsuario === item.idUsuario ? { ...u, status: novoStatus } : u
                                  )
                                );
                              } else {
                                console.error("Erro ao atualizar status.");
                              }
                            })
                            .catch((err) => {
                              console.error("Falha na requisição:", err);
                            });
                        }}
                      />
                    </td>
                    <td className={`p-2 text-center ${statusTexto === "Ativo" ? "text-green-500" : "text-orange-500"}`}>
                      {statusTexto}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Colaborador;
