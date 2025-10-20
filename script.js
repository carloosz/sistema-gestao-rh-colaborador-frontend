/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */
// scripts/dev-local.js
const { spawn } = require('child_process');
const { networkInterfaces } = require('os');

// Função para obter o IP local
function getLocalIP() {
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Procura IPv4 e ignora interfaces loopback internas
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  // Retorna localhost se nenhum IP for encontrado
  return '127.0.0.1';
}

// Obtém o IP local
const localIP = getLocalIP();

// Inicia o Next.js com o IP local
const nextProcess = spawn('npx', ['next', 'dev', '--hostname', localIP], {
  stdio: 'inherit',
  shell: true,
});

// Gerencia encerramento adequado
process.on('SIGINT', () => {
  nextProcess.kill('SIGINT');
  process.exit(0);
});

nextProcess.on('close', code => {
  process.exit(code);
});
