import { parentPort, workerData } from 'node:worker_threads';

const { mensagem, ip } = workerData;

console.log(`Mensagem recebida de ${ip}:`, mensagem);

function verificacao(expressaoRecebida) {
  let expressao = expressaoRecebida;

  expressao = expressao.replace(/\be\b/g, `${Math.E}`);
  expressao = expressao.replace(/cos/g, `Math.cos`);
  expressao = expressao.replace(/sin|sen/g, `Math.sin`);
  expressao = expressao.replace(/log/g, `Math.log10`);
  expressao = expressao.replace(/ln\s*\(/g, `Math.log(`);
  expressao = expressao.replace(/tan/g, `Math.tan`);

  return expressao;
}

function expressaoCalculo(valorX, expressaoRecebida) {
  let expressao = verificacao(expressaoRecebida);
  expressao = expressao.replace(/x/g, `${valorX}`);
  expressao = expressao.replace(/\^/g, '**');
  return eval(expressao);
}

function metodoDaBisecao({ erro, intervaloIni, intervaloFim, expressao }) {
  let k, error;
  let xk = null;
  let f_a = null, f_b = null, f_xk = null;
  let sinal = null;
  let a = intervaloIni;
  let b = intervaloFim;
  let i = 0;
  let express = expressao;
  let errorCalculado = null;

  error = erro.replace(/\^/g, '**');
  error = eval(error);

  k = (Math.log(b - a) - Math.log(error)) / Math.log(2);
  k = Math.ceil(k);

  while (Math.abs(b - a) > error && i <= k) {
    xk = (a + b) / 2;
    f_a = expressaoCalculo(a, express);
    f_b = expressaoCalculo(b, express);
    f_xk = expressaoCalculo(xk, express);
    sinal = f_xk * f_a;

    if (sinal > 0) {
      a = xk;
    } else {
      b = xk;
    }

    errorCalculado = Math.abs(b - a);
    i++;
  }

  return { xk, f_xk, errorCalculado, iteracoes: i };
}

try {
  const dados = JSON.parse(mensagem);
  const resultado = metodoDaBisecao(dados);

  parentPort.postMessage(
    `Resultado da Bisseção:\nRaiz aproximada: ${resultado.xk}\nErro calculado: ${resultado.errorCalculado}\nIterações: ${resultado.iteracoes}`
  );
} catch (err) {
  parentPort.postMessage(`Erro ao calcular: ${err.message}`);
}
