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

const municipiosPorEstado = {
  AC: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
  AL: ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
  AP: ['Macapá', 'Santana', 'Laranjal do Jari'],
  AM: ['Manaus', 'Parintins', 'Itacoatiara'],
  BA: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari'],
  CE: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú'],
  DF: ['Brasília'],
  ES: ['Vitória', 'Serra', 'Vila Velha', 'Cariacica'],
  GO: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
  MA: ['São Luís', 'Imperatriz', 'Timon'],
  MT: ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
  MS: ['Campo Grande', 'Dourados', 'Três Lagoas'],
  MG: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
  PA: ['Belém', 'Ananindeua', 'Santarém', 'Marabá'],
  PB: ['João Pessoa', 'Campina Grande', 'Santa Rita'],
  PR: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
  PE: ['Recife', 'Caruaru', 'Olinda', 'Jaboatão dos Guararapes'],
  PI: ['Teresina', 'Parnaíba', 'Picos'],
  RJ: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu'],
  RN: ['Natal', 'Mossoró', 'Parnamirim'],
  RS: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas'],
  RO: ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
  RR: ['Boa Vista', 'Rorainópolis'],
  SC: ['Florianópolis', 'Joinville', 'Blumenau', 'São José'],
  SP: ['São Paulo', 'Guarulhos', 'Campinas', 'Santos', 'São Bernardo do Campo'],
  SE: ['Aracaju', 'Lagarto', 'Nossa Senhora do Socorro'],
  TO: ['Palmas', 'Araguaína', 'Gurupi']
};

if (selectEstado) {
  selectEstado.addEventListener('change', function () {
    const uf = selectEstado.value;
    selectMunicipio.innerHTML = '<option value="">Selecione o município</option>';

    if (!uf) {
      selectMunicipio.disabled = true;
      return;
    }

    const municipios = municipiosPorEstado[uf] || [];
    municipios.forEach(function (nome) {
      const opt = document.createElement('option');
      opt.value = nome;
      opt.textContent = nome;
      selectMunicipio.appendChild(opt);
    });
    selectMunicipio.disabled = false;
  });
}

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
    if (previewEl) previewEl.innerHTML = '— <span class="kpi-unit">tCO2e</span>';
    setTimeout(function () {
      if (formSuccess) formSuccess.classList.add('hidden');
    }, 6000);
  });
}
