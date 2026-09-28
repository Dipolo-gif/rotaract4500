/* =========================================================================
   historias.js: O ACERVO
   -------------------------------------------------------------------------
   Cada história que você coletar vira um bloco { ... } dentro da lista
   abaixo. O site monta as fichas, os filtros e a contagem sozinho.

   COMO ADICIONAR UMA HISTÓRIA
   1. Copie o modelo comentado logo abaixo (tudo entre { e },).
   2. Cole dentro dos colchetes [ ] da lista HISTORIAS.
   3. Preencha os campos e salve o arquivo.
   4. Atualize a página no navegador. Pronto.

   REGRAS QUE EVITAM DOR DE CABEÇA
   - Todo texto fica entre aspas duplas: "assim".
   - Cada bloco termina com vírgula depois da chave: },
   - Se o texto tiver aspas duplas por dentro, troque por aspas simples.
   - Campo que você não tem ainda: deixe as aspas vazias "".
   - A foto deve estar em assets/fotos/ e o caminho escrito exatamente
     igual ao nome do arquivo, inclusive maiúsculas e acentos.

   MODELO PARA COPIAR
   -------------------------------------------------------------------------
   {
     nome: "Nome Completo",
     clube: "Rotaract Club de ...",
     periodo: "2008-2012",
     decada: "2000",
     cargo: "Presidente 2010/2011",
     foto: "assets/fotos/nome-do-arquivo.jpg",
     formato: "Entrevista",
     trecho: "Uma frase curta e forte tirada do depoimento.",
     respostas: [
       { p: "Quando você entrou no Rotaract?",                  r: "" },
       { p: "O que motivou sua entrada?",                        r: "" },
       { p: "Qual foi o projeto ou momento mais marcante?",      r: "" },
       { p: "Qual pessoa do Rotaract marcou sua trajetória?",    r: "" },
       { p: "O que o Rotaract mudou na sua vida?",               r: "" },
       { p: "Qual foi a maior aprendizagem que você levou?",     r: "" },
       { p: "Que mensagem você deixaria para um novo associado?", r: "" },
       { p: "O que significa fazer parte dessa história?",       r: "" }
     ]
   },
   -------------------------------------------------------------------------

   CAMPOS EXPLICADOS
   nome      como a pessoa quer ser chamada no acervo
   clube     clube de origem
   periodo   anos de atuação, ex.: "1998-2003"
   decada    só os quatro dígitos da década: "1980", "1990", "2000",
               "2010" ou "2020". É o que alimenta o filtro por década.
   cargo     cargo mais alto ou o que a pessoa quiser destacar. Opcional.
   foto      caminho do arquivo. Deixe "" enquanto não tiver.
   formato   como o relato foi registrado: "Entrevista", "Vídeo",
               "Texto", "Áudio", "Fotografia" ou "Documento".
   trecho    a frase de capa da ficha, curta, entre 60 e 140 caracteres.
   respostas as perguntas do roteiro. Apague as que não foram respondidas.
   ========================================================================= */

const HISTORIAS = [

  /* O acervo começa vazio, esperando o primeiro depoimento.
     Cole aqui a primeira história quando ela chegar. */

];

/* Não altere daqui para baixo. */
if (typeof window !== "undefined") window.HISTORIAS = HISTORIAS;
