/* =========================================================================
   acervo.js  ·  monta as fichas a partir de dados/historias.js
   Usado na prévia da página inicial e na página do acervo.
   ========================================================================= */
(function () {
  "use strict";

  var cfg  = window.CONFIG || {};
  var base = Array.isArray(window.HISTORIAS) ? window.HISTORIAS : [];

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Cada década recebe uma cor de apoio da paleta oficial */
  var CORES = {
    "1960": "var(--charcoal)",
    "1970": "var(--violet)",
    "1980": "var(--cranberry)",
    "1990": "var(--cardinal)",
    "2000": "var(--turquoise)",
    "2010": "var(--sky)",
    "2020": "var(--grass)"
  };
  function corDe(h) { return CORES[h.decada] || "var(--cranberry)"; }

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function num(i) { return String(i + 1).padStart(3, "0"); }

  /* ---- Uma ficha -------------------------------------------------------- */
  /* Enquanto não há foto, a ficha mostra as iniciais, como numa lombada
     de arquivo. Melhor do que um retângulo vazio. */
  function iniciais(nome) {
    var partes = String(nome || "").trim().split(/\s+/);
    var nomes  = partes.filter(function (p) { return p.length > 2; }); // descarta de, da, dos
    if (!nomes.length) nomes = partes;
    var primeira = (nomes[0] || "").charAt(0);
    var ultima   = nomes.length > 1 ? nomes[nomes.length - 1].charAt(0) : "";
    return (primeira + ultima).toUpperCase();
  }

  function ficha(h, i) {
    var retrato = h.foto
      ? '<div class="ficha__retrato"><img src="' + esc(h.foto) + '" alt="Retrato de ' + esc(h.nome) + '" loading="lazy"></div>'
      : '<div class="ficha__retrato ficha__retrato--vazio" aria-hidden="true">' +
          '<span class="ficha__iniciais" style="color:' + corDe(h) + '">' + esc(iniciais(h.nome)) + '</span>' +
        '</div>';

    return '' +
      '<button type="button" class="ficha" data-ficha="' + i + '">' +
        '<span class="ficha__cor" style="background:' + corDe(h) + '"></span>' +
        '<span class="ficha__aba">' +
          '<span>Ficha ' + num(i) + '</span>' +
          '<span>' + esc(h.periodo || "") + '</span>' +
        '</span>' +
        retrato +
        '<span class="ficha__corpo">' +
          '<span class="ficha__nome">' + esc(h.nome) + '</span>' +
          '<span class="ficha__clube">' + esc(h.clube || "") + (h.cargo ? " · " + esc(h.cargo) : "") + '</span>' +
          (h.trecho ? '<span class="ficha__trecho">&ldquo;' + esc(h.trecho) + '&rdquo;</span>' : "") +
          '<span class="ficha__rodape">' +
            '<span style="width:6px;height:6px;background:' + corDe(h) + ';transform:rotate(45deg);display:inline-block"></span>' +
            esc(h.formato || "Registro") +
          '</span>' +
        '</span>' +
      '</button>';
  }

  /* ---- Estado vazio ------------------------------------------------------ */
  function vazio(contexto) {
    var titulo = contexto === "home"
      ? "O acervo começa com você"
      : "Esta gaveta ainda está vazia";
    var texto = contexto === "home"
      ? "Nenhuma história foi arquivada até agora. A primeira ficha deste acervo pode ser a sua."
      : "As entrevistas estão em andamento. Assim que os primeiros relatos forem registrados e autorizados, eles aparecem aqui, um por ficha.";

    return '' +
      '<div class="vazio">' +
        '<img class="vazio__roda" src="assets/marca/rotary.png" alt="" width="480" height="480">' +
        '<p class="vazio__cod">Acervo ' + esc([cfg.distrito, cfg.nomeDistrito].filter(Boolean).join(' ')) + ' · 000 registros</p>' +
        '<h3 class="vazio__titulo">' + titulo + '</h3>' +
        '<p class="vazio__txt">' + texto + '</p>' +
        '<div class="vazio__acoes">' +
          '<a class="btn" href="participar.html#formulario">Contar minha história</a>' +
          '<a class="btn btn--linha" href="participar.html#roteiro">Ver as perguntas</a>' +
        '</div>' +
      '</div>';
  }

  /* ---- Prévia da página inicial ------------------------------------------ */
  var previa = $("#previa-acervo");
  if (previa) {
    if (!base.length) {
      previa.innerHTML = vazio("home");
    } else {
      var quantas = cfg.fichasNaHome || 3;
      previa.innerHTML = '<div class="acervo-grade">' +
        base.slice(0, quantas).map(ficha).join("") + "</div>";
    }
  }

  /* ---- Página do acervo --------------------------------------------------- */
  var lista = $("#acervo-lista");
  if (!lista) { ligarJanela(); return; }

  var fDecada  = $("#f-decada");
  var fClube   = $("#f-clube");
  var fFormato = $("#f-formato");
  var fBusca   = $("#f-busca");
  var contagem = $("#f-contagem");

  /* Preenche os seletores só com o que existe no acervo */
  function abastecer(select, valores, rotulo) {
    if (!select) return;
    var unicos = valores.filter(function (v, i, a) { return v && a.indexOf(v) === i; }).sort();
    select.innerHTML = '<option value="">' + rotulo + "</option>" +
      unicos.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; }).join("");
  }
  abastecer(fDecada,  base.map(function (h) { return h.decada; }),  "Todas as décadas");
  abastecer(fClube,   base.map(function (h) { return h.clube; }),   "Todos os clubes");
  abastecer(fFormato, base.map(function (h) { return h.formato; }), "Todos os formatos");

  function filtrar() {
    var d = fDecada  ? fDecada.value  : "";
    var c = fClube   ? fClube.value   : "";
    var f = fFormato ? fFormato.value : "";
    var b = fBusca   ? fBusca.value.trim().toLowerCase() : "";

    var resultado = base.filter(function (h) {
      if (d && h.decada !== d)   return false;
      if (c && h.clube !== c)    return false;
      if (f && h.formato !== f)  return false;
      if (b) {
        var texto = [h.nome, h.clube, h.cargo, h.trecho, h.periodo]
          .concat((h.respostas || []).map(function (r) { return r.r; }))
          .join(" ").toLowerCase();
        if (texto.indexOf(b) === -1) return false;
      }
      return true;
    });

    if (contagem) {
      contagem.textContent = base.length === 0
        ? "Nenhum registro arquivado"
        : resultado.length + (resultado.length === 1 ? " história" : " histórias") +
          (resultado.length !== base.length ? " de " + base.length : "");
    }

    if (!base.length) { lista.innerHTML = vazio("acervo"); return; }

    if (!resultado.length) {
      lista.innerHTML = '<div class="vazio">' +
        '<p class="vazio__cod">Busca sem resultado</p>' +
        '<h3 class="vazio__titulo">Nada encontrado com esses filtros</h3>' +
        '<p class="vazio__txt">Tente limpar os filtros ou procurar por outro nome, clube ou palavra do depoimento.</p>' +
        '<div class="vazio__acoes"><button type="button" class="btn btn--linha" id="limpar">Limpar filtros</button></div>' +
        "</div>";
      var limpar = $("#limpar");
      if (limpar) limpar.addEventListener("click", function () {
        [fDecada, fClube, fFormato, fBusca].forEach(function (el) { if (el) el.value = ""; });
        filtrar();
      });
      return;
    }

    lista.innerHTML = '<div class="acervo-grade">' +
      resultado.map(function (h) { return ficha(h, base.indexOf(h)); }).join("") + "</div>";
  }

  [fDecada, fClube, fFormato].forEach(function (el) {
    if (el) el.addEventListener("change", filtrar);
  });
  if (fBusca) fBusca.addEventListener("input", filtrar);
  filtrar();
  ligarJanela();

  /* ---- Janela de leitura --------------------------------------------------- */
  function ligarJanela() {
    var janela = $("#janela");
    if (!janela) return;
    var corpo  = $("#janela-corpo");
    var codigo = $("#janela-codigo");
    var ultimo = null;

    document.addEventListener("click", function (e) {
      var alvo = e.target.closest("[data-ficha]");
      if (!alvo) return;
      var h = base[Number(alvo.getAttribute("data-ficha"))];
      if (!h) return;
      ultimo = alvo;
      abrir(h, Number(alvo.getAttribute("data-ficha")));
    });

    function abrir(h, i) {
      if (codigo) codigo.textContent = "Ficha " + num(i) + " · " + (cfg.distrito || "");
      corpo.innerHTML = '' +
        (h.foto ? '<div class="janela__foto"><img src="' + esc(h.foto) + '" alt="Retrato de ' + esc(h.nome) + '"></div>' : "") +
        '<h2 class="janela__nome">' + esc(h.nome) + "</h2>" +
        '<p class="janela__clube">' +
          [h.clube, h.cargo, h.periodo].filter(Boolean).map(esc).join(" · ") +
        "</p>" +
        (h.trecho ? '<blockquote class="citacao" style="max-width:none;font-size:1.5rem">' + esc(h.trecho) + "</blockquote>" : "") +
        (h.respostas || []).filter(function (r) { return r && r.r; }).map(function (r) {
          return '<div class="janela__qa">' +
            '<p class="janela__pergunta">' + esc(r.p) + "</p>" +
            '<p class="janela__resposta">' + esc(r.r) + "</p>" +
          "</div>";
        }).join("");
      janela.setAttribute("data-aberta", "true");
      document.body.style.overflow = "hidden";
      var fechar = $(".janela__fechar", janela);
      if (fechar) fechar.focus();
    }

    function fecharJanela() {
      janela.setAttribute("data-aberta", "false");
      document.body.style.overflow = "";
      if (ultimo) ultimo.focus();
    }

    $$("[data-fechar]", janela).forEach(function (b) { b.addEventListener("click", fecharJanela); });
    janela.addEventListener("click", function (e) { if (e.target === janela) fecharJanela(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && janela.getAttribute("data-aberta") === "true") fecharJanela();
    });
  }
})();
