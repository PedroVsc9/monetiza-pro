# MonetizaPro 💰

Dashboard pessoal para gerenciamento de campanhas, links e textos de divulgação de infoprodutos.

## 📌 Sobre o projeto

Há alguns meses comecei a trabalhar com monetização digital e venda de infoprodutos. Com o crescimento das minhas campanhas, senti a necessidade de ter uma ferramenta própria para organizar tudo — desde os links de divulgação até os textos prontos para disparo no WhatsApp.

Aproveitei minha experiência como QA para planejar, desenvolver e testar a aplicação do zero. Desenvolver a aplicação me ajudou a enxergar o sistema pelo lado do desenvolvedor, o que tem melhorado muito minha atuação como QA — consigo mapear os fluxos críticos mais rápido, antecipar onde os bugs costumam aparecer e escrever casos de teste muito mais precisos.

O projeto está em constante evolução e continuo adicionando novos cenários de teste e funcionalidades conforme uso no dia a dia.

## ✨ Funcionalidades

- 🔐 **Autenticação** — cadastro e login por email, com dados isolados por usuário
- 🏪 **Lojas** — cadastro de lojas parceiras com configuração de links
- 📦 **Produtos** — gerenciamento de produtos com preço, cupom, parcelas e link de divulgação
- 💬 **Texto de Disparo** — gerador de mensagens formatadas para WhatsApp com pré-visualização em tempo real
- 🏷️ **Cupons** — cadastro e cópia rápida de cupons de desconto
- 🌐 **Meu Site** — configuração do site de ofertas pessoal
- 🔗 **Link Bio** — página estilo Linktree com pré-visualização ao vivo
- 👤 **Minha Conta** — gerenciamento de perfil

## 🛠️ Tecnologias

- React + Vite
- React Router DOM
- Lucide React
- LocalStorage — persistência de dados por usuário
- CSS puro com variáveis customizadas

## 🧪 Testes

### Selenium + Pytest (Python)
```bash
pip install selenium pytest pytest-html webdriver-manager
python -m pytest tests/ -v
```

### Cypress (JavaScript)
```bash
npm install
npx cypress open
```

Cenários cobertos até o momento:
- Cadastro com sucesso
- Login com sucesso
- Senha incorreta
- Email não cadastrado

> Novos cenários sendo adicionados continuamente conforme o projeto evolui.

## 🚀 Como rodar

```bash
git clone https://github.com/PedroVsc9/monetiza-pro.git
cd monetiza-pro
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

## 📄 Licença

Projeto pessoal — uso livre para estudos.
