import React from "react";

type BotaoProps = {
  titulo?: string;
  clicando?: () => void;
  cor?: string;
  corTexto?: string;
  tipo?: "button" | "submit" | "reset";
};

const Botao: React.FC<BotaoProps> = ({
  titulo = "Título",
  clicando,
  cor = "#3B48EF",
  corTexto = "white",
  tipo = "submit"
}) => {
  return (
    <button
      type={tipo}
      onClick={clicando}
      style={{ backgroundColor: cor, color: corTexto }}
      className="w-60 h-12 rounded-3xl flex justify-center items-center font-semibold cursor-pointer text-2xl  shadow-md hover:opacity-90 transition"
    >
      {titulo}
    </button>
  );
};

export default Botao;
