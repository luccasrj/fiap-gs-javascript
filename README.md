# EcoOrbit — WD (Web Development · JavaScript)

**Marketplace de Resíduos com Inteligência Orbital**
FIAP · Global Solution 2026 · Engenharia de Software · Semi Presencial RJ

---

## Manual de Interatividade

### Interações presentes em todas as páginas (`js/main.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Botão **"Alerta Orbital"** (header) | Exibe faixa vermelha de emergência no topo da página, muda cor do header para vermelho. Clicar novamente desfaz. |
| Campo de **busca** nas tabelas | Filtra as linhas da tabela em tempo real conforme o usuário digita. |

---

### `index.html` — Dashboard do Gerador (`js/dashboard-gerador.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Campo **"Buscar lotes"** | Filtra a tabela de lotes em tempo real por ID ou tipo de resíduo. |
| **Gráfico de barras** | Renderizado automaticamente via Chart.js. Exibe EcoCredits gerados nos últimos 6 meses. |
| **Timers das propostas** | Contadores regressivos (hh:mm:ss) atualizados a cada 1 segundo via `setInterval`. Ficam vermelhos quando restam menos de 1 hora. |
| Botão **"Anunciar Lote"** | Exibe/oculta o bloco de formulário via `classList.toggle('hidden')`. |

---

### `comprador.html` — Dashboard do Comprador (`js/dashboard-comprador.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Campo **"Buscar geradores"** | Filtra a tabela em tempo real por nome, tipo ou região. |
| Dropdown **"Tipo"** | Filtra a tabela pelos tipos: Orgânico, Plástico, Metal, Eletrônico, Óleo. Combinável com os outros filtros. |
| Dropdown **"Região"** | Filtra a tabela pela região do gerador. Combinável com os outros filtros. |
| **Gráfico de linha** | Renderizado automaticamente via Chart.js. Exibe tCO2e evitadas por mês. |

---

### `orbital.html` — Painel Orbital Público (`js/orbital.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| **Painel orbital ao vivo** | Atualiza automaticamente a cada **5 segundos** via `setInterval`. Troca região, valor de metano (ppb), badge de status e barra de score. Simula chegada de dados do satélite TROPOMI. |
| Campo **"Buscar regiões"** | Filtra a tabela de regiões monitoradas em tempo real. |

---

### `cadastro-lote.html` — Cadastro de Lote (`js/cadastro-lote.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Dropdown **"Estado"** | Populado automaticamente ao carregar a página via **API IBGE** (`fetch`). Lista todos os estados do Brasil em ordem alfabética. |
| Dropdown **"Município"** | Desabilitado até o estado ser selecionado. Ao selecionar, carrega os municípios via **API IBGE**. |
| Campos **"Tipo"** e **"Peso"** | O **EcoCredit estimado** é calculado em tempo real e exibido em tCO2e. |
| Botão **"Cadastrar Lote"** | Valida todos os campos obrigatórios sem `alert()` nativo. Exibe mensagem de sucesso em verde se válido. |
| Campo numérico **"Peso"** | Bloqueia entrada de letras — aceita apenas dígitos. |

---

## Organização do Repositório

```
/
├── index.html
├── comprador.html
├── orbital.html
├── cadastro-lote.html
├── integrantes.txt
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── dashboard-gerador.js
│   ├── dashboard-comprador.js
│   ├── orbital.js
│   └── cadastro-lote.js
└── assets/
    ├── icons/
    └── moodboard/
```

---

*EcoOrbit · FIAP Global Solution 2026 · Engenharia de Software 1º Ano · Semi Presencial RJ*
