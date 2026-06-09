iniciarFiltroBusca('busca-lotes', 'tabela-lotes');

const ctxGerador = document.getElementById('grafico-ecocredit');
if (ctxGerador) {
  new Chart(ctxGerador, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'EcoCredits (tCO2e)',
        data: [0.52, 0.61, 0.48, 0.73, 0.89, 1.05],
        backgroundColor: 'rgba(0, 180, 216, 0.7)',
        borderColor: '#00b4d8',
        borderWidth: 1,
        borderRadius: 4
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

const timers = [
  { id: 'timer-1', segundos: 9250 },
  { id: 'timer-2', segundos: 18760 },
  { id: 'timer-3', segundos: 43100 }
];

timers.forEach(function (t) {
  const el = document.getElementById(t.id);
  if (!el) return;
  let restante = t.segundos;

  setInterval(function () {
    if (restante <= 0) {
      el.textContent = 'Expirado';
      el.classList.add('timer--expired');
      return;
    }
    restante--;
    const h = Math.floor(restante / 3600);
    const m = Math.floor((restante % 3600) / 60);
    const s = restante % 60;
    el.textContent = 'Expira em ' +
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');
    if (restante < 3600) el.classList.add('timer--urgent');
  }, 1000);
});
