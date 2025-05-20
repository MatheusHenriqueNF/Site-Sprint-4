'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BotaoFiltro from "@/app/components/BotaoFiltro/botaoFiltro";
import Link from "next/link";
import ToggleSwitch from "@/app/components/ToggleSwitch/toggleswitch";
import { useAuth } from "@/app/hook/useAuth";

type Duvida = {
  idDuvida: number;
  pergunta: string;
  resposta: string;
  status: string; // "Ativo" ou "Pausada"
};

const Duvida = () => {

  useAuth();

  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    fetch("http://localhost:8080/duvidas")
      .then((res) => res.json())
      .then((data) => setDuvidas(data))
      .catch((err) => console.error("Erro ao buscar dúvidas:", err));
  }, []);

const duvidasFiltradas = duvidas.filter((d) => {
  switch (filtro) {
    case "1":
      return d.status === "1"; // Ativo
    case "0":
      return d.status === "0"; // Pausada
    case "pergunta":
      return d.pergunta !== "";
    case "resposta":
      return d.resposta !== "";
    default:
      return true; // "todos"
  }
});
  

  return (
    <div className="flex h-screen w-full p-10">
      <aside className="w-1/4 bg-[#3B48EF] text-white p-6 flex flex-col items-start border-2 rounded-l-2xl shadow-lg">
        <div className="w-full flex items-center gap-3 border-b-2 mb-4">
          <Image src="/image/logo_ccr.png" alt="CCR ViaSmart" width={60} height={60} />
          <div className="w-[2] h-[30] bg-white"></div>
          <h1 className="text-lg font-light">ViaSmart</h1>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-3xl font-medium">Filtros</h2>
          <BotaoFiltro src="/image/icon-pause.png" titulo="Desativado" onClick={() => setFiltro("0")} />
          <BotaoFiltro src="/image/icon-check.png" titulo="Ativado" onClick={() => setFiltro("1")} />
          <br />
          <h2 className="text-3xl font-medium">Ações</h2>
          <Link className="w-full flex items-center justify-center" href={"/pages/Pergunta"}>
            <BotaoFiltro src="/image/icon-adicionar.png" titulo="Adicionar" />
          </Link>
        </div>
      </aside>

      <main className="w-3/4 bg-white p-10 rounded-r-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Dúvidas</h2>
        <div className="max-h-[750px] overflow-y-auto border rounded-xl shadow-inner">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-center p-2">Pergunta</th>
                <th className="text-center p-2">Resposta</th>
                <th className="text-center p-2">Alterar</th>
                <th className="text-center p-2">Ação</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {duvidasFiltradas.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-center">{item.pergunta}</td>
                  <td className="p-4 text-center">{item.resposta}</td>
                  <td className="p-4 text-center">
                    <Link
                      href={`/pages/Pergunta?id=${item.idDuvida}&pergunta=${encodeURIComponent(item.pergunta)}&resposta=${encodeURIComponent(item.resposta)}`}
                    >
                      Alterar
                    </Link>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <ToggleSwitch
                      enabled={item.status === "1"}
                      onToggle={(newState) => {
                        const novoStatus = newState ? "1" : "0";

                        fetch(`http://localhost:8080/duvidas/${item.idDuvida}/status`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "text/plain",
                          },
                          body: novoStatus,
                        })
                          .then((res) => {
                            if (res.ok) {
                              console.log(`Dúvida atualizada para ${novoStatus}`);
                              setDuvidas((prev) =>
                                prev.map((d) =>
                                  d.idDuvida === item.idDuvida ? { ...d, status: novoStatus } : d
                                )
                              );
                            } else {
                              console.error("❌ Erro ao atualizar status");
                            }
                          })
                          .catch((err) => console.error("Erro na requisição:", err));
                      }}
                    />
                  </td>
                  <td
                    className={`p-2 text-center ${
                      item.status === "1" ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    {item.status === "1" ? "Ativo" : "Pausada"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Duvida;
