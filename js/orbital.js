const dadosSatelitais = [
  { regiao: 'Belém — PA', metano: 1847, status: 'alert', statusLabel: 'Lixão Confirmado', score: 87 },
  { regiao: 'Manaus — AM', metano: 1623, status: 'warning', statusLabel: 'Risco Médio', score: 62 },
  { regiao: 'Recife — PE', metano: 1412, status: 'normal', statusLabel: 'Normal', score: 31 },
  { regiao: 'Goiânia — GO', metano: 1534, status: 'monitoring', statusLabel: 'Monitorando', score: 75 }
];

let indiceAtual = 0;

function atualizarPainelOrbital(dado) {
  const elRegiao = document.getElementById('regiao-atual');
  const elMetano = document.getElementById('metano-valor');
  const elBadge = document.getElementById('status-badge');
  const elBar = document.getElementById('score-bar');
  const elScore = document.getElementById('score-valor');

  if (elRegiao) elRegiao.textContent = dado.regiao;
  if (elMetano) elMetano.textContent = dado.metano;
  if (elScore) elScore.textContent = dado.score + '/100';

  if (elBadge) {
    elBadge.textContent = dado.statusLabel;
    elBadge.className = 'badge badge--' + dado.status;
  }

  if (elBar) {
    elBar.style.width = dado.score + '%';
    elBar.className = 'progress-fill progress-fill--' + dado.status;
  }
}

atualizarPainelOrbital(dadosSatelitais[0]);

setInterval(function () {
  indiceAtual = (indiceAtual + 1) % dadosSatelitais.length;
  atualizarPainelOrbital(dadosSatelitais[indiceAtual]);
}, 5000);

iniciarFiltroBusca('busca-regioes', 'tabela-regioes');
