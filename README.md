# 🌐 BasicWebSite — Portfólio Académico Web

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://goncalo-alegria-a22408663.github.io/)

**Website académico e portfólio pessoal com 7 labs progressivos — de HTML semântico a uma loja interativa com API REST**

[Descrição](#-descrição) •
[Labs](#-labs) •
[Tecnologias](#-tecnologias) •
[Estrutura](#-estrutura) •
[Demonstração](#-demonstração) •
[Instalação](#-instalação)

---

## 📋 Descrição

O **BasicWebSite** é um portfólio académico desenvolvido no âmbito da unidade curricular de **Desenvolvimento de Interfaces Web** na Universidade Lusófona. O projeto reúne 7 labs práticos que acompanham a evolução desde páginas HTML estáticas até interfaces dinâmicas com JavaScript, manipulação do DOM e integração com APIs REST.

O site inclui uma página principal de apresentação pessoal, uma secção dedicada aos projetos realizados e uma área com contexto sobre a disciplina.

---

## 🧪 Labs

Cada lab representa uma etapa na aprendizagem de desenvolvimento web:

| Lab | Tema | Conceitos |
|---|---|---|
| **Lab 1** | Estrutura HTML | HTML semântico, estrutura base de uma página web |
| **Lab 2** | Estilização CSS | Layout responsivo, Flexbox, propriedades visuais |
| **Lab 3** | Introdução a JavaScript | Scripts básicos, variáveis, funções |
| **Lab 4** | Eventos e DOM | Eventos do rato, manipulação dinâmica do DOM |
| **Lab 5** | Interações JS | Inputs, contadores, alteração dinâmica de cores |
| **Lab 6** | Mini Loja | Interface de loja com produtos e cesto |
| **Lab 7** | Loja DEISI Completa | API REST, filtros, ordenação, pesquisa, checkout com descontos |

### Lab 7 — Funcionalidades Avançadas

O lab mais completo inclui:

| Funcionalidade | Descrição |
|---|---|
| 🛒 **Cesto de Compras** | Adicionar/remover produtos com persistência em `localStorage` |
| 🔍 **Pesquisa** | Filtro em tempo real por nome do produto |
| 📂 **Categorias** | Filtro por categoria carregada da API |
| ↕️ **Ordenação** | Por preço crescente ou decrescente |
| 🎓 **Desconto Estudante** | 25% de desconto para estudantes |
| 🏷️ **Cupão** | Desconto adicional de 15% com código `black-friday` |
| 💳 **Checkout** | Integração com API REST para finalizar compra |

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **HTML5** | Estrutura semântica das páginas |
| **CSS3** | Estilização, layout responsivo, Flexbox |
| **JavaScript** | Interatividade, manipulação do DOM, eventos |
| **Fetch API** | Comunicação com API REST externa |
| **localStorage** | Persistência do cesto de compras no browser |
| **GitHub Pages** | Hosting do site |

---

## 📁 Estrutura

```
BasicWebSite/
├── index.html              # Página principal (Início / Projetos / Disciplina)
├── styles.css              # Estilos globais
├── images/                 # Imagens do site
│
├── lab1/                   # HTML semântico
├── lab2/                   # CSS e layout responsivo
├── lab3/                   # Introdução a JavaScript
├── lab4/                   # Eventos e manipulação do DOM
├── lab5/                   # Interações JS avançadas
├── lab6/                   # Mini loja
└── lab7/                   # Loja DEISI completa com API
```

---

## 🚀 Demonstração

O projeto está disponível online via GitHub Pages:

### **🔗 [Ver website](https://goncalo-alegria-a22408663.github.io/)**

---

## 💻 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/goncaloalegria/BasicWebSite.git
cd BasicWebSite
```

### 2. Executar Localmente

Abrir o `index.html` diretamente no browser, ou usar o **Live Server** no VSCode:

1. Instalar a extensão **Live Server** no VSCode
2. Clicar direito em `index.html` → **Open with Live Server**
3. O site abre automaticamente em `http://localhost:5500`

> **Nota**: O Lab 7 requer ligação à internet para aceder à API de produtos em `deisishop.pythonanywhere.com`.

---

## 🔧 Resolução de Problemas

| Problema | Solução |
|---|---|
| Produtos não carregam | Verificar ligação à internet e acesso a `deisishop.pythonanywhere.com/products` |
| Estilos não aplicam | Verificar que o caminho do CSS está correto no `<link>` do HTML |
| Live Server não funciona | Instalar a extensão no VSCode e reiniciar |

---

## 👤 Autor

- **Gonçalo Alegria** — [@goncaloalegria](https://github.com/goncaloalegria)

---

## 🙏 Agradecimentos

- [Universidade Lusófona](https://www.ulusofona.pt/) — Instituição de ensino
- [GitHub Pages](https://pages.github.com/) — Hosting gratuito
- [DEISI Shop API](https://deisishop.pythonanywhere.com/) — API de produtos para o Lab 7
