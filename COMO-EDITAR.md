# Como mexer no site

Guia para quem vai manter o site do projeto **Sua História Faz Parte da Nossa**,
do Distrito 4500 Caloroso de Rotaract.

Você não precisa saber programar. Tudo que muda no dia a dia está em três lugares:
a pasta `dados/`, a pasta `assets/` e os textos dentro dos arquivos `.html`.

---

## 1. A marca no cabeçalho

O site usa o **emblema oficial do Rotary** em `assets/marca/rotary.png`, na versão
de uma cor, com a faixa "ROTARY INTERNATIONAL" vazada.

O arquivo original que você enviou era um JPEG com fundo branco, e JPEG não guarda
transparência. Então o fundo foi recortado e o arquivo salvo como PNG. Isso importa
por dois motivos:

- Sobre o papel creme do site, não aparece um quadrado branco em volta
- Como o texto da faixa é **vazado de verdade**, o fundo aparece por dentro das
  letras. É por isso que o mesmo arquivo funciona no cabeçalho claro, na ficha da
  página inicial e como marca d'água branca sobre a faixa do rodapé

O original está guardado em `assets/marca/rotary-original.jpg`, caso um dia você
precise refazer o recorte.

### Se quiser trocar o emblema

Substitua `assets/marca/rotary.png` por outro arquivo com o mesmo nome. Precisa ser
**PNG com fundo transparente**, quadrado, com pelo menos 480 pixels de lado. Se o
que você tiver for JPEG ou tiver fundo branco, me peça para recortar.

### O que ainda vale instalar

O logotipo do **Rotaract**, que é o emblema junto da palavra Rotaract e da frase
"Clube parceiro do Rotary". Ele é a marca correta de um distrito de Rotaract e só
existe oficialmente no Brand Center.

### Onde baixar

1. Entre no [Brand Center do Rotary](https://brandcenter.rotary.org) com seu login do Meu Rotary
2. Vá em **Logotipos e artes gráficas**
3. Baixe o logotipo do **Rotaract** em português, preferencialmente em `.svg` ou `.png` com fundo transparente
4. Baixe também a versão em branco, para usar sobre a faixa do rodapé

> A frase **"Clube parceiro do Rotary"** faz parte do logotipo do Rotaract e não
> pode ser removida nem separada da marca.

### Onde colocar

Salve os arquivos em `assets/marca/` com estes nomes exatos:

```
assets/marca/rotaract.svg          (versão colorida, para o cabeçalho)
assets/marca/rotaract-branco.svg   (versão branca, para o rodapé)
```

### Como trocar no site

Em **cada um** dos três arquivos `.html` (`index.html`, `acervo.html` e
`participar.html`), procure por este trecho:

```html
<a class="marca" href="index.html">
  <img class="marca__roda" src="assets/marca/rotary.png" alt="" width="480" height="480">
  <span class="marca__texto">
    <span class="marca__nome">Rotaract</span>
    <span class="marca__sub">Distrito 4500 Caloroso</span>
  </span>
</a>
```

E troque por:

```html
<a class="marca" href="index.html">
  <img class="marca__oficial" src="assets/marca/rotaract.svg" alt="Rotaract, clube parceiro do Rotary">
  <span class="marca__texto">
    <span class="marca__sub">Distrito 4500 Caloroso</span>
  </span>
</a>
```

Pronto. O tamanho já está ajustado pelo CSS.

---

## 2. Trocar contatos, WhatsApp e redes sociais

Abra `dados/config.js`. É um arquivo de texto comum, pode editar no Bloco de
Notas. Mude só o que está entre aspas:

```js
nomeDistrito: "Caloroso",
email: "projeto@rotaract4500.org.br",
whatsapp: "5500000000000",
whatsappRotulo: "(00) 00000-0000",
instagram: "https://instagram.com/rotaract4500",
```

O campo `nomeDistrito` é o nome do distrito, que o site escreve junto do número
em todos os lugares: "Distrito 4500 Caloroso".

**Importante sobre o WhatsApp:** escreva só os números, com o código do país e o
DDD, sem espaço, traço ou parêntese. Um número de Minas Gerais fica assim:
`5531999999999`.

Para esconder uma rede social do rodapé, deixe as aspas vazias: `facebook: "",`

O botão "Enviar por WhatsApp" da página Participe só funciona depois que esse
número for preenchido. Enquanto estiver zerado, ele avisa a pessoa e sugere o e-mail.

---

## 3. Adicionar uma história ao acervo

Este é o trabalho contínuo do projeto. O acervo começa vazio e cresce a cada
depoimento recebido.

Abra `dados/historias.js`. Dentro dos colchetes `[ ]`, cole um bloco assim para
cada pessoa:

```js
{
  nome: "Ana Ribeiro Fontes",
  clube: "Rotaract Club de Belo Horizonte",
  periodo: "1996-2001",
  decada: "1990",
  cargo: "Presidente 1999/2000",
  foto: "assets/fotos/ana-ribeiro.jpg",
  formato: "Entrevista",
  trecho: "A gente montava a festa junina inteira no sábado e desmontava no domingo.",
  respostas: [
    { p: "Quando você entrou no Rotaract?", r: "Em 1996, com dezenove anos." },
    { p: "O que o Rotaract mudou na sua vida?", r: "Aprendi a falar em público." }
  ]
},
```

### O que cada campo faz

| Campo | Para que serve |
|---|---|
| `nome` | Aparece grande na ficha |
| `clube` | Aparece embaixo do nome e alimenta o filtro por clube |
| `periodo` | Aparece na aba da ficha, no canto direito |
| `decada` | Só os quatro dígitos: `"1990"`. É o que alimenta o filtro por década e define a cor da ficha |
| `cargo` | Opcional. Deixe `""` se não houver |
| `foto` | Caminho do arquivo. Deixe `""` e a ficha mostra as iniciais da pessoa |
| `formato` | `"Entrevista"`, `"Vídeo"`, `"Texto"`, `"Áudio"`, `"Fotografia"` ou `"Documento"` |
| `trecho` | A frase de capa. Entre 60 e 140 caracteres funciona melhor |
| `respostas` | As perguntas respondidas. Apague as linhas das que ficaram em branco |

### As cinco regras que evitam erro

1. Todo texto fica entre **aspas duplas**
2. Cada bloco termina com **vírgula depois da chave**: `},`
3. Se o texto tiver aspas duplas por dentro, troque por aspas simples
4. Nunca apague os colchetes `[` e `]`
5. Salve, atualize a página no navegador e confira

Se o acervo sumir depois de uma edição, foi vírgula ou aspas. Desfaça a última
mudança e tente de novo com calma.

### As cores das fichas

A cor da faixa no topo de cada ficha vem da década, automaticamente, usando a
paleta oficial do Rotary:

| Década | Cor |
|---|---|
| 1970 | Violet |
| 1980 | Cranberry |
| 1990 | Cardinal |
| 2000 | Turquoise |
| 2010 | Sky Blue |
| 2020 | Grass |

---

## 4. Colocar fotos

Salve as imagens em `assets/fotos/`.

**Antes de subir, prepare a foto:**

- Formato `.jpg` para retratos e fotos antigas, `.png` só se precisar de fundo transparente
- Largura de **1200 pixels** já é bastante. Foto de celular direto da câmera pesa muito e deixa o site lento
- Deixe o arquivo abaixo de **300 KB**
- Nome do arquivo **sem espaço, sem acento e sem letra maiúscula**: `ana-ribeiro.jpg`, nunca `Ana Ribeiro.JPG`
- As fichas cortam a foto no formato 4 por 3, então deixe o rosto mais ou menos no centro

Para digitalizar foto de papel, uma foto de celular bem iluminada, tirada de
cima e sem sombra, resolve.

No acervo as fotos aparecem em preto e branco e ganham cor quando a pessoa passa
o mouse por cima. Isso é proposital, dá unidade ao conjunto mesmo com fotos de
qualidades muito diferentes.

---

## 5. Mudar textos das páginas

Os textos ficam dentro dos arquivos `.html`. Abra no Bloco de Notas ou no
[VS Code](https://code.visualstudio.com), procure a frase que quer trocar e
edite. Mexa só no que está **entre** as marcações, nunca nas marcações em si:

```html
<p>Este texto pode ser trocado à vontade.</p>
```

O que é cada arquivo:

| Arquivo | Página |
|---|---|
| `index.html` | Página inicial |
| `acervo.html` | O acervo com as fichas e os filtros |
| `participar.html` | Roteiro de perguntas e formulário de envio |

---

## 6. Ver o site no seu computador antes de publicar

Se tiver o [Node](https://nodejs.org) instalado, abra o terminal na pasta do
projeto e rode:

```bash
node servidor.js
```

Depois abra `http://localhost:4500` no navegador. Para parar, aperte `Ctrl+C`.

Sem o Node, dá para abrir o `index.html` com dois cliques. Funciona quase tudo,
mas o servidor é mais fiel ao resultado final.

---

## 7. Publicar na internet

O site é feito de arquivos soltos, sem programa por trás. Isso significa que dá
para hospedar de graça em vários lugares. As três opções mais simples:

**Netlify Drop** (mais rápido, não precisa de conta para testar)
1. Entre em [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `rotaract-4500` inteira para a página
3. Pronto, o site sobe com um endereço automático

**Vercel** ou **GitHub Pages** funcionam igualmente bem e permitem apontar um
domínio próprio, como `historia.rotaract4500.org.br`.

Ao publicar, suba a pasta inteira. O arquivo `servidor.js` e este guia não
atrapalham, mas podem ser apagados da versão publicada se você preferir.

---

## 8. Coisas que é melhor não mexer

- A pasta `css/` define toda a aparência. Uma vírgula fora do lugar aqui
  desmonta o layout inteiro
- A pasta `js/` faz o site funcionar: menu, filtros, formulário
- `assets/grafismos/` guarda a roda e o ícone da aba do navegador
- As linhas com `<use href="#roda">` dentro dos HTML

Se precisar mexer nessas partes, chame alguém que trabalhe com sites.

---

## 9. Sobre as cores e as fontes

Tudo no site usa as cores oficiais do Rotary, tiradas do Brand Center, sem
alteração de tom ou transparência sobre elas:

**Liderança:** Royal Blue `#17458F` · Azure `#0067C8` · Gold `#F7A81B`
**Apoio:** Sky Blue `#00A2E0` · Cranberry `#D41367` · Cardinal `#E02927` ·
Turquoise `#00ADBB` · Orange `#FF7600` · Violet `#901F93` · Grass `#009739`
**Neutros:** Powder Blue `#B9D9EB` · Taupe `#D9C89E` · Slate `#657F99` ·
Charcoal `#54565A` · Cloud `#D6D1CA`

O **Cranberry `#D41367`** é a cor do Rotaract (PMS 214C) e é ela que conduz o site:
botões, links, faixas do manifesto e do rodapé, números, filetes, o carimbo e a
palavra Rotaract. O Royal Blue passou a ser cor de apoio, nas sombras dos botões e
nas categorias coloridas. O Gold vem do emblema do Rotary.

Duas regras que o site respeita e vale manter:

- Sobre as faixas cor de Cranberry, o texto é **branco puro**. Branco translúcido,
  dourado e azul claro não alcançam contraste suficiente sobre essa cor.
- Números e etiquetas bem pequenos usam um Cranberry um pouco mais fechado
  (`--rosa-texto`), porque o tom puro fica no limite da legibilidade em corpo miúdo.

Para destacar a palavra em algum texto novo, é só envolver assim:

```html
O <span class="rotaract">Rotaract</span> é formado por pessoas.
```

Use só sobre fundo claro. Nas faixas do manifesto e do rodapé, que já são da cor
do Rotaract, a palavra segue em branco como o resto do texto.

O tom de papel usado como fundo é um neutro de apoio, escolhido para o acervo.
As cores da marca aparecem sempre puras, como manda o manual.

**Fontes:** Open Sans para o texto corrido, que é a substituta oficial indicada
pelo Rotary para uso em sites quando a Frutiger não está disponível. Newsreader
para os títulos, no lugar da Sentinel, que é paga. IBM Plex Mono para os códigos
de ficha e etiquetas de arquivo.

Se o distrito comprar a licença da Frutiger e da Sentinel, dá para trocar em
`css/base.css`, nas linhas `--display` e `--corpo`.

---

## 10. Uma última coisa

O site é a versão pública do projeto, não o documento dele. Justificativa,
objetivos específicos, metodologia, cronograma e recursos ficaram de fora de
propósito: quem chega aqui está sendo convidado a contar uma história, não a
aprovar um projeto. Se precisar apresentar o projeto ao distrito, use o documento
original, não o site.

As perguntas do roteiro e os textos de apresentação vieram do documento. Se ele
mudar, vale ajustar o site para os dois continuarem contando a mesma coisa.
