const btnEmergency = document.getElementById('btn-emergency');
const emergencyBanner = document.getElementById('emergency-banner');
const header = document.querySelector('.page-header');

if (btnEmergency) {
  btnEmergency.addEventListener('click', function () {
    const active = emergencyBanner.classList.toggle('active');
    if (header) header.classList.toggle('header--emergency', active);
    btnEmergency.setAttribute('aria-pressed', active);
  });
}

const btnAnunciar = document.getElementById('btn-anunciar-lote');
const formAnunciar = document.getElementById('form-anunciar');

if (btnAnunciar && formAnunciar) {
  btnAnunciar.addEventListener('click', function () {
    formAnunciar.classList.toggle('hidden');
    const expanded = !formAnunciar.classList.contains('hidden');
    btnAnunciar.setAttribute('aria-expanded', expanded);
  });
}

function iniciarFiltroBusca(inputId, tabelaId) {
  const input = document.getElementById(inputId);
  const tabela = document.getElementById(tabelaId);
  if (!input || !tabela) return;

  input.addEventListener('input', function () {
    const termo = input.value.toLowerCase().trim();
    const linhas = tabela.querySelectorAll('tbody tr');
    linhas.forEach(function (linha) {
      const texto = linha.textContent.toLowerCase();
      linha.style.display = texto.includes(termo) ? '' : 'none';
    });
  });
}
