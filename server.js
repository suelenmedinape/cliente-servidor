import { createServer } from "node:http";
import { Worker } from "node:worker_threads";
import { once } from "node:events";

const server = createServer( async (request, response) => {
  const [body] = await once(request, 'data');
  const mensagem = body.toString();
  const ip = request.socket.localAddress; // pega o ip do clinte

  const worker = new Worker("./worker.js", {
    workerData: { mensagem, ip }
  });

  worker.on("message", (resposta) => {
    response.writeHead(200, { "content-Type": "text/plain" });
    response.end(resposta);
  });

  worker.on("error", () => {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erro no Server");
  });
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
