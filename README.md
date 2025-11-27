# 🏨 AnimalHotels - Gestão de Hospedagem Pet

O **AnimalHotels** é uma aplicação web "Full Stack" desenvolvida para o gerenciamento de um hotel para animais. O sistema simula um painel administrativo moderno (estilo Airbnb para pets), permitindo o cadastro seguro de tutores e o gerenciamento dos seus respectivos animais de estimação.

Este projeto foi desenvolvido como atividade prática da disciplina de **Programação para Internet II**.

## ✨ Funcionalidades

* **Autenticação Segura:** Login com validação de credenciais e geração de Token JWT.
* **Dashboard Interativo:** Visão geral rápida dos tutores cadastrados.
* **Gestão de Tutores (CRUD):** Criar, listar, editar e excluir tutores.
* **Gestão de Animais (CRUD):** Adicionar, editar e remover pets vinculados a um tutor específico (Relação 1:N).
* **Interface Moderna:** UI polida e responsiva utilizando componentes do Shadcn/ui e Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

**Front-end:**
* React + Vite + TypeScript
* Tailwind CSS (Estilização)
* Shadcn/ui (Componentes visuais: Cards, Dialogs, Toasts)
* Axios (Integração com API)
* React Router Dom (Navegação)

**Back-end:**
* Node.js
* Express
* JSON Web Token (JWT) para segurança
* UUID (Geração de IDs únicos)

---

## 🚀 Como Rodar o Projeto

Este projeto é dividido em duas partes: o **Servidor (Back-end)** e a **Interface (Front-end)**. Você precisará de dois terminais abertos para rodar a aplicação completa.

### Pré-requisitos
* Ter o **Node.js** instalado no seu computador.

### Passo 1: Configurar e Rodar o Back-end (API)

1.  Abra o terminal na pasta raiz do projeto.
2.  Acesse a pasta do servidor:
    ```bash
    cd back-end
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor:
    ```bash
    node server.js
    ```
    *Você verá a mensagem: `🔥 BACKEND RODANDO NA PORTA 3000`*

### Passo 2: Configurar e Rodar o Front-end

1.  Abra um **novo terminal** (não feche o anterior).
2.  Navegue até a pasta do front-end:
    ```bash
    cd front-end/furry-friends-host
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Rode a aplicação:
    ```bash
    npm run dev
    ```
5.  Acesse o link exibido no terminal (geralmente `http://localhost:8080`).

---

## 🔑 Credenciais de Acesso

Para acessar o sistema, utilize as seguintes credenciais padrão configuradas no servidor:

* **Email:** Qualquer email válido (ex: `teste@teste.com`)
* **Senha:** `123456`

---

## 👥 Colaboradores

Este projeto foi desenvolvido por:

* **Luiz Felipe**: [https://github.com/Luiz-06](https://github.com/Luiz-06)
* **Thalysson**: [https://github.com/thalyssonDEV](https://github.com/thalyssonDEV)
