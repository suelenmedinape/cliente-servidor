import http from 'node:http';
import readline from 'node:readline';

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function enviarMensagem(mensagem) {
  const request = http.request(
    {
      hostname: "localhost",
      port: 3333,
      method: "POST",
      headers: {
        "content-Type": "text/plain",
        "Content-Length": mensagem.length,
      },
    }, response => {
      response.on("data", (chunk) => {
        console.log(`Resposta do servidor: ${chunk.toString()}`);
      });
    }
  );

  request.on("error", (err) => {
    console.error(`Erro ao conectar: ${err.message}`);
  });

  request.write(mensagem);
  request.end();
}

function entrada() {
  leitor.question("Digite sua msg ('sair' para encerrar): ", (resposta) => {
    if (
      resposta.toLowerCase() === "sair" ||
      resposta.toLowerCase() === "encerrar"
    ) {
      console.log("Cliente Encerrado.");
      leitor.close();
      return;
    }

    enviarMensagem(resposta);
    entrada(); // continua o loop
  });
}

entrada();
