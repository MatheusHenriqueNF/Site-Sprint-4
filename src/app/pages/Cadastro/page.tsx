'use client';
import Logo from "../../components/Logo/logo";
import Preencher from "../../components/PreenchimentoDados/preenchimentodados";
import { useAuth } from "@/app/hook/useAuth";


const Cadastrar = ()=> {

  useAuth();  
  
  return (
    <div className="w-full h-screen flex justify-center items-center p-8 box-border bg-[#F4F4F4]">
      <Logo src="/image/colaborador.png" alt="Imagem de cadastro" texto="Área para realizar cadastro de um colaborador"/>
      <Preencher
        titulo="Cadastrar"
        corTexto="#3B48EF"
        tipo="cadastro"
        inputs={[
          { label: "Usuário", placeholder: "Digite o usuário",name: "usuario" },
          { label: "Senha", placeholder: "Digite a senha",name:"senha", type:"password" },
          { label: "Senha", placeholder: "Confirme a senha",name:"confirmarSenha", type:"password" },
        ]}
        botaoTitulo="Cadastrar"
      />
    </div>
  );
}
export default Cadastrar;