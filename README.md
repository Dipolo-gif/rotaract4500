# Sua História Faz Parte da Nossa

Site do projeto de memória institucional do **Distrito 4500 Caloroso de Rotaract**.

Um acervo digital que resgata, registra e preserva as histórias de quem fez e
faz parte do movimento. O acervo começa vazio de propósito: ele cresce a cada
depoimento coletado e é feito para durar entre gestões.

---

## O que tem no site

| Página | O que traz |
|---|---|
| `index.html` | Abertura, manifesto, o que é o projeto, por que importa, quem pode participar, formatos de registro e a prévia do acervo |
| `acervo.html` | As fichas do acervo, com busca e filtros por década, clube e formato |
| `participar.html` | Passo a passo, roteiro das oito perguntas, formatos aceitos, formulário de envio e dúvidas |

---

## Como rodar no seu computador

Com [Node](https://nodejs.org) instalado:

```bash
node servidor.js
```

Depois abra `http://localhost:4500`.

Sem Node, abra `index.html` com dois cliques. Funciona quase tudo.

---

## Como publicar

O site é totalmente estático: só HTML, CSS e JavaScript, sem build e sem
dependências. Arraste a pasta inteira para [Netlify Drop](https://app.netlify.com/drop),
ou publique por Vercel ou GitHub Pages.

---

## Estrutura

```
rotaract-4500/
├── index.html            página inicial
├── acervo.html           acervo de histórias
├── participar.html       roteiro e formulário
│
├── dados/
│   ├── config.js         contatos, redes e textos globais  ← mexa aqui
│   └── historias.js      o acervo                          ← e aqui
│
├── assets/
│   ├── marca/            emblema do Rotary, já recortado
│   ├── fotos/            retratos e fotos históricas       ← e aqui
│   └── grafismos/        ícone da aba do navegador
│
├── css/estilo.css        todo o visual do site
├── js/                   comportamento do site
├── servidor.js           servidor local, só para testar
└── COMO-EDITAR.md        guia completo de manutenção
```

---

## Manutenção

Todo o dia a dia está explicado em **[COMO-EDITAR.md](COMO-EDITAR.md)**: como
colocar o logotipo oficial, trocar contatos, adicionar uma história nova,
preparar fotos e publicar.

---

## Identidade visual

Cores e tipografia seguem o [Rotary Brand Center](https://brandcenter.rotary.org).
O **Cranberry `#D41367`**, cor oficial do Rotaract, é a cor principal: botões,
links, faixas e a palavra Rotaract. O Gold aparece no emblema do Rotary.
As cores da marca são usadas puras, sem alteração de tom ou transparência.
O tom de papel do fundo é um neutro de apoio, escolhido para dar ao site
caráter de acervo.

Tipografia: **Open Sans** no texto corrido, que é a substituta oficial da
Frutiger indicada para web, e **Newsreader** nos títulos, no lugar da Sentinel.

> O emblema oficial do Rotary está em `assets/marca/rotary.png`, na versão de uma
> cor com a faixa vazada e fundo transparente. O **logotipo do Rotaract**, que junta
> o emblema à palavra Rotaract e à frase "Clube parceiro do Rotary", só existe no
> Brand Center e vale ser instalado quando você tiver acesso.

---

## Acessibilidade

Navegação por teclado em todo o site, links de pular para o conteúdo, foco
visível, textos alternativos nas imagens, respeito à preferência de movimento
reduzido do sistema e contraste conferido nas combinações de texto e fundo.
O conteúdo do roteiro de perguntas continua legível mesmo se o JavaScript
não carregar.
