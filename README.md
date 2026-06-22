# Pokédex PWA – Aplicação Web Progressiva para Consulta de Pokémon

## 1. Descrição do Projeto

A Pokédex PWA é uma aplicação desenvolvida utilizando React com o objetivo de consultar informações sobre Pokémon por meio da integração com a PokéAPI. A aplicação apresenta dados como nome, imagens, pontos de vida, habilidades e movimentos, além de disponibilizar recursos de armazenamento local e funcionamento offline.

O projeto foi desenvolvido como atividade avaliativa da disciplina de Construção de Páginas Web IV, aplicando conceitos de Progressive Web Applications (PWA), componentização, reutilização de código e persistência de dados.

---

## 2. Funcionalidades Implementadas

### Funcionalidades Principais

* Consulta de Pokémon por nome ou número de identificação.
* Exibição de imagem padrão e versão shiny.
* Visualização dos pontos de vida (HP).
* Exibição de habilidades e movimentos.
* Sistema de favoritos com armazenamento local.
* Cache de dados utilizando LocalStorage.
* Funcionamento offline por meio de Service Worker.
* Navegação entre três telas da aplicação:

  * Home
  * Detalhes
  * Favoritos

### Recursos Adicionais

* Interface responsiva para diferentes tamanhos de tela.
* Feedback visual para ações do usuário.
* Barra de progresso para exibição do HP.
* Componentes reutilizáveis.
* Instalação da aplicação como PWA.

---

## 3. Tecnologias Utilizadas

### Front-end

* React
* JavaScript (ES6+)
* SCSS
* Vite

### Recursos PWA

* Web App Manifest
* Service Worker
* LocalStorage

### API Externa

* PokéAPI

---

## 4. Instruções de Execução

### Pré-requisitos

É necessário possuir instalado:

* Node.js
* NPM (Node Package Manager)

### Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd pokedex-melhorado
```

Instale as dependências:

```bash
npm install
```

### Execução em Ambiente de Desenvolvimento

Execute o comando:

```bash
npm run dev
```

Após a inicialização, a aplicação estará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

### Geração da Versão de Produção

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta:

```text
dist/
```

### Visualização da Build de Produção

```bash
npm run preview
```

---

## 5. Estrutura do Projeto

```text
pokedex-melhorado/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
├── README.md
├── MELHORIAS.md
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── manifest.json
│   └── sw.js
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    │
    ├── components/
    │   └── CartaPokemon.jsx
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── Favorites.jsx
    │   └── Details.jsx
    │
    ├── services/
    │   └── pokeApiService.js
    │
    ├── hooks/
    │   └── useFavorites.js
    │
    ├── styles/
    │   ├── cartaPok.scss
    │   └── pages.scss
    │
    └── assets/
        ├── react.svg
        ├── vite.svg
        └── hero.png
```

### Responsabilidades dos Diretórios

| Diretório  | Responsabilidade                                                    |
| ---------- | ------------------------------------------------------------------- |
| public     | Arquivos públicos da aplicação, incluindo Manifest e Service Worker |
| components | Componentes reutilizáveis da interface                              |
| pages      | Telas principais da aplicação                                       |
| services   | Comunicação com a PokéAPI e tratamento dos dados                    |
| hooks      | Hooks customizados para reutilização de lógica                      |
| styles     | Arquivos de estilização da aplicação                                |
| assets     | Recursos visuais utilizados pela interface                          |

---

## 6. Fluxo da Aplicação

### Home

O usuário informa o nome ou número de um Pokémon. A aplicação realiza uma consulta à PokéAPI e apresenta as informações encontradas.

### Detalhes

São exibidas informações completas do Pokémon selecionado, incluindo imagem padrão, versão shiny, pontos de vida, habilidades e movimentos.

### Favoritos

O usuário pode adicionar Pokémon à lista de favoritos. Os dados permanecem armazenados localmente utilizando LocalStorage.

### Funcionamento Offline

Os dados consultados ficam armazenados localmente. Caso não exista conexão com a internet, a aplicação utiliza as informações armazenadas para continuar funcionando.

---

## 7. Conceitos Aplicados

### React

* Componentes funcionais.
* Hooks.
* Componentização.
* Reutilização de código.
* Gerenciamento de estado.

### Progressive Web Application (PWA)

* Manifest completo.
* Service Worker.
* Funcionamento offline.
* Instalação da aplicação em dispositivos compatíveis.

### Organização de Código

* Separação de responsabilidades.
* Estrutura modular.
* Componentes reutilizáveis.
* Centralização da comunicação com APIs.

---

## 8. Considerações Finais

O desenvolvimento deste projeto possibilitou a aplicação prática dos conceitos estudados na disciplina de Construção de Páginas Web IV, especialmente aqueles relacionados ao desenvolvimento com React, consumo de APIs, armazenamento local de dados e implementação de Progressive Web Applications (PWA).

Entre as principais dificuldades encontradas durante o desenvolvimento destacam-se a implementação do funcionamento offline por meio do Service Worker, o gerenciamento do cache utilizando LocalStorage e a organização da aplicação de forma modular e reutilizável.

Como trabalhos futuros, podem ser implementados recursos adicionais, como filtros avançados de pesquisa, comparação entre Pokémon, expansão das informações apresentadas ao usuário e melhorias na experiência de navegação.

---

## 9. Referências

* PokéAPI: https://pokeapi.co/
* React: https://react.dev/
* Vite: https://vitejs.dev/
* MDN Web Docs – Progressive Web Apps: https://developer.mozilla.org/
