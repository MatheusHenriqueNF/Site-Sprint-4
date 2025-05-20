import Image from "next/image"
import React from "react";

type ImageProps = {
    src ?: string;
    alt ?: string;
}

type TextoProps = {
    texto ?: string;
}

const Logo:React.FC<ImageProps & TextoProps> = (
    {
        src = "SRC",
        alt = "Imagem",
        texto = "Texto"

    } 
) =>{
    return(
        <>

            <div
            className="w-[600] h-[735] bg-[#3B48EF] flex flex-col justify-center items-center rounded-l-3xl p-8 shadow-2xl">
                <h1 className="text-white font-medium text-5xl mb-10">Bem-vindo!</h1>
                <h2 className="text-white font-semibold text-4xl">VIASMART</h2>
                <div className="w-43 h-3 bg-gradient-to-r from-white to-[#3B48EF] rounded-l rounded-tl-2xl"></div>
                <Image src={src} width={400} height={400} alt={alt} className="mt-8 mb-8"/>
                <p className="font-light text-2xl text-white text-center">{texto}</p>
            </div>

        </>
    )
}

export default Logo