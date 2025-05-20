import Logo from "./components/Logo/logo";
import Preencher from "./components/PreenchimentoDados/preenchimentodados";

export default function Home() {
    return (
        <div className="w-full h-screen flex justify-center items-center p-8 box-border bg-[#F4F4F4]">
            <Logo src="/image/seguranca.png" alt="Imagem de um computador com cadeado" texto="Área Restrita apenas pessoas autorizadas podem acessar"/>
            <Preencher
                titulo="Entrar"
                corTexto="#3B48EF"
                tipo="login"
                inputs={[
                    { label: "Usuário", placeholder: "Digite seu usuário", name: "usuario" },
                    { label: "Senha", placeholder: "Digite sua senha", name: "senha", type: "password" }
                ]}
                botaoTitulo="Entrar"
            />
        </div>
    );
}