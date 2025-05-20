# 📍 ViaSmart - Interface Web

Este repositório contém o código-fonte da interface web do projeto **ViaSmart**, desenvolvido com **Next.js** e voltado para um totem de consulta de rotas, dúvidas frequentes e gerenciamento de colaboradores.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse a pasta do projeto
cd [site-web](https://github.com/MatheusHenriqueNF/Site-Sprint-4)

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
````

A aplicação estará disponível em localhost:
📎 [http://localhost:3000](http://localhost:3000)

---

## 🔐 Como logar

Ao iniciar a aplicação, você será direcionado à tela de login.

### Acesso como Engenheiro de Sistemas (Cargo com acesso total do sistema):

* **Usuário:** `ES@5948`
* **Senha:** `193420`

### Acesso como Controlador de Trafego (Cargo com acesso ao sistema):

* **Usuário:** `CT@4078`
* **Senha:** `496305`

> Esses dados são utilizados apenas para testes locais e devem ser ajustados conforme os usuários cadastrados no banco de dados da aplicação.

---

## ✨ Funcionalidades do site

### 📋 Dúvidas Frequentes

* Lista de perguntas e respostas organizadas
* Expansão da resposta ao clicar na pergunta

### 👨‍💼 Área do Colaborador

* Login de usuário
* Cadastro de novos colaboradores
* Redefinição de senha (somente para cargos autorizados = "Engenheiro de Sistemas")
* Alteração de status (ativo/inativo)
* Visualização e gerenciamento das permissões

---

## 🌐 Integração com a API

Este site consome endpoints da API Java Quarkus (RESTful) para:

* Buscar estações
* Listar e gerenciar dúvidas frequentes
* Autenticar usuários e permissões

> ⚠️ Certifique-se de que a **API está online** e com **CORS habilitado** para permitir chamadas do front-end.

---

## 🧠 Tecnologias utilizadas

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)

---

## 🖥️ Deploy no Vercel

O projeto pode ser acessado facilmente via VERCEL, porém não será possível navegar, pois o projeto não consegue ter acesso com a API em JAVA que esta localhost [Vercel]([https://vercel.com/](https://vercel.com/matheus-freitas-projects-364d2ef3/site-sprint-4-xcep)):

```bash
# Instale o CLI da Vercel (se desejar)
npm install -g vercel

# Realize o deploy
vercel
```

---

## 📌 Observações

* Certifique-se de configurar corretamente a URL da API no código (substituir `localhost` por URL pública)

---

## 🪖

Integrantes:

**CLEYTON ENRIKE DE OLIVEIRA – RM 560485 - Turma 1TDSQ**
**MATHEUS HENRIQUE NASCIMENTO DE FREITAS – RM 560442 - Turma 1TDSQ**
**MATHEUS PINHEIRO ERMACORA MARTIN – RM 557720 - Turma 1TDSZ**
