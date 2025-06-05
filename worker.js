import { parentPort, workerData } from 'node:worker_threads';

const { mensagem, ip } = workerData;

console.log(`Mensagem Recebida de ${ip}: "${mensagem}"`);
parentPort.postMessage(`Mensagem Recebida`);