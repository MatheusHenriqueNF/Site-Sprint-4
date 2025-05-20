'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@/app/components/Logo/logo";
import PreencherDuvida from "@/app/components/PreecherDuvida/PreencherDuvida";
import { useAuth } from "@/app/hook/useAuth";

const Conteudo = () => {
  useAuth();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const pergunta = searchParams.get("pergunta");
  const resposta = searchParams.get("resposta");

  const duvidaSelecionada = id && pergunta && resposta
    ? {
        idDuvida: Number(id),
        pergunta: decodeURIComponent(pergunta),
        resposta: decodeURIComponent(resposta),
      }
    : undefined;

  return (
    <div className="w-full h-screen flex justify-center items-center p-8 box-border bg-[#F4F4F4]">
      <Logo
        src="/image/FAQ.png"
        alt="Imagem de um computador com cadeado"
        texto="Área FAQ - Responda as dúvidas que as pessoas possam ter."
      />
      <PreencherDuvida duvidaSelecionada={duvidaSelecionada} />
    </div>
  );
};

const Pergunta = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <Conteudo />
  </Suspense>
);

export default Pergunta;
