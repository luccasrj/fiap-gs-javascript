const FATORES_EMISSAO = {
  organico: 1.3,
  plastico: 0.04,
  metal: 0.001,
  eletronico: 0.08,
  oleo: 0.5
};

function calcularEcoCredit(pesoKg, tipoResiduo) {
  const fator = FATORES_EMISSAO[tipoResiduo] || 0;
  if (fator === 0) return 0;
  const metanoKg = pesoKg * fator;
  const co2Equivalente = metanoKg * 80;
  return Math.round((co2Equivalente / 1000) * 10000) / 10000;
}

const selectEstado = document.getElementById('select-estado');
const selectMunicipio = document.getElementById('select-municipio');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  .then(function (res) { return res.json(); })
  .then(function (estados) {
    selectEstado.innerHTML = '<option value="">Selecione o estado</option>';
    estados.forEach(function (uf) {
      const opt = document.createElement('option');
      opt.value = uf.sigla;
      opt.textContent = uf.nome;
      selectEstado.appendChild(opt);
    });
  })
  .catch(function () {
    selectEstado.innerHTML = '<option value="">Erro ao carregar estados</option>';
  });

selectEstado.addEventListener('change', function () {
  const sigla = selectEstado.value;
  selectMunicipio.innerHTML = '<option value="">Carregando municípios...</option>';
  selectMunicipio.disabled = true;

  if (!sigla) {
    selectMunicipio.innerHTML = '<option value="">Selecione o estado primeiro</option>';
    return;
  }

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + sigla + '/municipios?orderBy=nome')
    .then(function (res) { return res.json(); })
    .then(function (municipios) {
      selectMunicipio.innerHTML = '<option value="">Selecione o município</option>';
      municipios.forEach(function (m) {
        const opt = document.createElement('option');
        opt.value = m.nome;
        opt.textContent = m.nome;
        selectMunicipio.appendChild(opt);
      });
      selectMunicipio.disabled = false;
    })
    .catch(function () {
      selectMunicipio.innerHTML = '<option value="">Erro ao carregar municípios</option>';
      selectMunicipio.disabled = false;
    });
});

const inputPeso = document.getElementById('peso-kg');
const selectTipo = document.getElementById('tipo-residuo');
const previewEl = document.getElementById('preview-ecocredit');

function atualizarPreview() {
  const peso = parseFloat(inputPeso ? inputPeso.value : 0);
  const tipo = selectTipo ? selectTipo.value : '';
  if (peso > 0 && tipo) {
    const credito = calcularEcoCredit(peso, tipo);
    if (previewEl) previewEl.innerHTML = credito + ' <span class="kpi-unit">tCO2e</span>';
  } else {
    if (previewEl) previewEl.innerHTML = '— <span class="kpi-unit">tCO2e</span>';
  }
}

if (inputPeso) {
  inputPeso.addEventListener('keydown', function (e) {
    const permitidos = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (permitidos.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  });
  inputPeso.addEventListener('input', function () {
    inputPeso.value = inputPeso.value.replace(/[^\d]/g, '');
    atualizarPreview();
  });
}

if (selectTipo) selectTipo.addEventListener('change', atualizarPreview);

function validarCampo(id, groupId) {
  const el = document.getElementById(id);
  const group = document.getElementById(groupId);
  if (!el || !group) return true;
  const valido = el.value.trim() !== '';
  group.classList.toggle('has-error', !valido);
  return valido;
}

function validarNumero(id, groupId) {
  const el = document.getElementById(id);
  const group = document.getElementById(groupId);
  if (!el || !group) return true;
  const valido = parseFloat(el.value) >= 1;
  group.classList.toggle('has-error', !valido);
  return valido;
}

const form = document.getElementById('form-cadastro-lote');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const ok = [
      validarCampo('tipo-residuo', 'group-tipo'),
      validarNumero('peso-kg', 'group-peso'),
      validarCampo('frequencia', 'group-frequencia'),
      validarCampo('select-estado', 'group-estado'),
      validarCampo('select-municipio', 'group-municipio'),
      validarCampo('endereco', 'group-endereco'),
      validarCampo('disponibilidade', 'group-disponibilidade')
    ].every(Boolean);

    if (!ok) return;

    if (formSuccess) formSuccess.classList.remove('hidden');
    form.reset();
    selectMunicipio.innerHTML = '<option value="">Selecione o estado primeiro</option>';
    selectMunicipio.disabled = true;
    if (previewEl) previewEl.innerHTML = '— <span class="kpi-unit">tCO2e</span>';
    setTimeout(function () {
      if (formSuccess) formSuccess.classList.add('hidden');
    }, 6000);
  });
}
