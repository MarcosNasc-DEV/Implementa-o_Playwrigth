# 🎭 Automação de Testes com Playwright - Demoblaze

Este projeto contém uma suite de testes automatizados para o site **Demoblaze**, desenvolvida utilizando o **Playwright** com o padrão de projeto **Page Objects Model (POM)** para garantir uma estrutura limpa, organizada e de fácil manutenção.

## Tecnologias Utilizadas

- **Node.js** (Ambiente de execução)
- **Playwright** (Framework de automação)
- **JavaScript** (Linguagem de programação)

## Estrutura do Projeto

- `pages/`: Contém as classes Page Objects (`HomePage.js`, `CartPage.js`) mapeando os elementos e ações das telas.
- `tests/`: Contém os arquivos de cenários de teste (`demoblaze.spec.js`).
- `playwright.config.js`: Arquivo de configuração global do framework.

## Como Executar o Projeto Localmente

Siga os passos abaixo para rodar os testes na sua máquina:

### 1. Clonar o repositório

```bash
git clone https://github.com
cd Implementa-o_Playwrigth
```

### 2. Instalar as dependências do projeto

```bash
npm install
```

### 3. Instalar os navegadores do Playwright

```bash
npx playwright install
```

### 4. Executar os testes

Você pode rodar os testes de diferentes formas através do terminal:

- **Executar todos os testes (Modo Headless/em segundo plano):**

  ```bash
  npx playwright test
  ```

- **Executar os testes mostrando o navegador (Modo Headed):**

  ```bash
  npx playwright test --headed
  ```

- **Abrir a interface visual do Playwright (UI Mode):**

  ```bash
  npx playwright test --ui
  ```

- **Visualizar o relatório técnico após os testes:**
  ```bash
  npx playwright show-report
  ```
