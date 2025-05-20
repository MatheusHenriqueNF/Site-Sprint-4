'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BotaoFiltro from "@/app/components/BotaoFiltro/botaoFiltro";

import ToggleSwitch from "@/app/components/ToggleSwitch/toggleswitch";

import { useAuth } from "@/app/hook/useAuth";

type LinhaEstacao = {
  idEstacoes: number;
  nomeLinha: string;
  nomeEstacao: string;
  status: string; // "Normal" ou "Pausada"
};


const Dash = () => {

  useAuth();  

  // const linhas = [
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Normal" },
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Pausada" },
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Normal" },
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Pausada" },
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Normal" },
  //   { linha: "Linha 1 - Azul", estacao: "Vila Mariana", status: "Pausada" },
  // ];

  const coresPorLinha: { [key: string]: string } = {
  "Linha 1 - Azul": "blue-500",
  "Linha 2 - Verde": "bg-green-500",
  "Linha 3 - Vermelha": "bg-red-500",
  "Linha 4 - Amarela": "bg-yellow-500",
  "Linha 5 - Lilás": "bg-purple-500", // roxo
  "Linha 6 - Laranja": "bg-orange-500",
};




  const [dados, setDados] = useState<LinhaEstacao[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [loading, setLoading] = useState(true);

  // ✅ Correto: useEffect FORA do return
  useEffect(() => {
    fetch("http://localhost:8080/estacoes-linhas")
      .then((res) => res.json())
      .then((data: LinhaEstacao[]) => {
        setDados(data);
        setFiltro("todos");
      })
      .catch((err) => console.error("Erro ao buscar dados:", err))
      .finally(() => setLoading(false));
  }, []);

  const dadosFiltrados = dados.filter((item) => {
    switch (filtro) {
      case "normal":
        return item.status === "Ativa";
      case "pausada":
        return item.status === "Pausada";
      default:
        return true; // todos
    }
  });

  return (
    
    <div className="flex h-screen w-full  p-10">
      
      <aside className="w-1/4 bg-[#3B48EF] text-white p-6 flex flex-col items-start border-2 rounded-l-2xl shadow-lg">
         <div className="w-full flex items-center gap-3 border-b-2 mb-4">
            <Image src="/image/logo_ccr.png" alt="CCR ViaSmart" width={60} height={60} />
            <div className='w-[2] h-[30] bg-white'></div>
            <h1 className="text-lg font-light">ViaSmart</h1>
        </div>
        
        <div className="w-full flex flex-col items-center gap-4 ">

            <h2 className="text-3xl font-medium">Filtros</h2>
            <BotaoFiltro src="/image/icon-check.png" titulo="Normal" onClick={() => setFiltro("normal")} />
            <BotaoFiltro src="/image/icon-pause.png" titulo="Pausada" onClick={() => setFiltro("pausada")} />
            <BotaoFiltro src="/image/icon-limpar.png" titulo="Limpar" onClick={() => setFiltro("todos")} />
            <br />
        </div>

               
      </aside>

      {/* Main Content */}
      <main className="w-3/4 bg-white p-10 rounded-r-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Linhas  e Estações</h2>
        {loading ? (
          <div className="w-full text-center py-10 text-lg text-gray-600">🔄 Carregando estações...</div>
        ) : (
          <div className="max-h-[775px] overflow-y-auto border rounded-xl shadow-inner">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-2">Linha</th>
                  <th className="text-center p-2">Estação</th>
                  <th className="text-center p-2">Ação</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.map((item, index) => {
                  const corLinha = coresPorLinha[item.nomeLinha.trim()] ?? 'bg-gray-100';

                  return (
                    <tr key={index} className={`${corLinha} bg-opacity-20 border-b`}>
                      <td className={`p-4 text-center font-semibold ${corLinha.replace('bg-', 'text-')}`}>
                        {item.nomeLinha}
                      </td>
                      <td className="p-4 text-center">{item.nomeEstacao}</td>
                      <td className="p-4 flex justify-center gap-2">
                        <ToggleSwitch
                          enabled={item.status === "Ativa"}
                          onToggle={(newState: boolean) => {
                            const novoStatus = newState ? "Ativa" : "Pausada";

                            fetch(`http://localhost:8080/estacoes/${item.idEstacoes}/status`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "text/plain",
                              },
                              body: novoStatus,
                            })
                              .then((res) => {
                                if (res.ok) {
                                  console.log(`Estação ${item.nomeEstacao} agora está ${novoStatus}`);
                                  setDados((prev) =>
                                    prev.map((e) =>
                                      e.idEstacoes === item.idEstacoes ? { ...e, status: novoStatus } : e
                                    )
                                  );
                                } else {
                                  console.error("❌ Falha ao atualizar status");
                                }
                              })
                              .catch((err) => {
                                console.error("Erro na requisição:", err);
                              });
                          }}
                        />


                      </td>
                      <td className={`p-2 text-center ${item.status === "Ativa" ? "text-green-500" : "text-orange-500"}`}>
                        {item.status}
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};


export default Dash;
