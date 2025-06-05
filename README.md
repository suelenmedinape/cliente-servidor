# 🖧 Aplicação Cliente-Servidor em Node.js

Este projeto demonstra uma aplicação cliente-servidor construída com **JavaScript puro** utilizando o **Node.js**. A aplicação implementa conceitos básicos de **sistemas distribuídos** e **concorrência**, permitindo que múltiplos clientes se conectem a um servidor e recebam respostas manuais.

---

## ✨ Funcionalidades

- Comunicação entre cliente e servidor via HTTP
- Processamento de múltiplos clientes com `worker_threads`
- Entrada manual de respostas no terminal do servidor
- Identificação de clientes por IP
- Execução local simples para fins educacionais

---

## 📁 Estrutura do projeto
.  
├── server.js # Servidor que escuta e delega para workers  
├── client.js # Cliente que envia mensagens para o servidor  
└── worker.js # Worker que processa cada mensagem e responde manualmente  

---

## Execute o Servidor
`node server.js`
Você verá como: Servidor rodando na porta 3333

## Em outro terminal, execute o cliente
`node cliente.js`
