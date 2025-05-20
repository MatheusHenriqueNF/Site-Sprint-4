"use client";

import React, { useEffect, useState } from "react";
import Input from "../Input/input";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  duvidaSelecionada?: {
    idDuvida: number;
    pergunta: string;
    resposta: string;
  };
};

const PreencherDuvida: React.FC<Props> = ({ duvidaSelecionada }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [idDuvida, setIdDuvida] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (duvidaSelecionada) {
      setPergunta(duvidaSelecionada.pergunta);
      setResposta(duvidaSelecionada.resposta);
      setIdDuvida(duvidaSelecionada.idDuvida);
    } else {
      const perguntaParam = searchParams.get("pergunta");
      const respostaParam = searchParams.get("resposta");
      const idParam = searchParams.get("idDuvida");

      if (perguntaParam && respostaParam && idParam) {
        setPergunta(perguntaParam);
        setResposta(respostaParam);
        setIdDuvida(Number(idParam));
      }
    }
  }, [duvidaSelecionada, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pergunta.trim() || !resposta.trim()) {
      setMensagem("❗ Preencha todos os campos.");
      return;
    }

    const url = idDuvida
      ? `http://localhost:8080/duvidas/${idDuvida}`
      : "http://localhost:8080/duvidas";

    const metodo = idDuvida ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pergunta,
          resposta,
        }),
      });

      if (res.ok) {
        setMensagem("✅ Dúvida salva com sucesso!");
        setTimeout(() => {
          router.push("/pages/Duvidas");
        }, 1000);
      } else {
        const texto = await res.text();
        setMensagem(`Erro: ${texto}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem("❌ Erro ao salvar a dúvida.");
    }
  };

  return (
    <div className="w-[600px] h-[735px] bg-white rounded-r-3xl p-6 shadow-2xl">
      <h1 className="text-[30px] font-semibold mb-4 text-[#3B48EF]">
        {idDuvida ? "Editar Dúvida" : "Cadastrar Dúvida"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="h-[600px] flex flex-col justify-center items-center mt-4"
      >
        <div className="w-full mb-10">
          <Input
            label="Pergunta"
            placeholder="Digite a pergunta"
            name="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
          />
        </div>

        <div className="w-full mb-10">
          <Input
            label="Resposta"
            placeholder="Digite a resposta"
            name="resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />
        </div>

        {mensagem && (
          <p className="text-center text-sm text-red-500 mb-2">{mensagem}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#3B48EF] text-2xl font-semibold text-white py-2 rounded-2xl mt-4"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default PreencherDuvida;
