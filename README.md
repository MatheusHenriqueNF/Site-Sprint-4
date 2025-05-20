# 📍 ViaSmart - Interface Web

Este repositório contém o código-fonte da interface web do projeto **ViaSmart**, desenvolvido com **Next.js** e voltado para um totem de consulta de rotas, dúvidas frequentes e gerenciamento de colaboradores.

---

## 🚀 Como executar o site localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Passos

```bash
# Clone o repositório
git clone https://github.com/MatheusHenriqueNF/Site-Sprint-4

# Acesse a pasta do projeto
cd https://github.com/MatheusHenriqueNF/Site-Sprint-4

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
````

A aplicação estará disponível em localhost:
📎 [http://localhost:3000](http://localhost:3000)

---
## 🔧 Como rodar a API Java (Quarkus) no IntelliJ IDEA

### ✅ Pré-requisitos

* **Java 17** instalado ([OpenJDK 17](https://jdk.java.net/17/))
* **Maven** instalado ou configurado pelo IntelliJ
* **IntelliJ IDEA** (Community ou Ultimate)
* Conexão ativa com o banco de dados Oracle
* A API clonada localmente

---

### 💡 Instalar o plugin do Quarkus no IntelliJ

1. Abra o IntelliJ IDEA
2. Vá até `File > Settings > Plugins`

 ![image](https://github.com/user-attachments/assets/705c1ef7-0dcf-4afe-8241-1f0292099a5b)

3. Busque por **Quarkus** no Marketplace

![image](https://github.com/user-attachments/assets/6ec2b20b-3477-42e2-af0d-ac8b68856ed3)


4. Clique em **Install**
5. Reinicie o IntelliJ após a instalação

---

### 🚀 Executar a API no IntelliJ

1. **Importe o projeto:**

   * Vá em `File > Open` e selecione a pasta do projeto da API Java
   * O IntelliJ reconhecerá o projeto Maven automaticamente

  ![image](https://github.com/user-attachments/assets/cd72b62a-3bcf-4872-89d4-b97cc87ab498)


2. **Verifique o arquivo `pom.xml`:**

   * Certifique-se de que todas as dependências estão resolvidas (ícone verde no canto superior direito)

3. **Configure as variáveis de ambiente (se necessário):**

   * Como `QUARKUS_DATASOURCE_USERNAME`, `QUARKUS_DATASOURCE_PASSWORD` e `QUARKUS_DATASOURCE_JDBC_URL`
   * Isso pode ser feito dentro da aba `Edit Configurations` > `Application` > `Environment variables`

4. **Execute a API pelo RUN:**

   * RUN > Selecione o run com Quarkus

![image](https://github.com/user-attachments/assets/f5e56bd9-ce26-4488-a7ff-43ecf77d3d8e)


5. **Execute a API pelo TERMINAL:**

   * TERMINAL > Digite: cd .\projeto-challenge-api\
   * Depois digite: mvn quarkus:dev

6. **A API estará disponível em:**

   ```
   http://localhost:8080
   ```

---

### 📌 Endpoints úteis

* **Login:** `POST http://localhost:8080/login`
* **Listar estações:** `GET http://localhost:8080/estacoes-linhas`
* **Dúvidas frequentes:** `GET http://localhost:8080/duvidas`

> Garanta que o CORS está habilitado no projeto Quarkus (`application.properties`):

```properties
quarkus.http.cors=true
```
---
### NAVEGANDO PELO SITE
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

### 🚨A navegação no site só é permitida quando o usuário estiver autenticado, caso contrário não será possível utilizar o site

### 📋 Dúvidas Frequentes

* Lista de perguntas e respostas organizadas
* Atualização de pergunta e resposta
* Atualização de status (ativo/pausada) da pergunta e resposta
* Cadastro de pergunta e resposta no banco de dados

### 👨‍💼 Área do Colaborador

* Login de usuário
* Cadastro de novos colaboradores
* Redefinição de senha (somente para cargos autorizados = "Engenheiro de Sistemas")
* Alteração de status (ativo/inativo)
* Visualização e gerenciamento das permissões

### 🚉 Linhas e Estações
* Alteração de status (ativo/inativo)
* Visualização e gerenciamento das estações

---

## 🌐 Integração com a API

Este site consome endpoints da API Java Quarkus (RESTful) para:

* Listar e gerenciar linhas e estações
* Listar e gerenciar dúvidas frequentes
* Listar e gerenciar usuários
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

O projeto pode ser acessado facilmente via VERCEL, porém não será possível navegar, pois o projeto não consegue ter acesso com a API em JAVA que esta localhost https://vercel.com/matheus-freitas-projects-364d2ef3/site-sprint-4-xcep

```bash
# Instale o CLI da Vercel (se desejar)
npm install -g vercel

# Realize o deploy
vercel
```

---

## ⚠️ Observações importantes

* Caso a **API esteja rodando localmente**, o Vercel **não conseguirá acessá-la**.

---


# ACESSE TAMBÉM O TOTEM DESENVOLVIDO AQUI: https://github.com/MatheusHenriqueNF/Totem-Sprint-4


---

## 🪖 Integrantes do Grupo

* **CLEYTON ENRIKE DE OLIVEIRA** – RM 560485 - Turma 1TDSQ
* **MATHEUS HENRIQUE NASCIMENTO DE FREITAS** – RM 560442 - Turma 1TDSQ
* **MATHEUS PINHEIRO ERMACORA MARTIN** – RM 557720 - Turma 1TDSZ
