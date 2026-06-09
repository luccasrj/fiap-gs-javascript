const inputBusca = document.getElementById('busca-geradores');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroRegiao = document.getElementById('filtro-regiao');
const tabela = document.getElementById('tabela-geradores');

function aplicarFiltros() {
  const termo = inputBusca ? inputBusca.value.toLowerCase().trim() : '';
  const tipo = filtroTipo ? filtroTipo.value.toLowerCase() : '';
  const regiao = filtroRegiao ? filtroRegiao.value.toLowerCase() : '';

  if (!tabela) return;
  tabela.querySelectorAll('tbody tr').forEach(function (linha) {
    const texto = linha.textContent.toLowerCase();
    const matchTermo = texto.includes(termo);
    const matchTipo = !tipo || texto.includes(tipo);
    const matchRegiao = !regiao || texto.includes(regiao);
    linha.style.display = (matchTermo && matchTipo && matchRegiao) ? '' : 'none';
  });
}

if (inputBusca) inputBusca.addEventListener('input', aplicarFiltros);
if (filtroTipo) filtroTipo.addEventListener('change', aplicarFiltros);
if (filtroRegiao) filtroRegiao.addEventListener('change', aplicarFiltros);

const ctxComprador = document.getElementById('grafico-impacto');
if (ctxComprador) {
  new Chart(ctxComprador, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'tCO2e evitadas',
        data: [1.2, 1.8, 1.5, 2.3, 2.7, 3.1],
        borderColor: '#06d6a0',
        backgroundColor: 'rgba(6, 214, 160, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#06d6a0'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#e2e8f0' } }
      },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: '#1a2236' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: '#1a2236' }, beginAtZero: true }
      }
    }
  });
}
