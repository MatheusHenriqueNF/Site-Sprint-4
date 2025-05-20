"use client";
import Botao from "@/app/components/Botao/botao";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/hook/useAuth";
const Menu = () => {
    useAuth();

  return (
    <>
        <header className="w-full h-[90] bg-[#3B48EF] flex items-center justify-center">
            <Image src="/image/logo_ccr.png" alt="CCR ViaSmart" width={80} height={80} />
            <div className='w-[2] h-[50] bg-white'></div>
            <h1 className="text-xl font-light text-white ml-2">ViaSmart</h1>
        </header>

        <main className="flex flex-col items-center justify-center h-[850] bg-[#F4F4F4]">
            <div className="w-full flex items-center justify-end  p-5"> 
              <Botao
                titulo="Sair"
                clicando={() => {
                  localStorage.removeItem("usuarioLogado");
                  window.location.href = "/"; 
                }}
              />
            </div>
            
            <div className="flex  items-center justify-center h-[850] bg-[#F4F4F4] gap-15">
              <Link href={"/pages/Colaborador"}>
                <div className="w-[400px] h-[600px] bg-white rounded-4xl shadow-lg flex flex-col items-center justify-center">
                    <Image src={"/image/dashboard.png"} alt="Imagem da opção de dashboard de colaboradores" width={500} height={70}/>
                    <h2 className="text-3xl font-bold">Colaboradores</h2>
                </div>
              </Link>

              <Link href={"/pages/Dash"}>
                <div className="w-[400px] h-[600px] bg-white rounded-4xl shadow-lg flex flex-col items-center justify-center">
                    <Image src={"/image/trem.png"} alt="Imagem da opção de trem" width={500} height={70}/>
                    <h2 className="text-3xl font-bold">Linhas e Estações</h2>
                </div>
              </Link>

              <Link href={"/pages/Duvidas"}>
                <div className="w-[400px] h-[600px] bg-white rounded-4xl shadow-lg flex flex-col items-center justify-center">
                    <Image src={"/image/duvidas.png"} alt="Imagem da opção de trem" width={500} height={70}/>
                    <h2 className="text-3xl font-bold">Dúvidas</h2>
                </div>
                </Link>
              </div>
        </main>
    </>
  );
}

export default Menu;