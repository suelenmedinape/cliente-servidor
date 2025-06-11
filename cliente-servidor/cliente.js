import http from 'node:http';
import readline from 'node:readline';
import { calculandoAsRaizesDaExpressao } from './intervalo.js';

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(texto) {
  return new Promise((resolve) => {
    leitor.question(texto, (resposta) => {
      resolve(resposta.trim());
    });
  });
}

async function entrada() {
  try {
    console.log("=== Método da Bisseção ===");

    const expressao = await perguntar("Digite a expressão f(x): ");
    const temIntervalos = await perguntar("Você já tem os intervalos? (s/n): ");

    let intervaloIni = null;
    let intervaloFim = null;

    if (temIntervalos.toLowerCase() === "s") {
      intervaloIni = parseFloat(await perguntar("Digite o intervalo inicial (a): "));
      intervaloFim = parseFloat(await perguntar("Digite o intervalo final (b): "));
    } else if (temIntervalos.toLowerCase() === "n") {
      const resultado = calculandoAsRaizesDaExpressao(expressao);

      if (typeof resultado === 'string') {
        console.log("Não foi possível encontrar intervalos automaticamente.");
        leitor.close();
        return;
      }

      intervaloIni = resultado.intervaloIni;
      intervaloFim = resultado.intervaloFim;

      console.log(`Intervalo encontrado: [${intervaloIni}, ${intervaloFim}]`);
    }

    const erro = await perguntar("Digite o erro (ex: 0.001): ");

    const mensagem = JSON.stringify({
      erro,
      intervaloIni,
      intervaloFim,
      expressao,
      encontrarIntervalo: temIntervalos.toLowerCase() === "n"
    });

    enviarMensagem(mensagem);

  } catch (err) {
    console.error("Erro na entrada:", err);
  }
}

function enviarMensagem(mensagem) {
  const request = http.request(
    {
      hostname: "localhost",
      port: 3333,
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(mensagem),
      },
    },
    (response) => {
      response.on("data", (chunk) => {
        console.log(`\nResposta do servidor:\n${chunk.toString()}`);
        leitor.close();
      });
    }
  );

  request.on("error", (err) => {
    console.error(`Erro ao conectar: ${err.message}`);
  });

  request.write(mensagem);
  request.end();
}

entrada();
