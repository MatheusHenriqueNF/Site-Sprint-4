import React from "react";
import Image from "next/image";

type BotaoProps = {
  titulo?: string;
  onClick?: () => void;
  cor?: string;
  corTexto?: string;
  src: string;
};

const BotaoFiltro: React.FC<BotaoProps> = ({
  titulo = "Titulo",
  onClick,
  cor = "#222FD4",
  corTexto = "white",
  src = "SRC"
}) => {
  return (
    <div
    className="w-3/4 sm:h-[60px] md:h-[70px] lg:h-[50px]  mb-2 rounded-2xl  cursor-pointer flex items-center justify-center gap-5"
      style={{ backgroundColor: cor,
               color: corTexto    
       }} 
      onClick={onClick}
    >
      <Image src={src} width={40} height={30} alt="icon de trem"/>
      <p className="text-lg md:text-xl font-light">{titulo}</p>
    </div>
  );
};

export default BotaoFiltro;
