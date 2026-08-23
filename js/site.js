/* =========================================================================
   site.js  ·  comportamento comum a todas as páginas
   Sem dependências, sem build. Roda direto no navegador.
   ========================================================================= */
(function () {
  "use strict";

  var cfg = window.CONFIG || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- 1. Menu no celular ---------------------------------------------- */
  var botao = $(".menu-btn");
  var nav   = $(".nav");
  if (botao && nav) {
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      botao.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
      nav.setAttribute("data-aberto", String(!aberto));
    });
    $$(".nav a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        botao.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-aberto", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-aberto") === "true") {
        botao.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-aberto", "false");
        botao.focus();
      }
    });
  }

  /* ---- 2. Marca a página atual na navegação ----------------------------- */
  var arquivo = location.pathname.split("/").pop() || "index.html";
  $$(".nav__link").forEach(function (a) {
    var alvo = a.getAttribute("href");
    if (alvo === arquivo) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  /* ---- 3. Dados do config.js na página ---------------------------------- */
  $$("[data-config]").forEach(function (el) {
    var chave = el.getAttribute("data-config");
    if (chave === "rodapeCredito") {
      el.textContent = [cfg.distrito, cfg.nomeDistrito, "de", cfg.organizacao, "·", cfg.anoRotario]
        .filter(Boolean).join(" ");
      return;
    }
    if (chave === "distritoCompleto") { el.textContent = [cfg.distrito, cfg.nomeDistrito].filter(Boolean).join(" "); return; }
    if (chave === "whatsappRotulo") { el.textContent = cfg.whatsappRotulo || ""; return; }
    if (cfg[chave]) el.textContent = cfg[chave];
  });

  /* Lista de contato do rodapé, montada só com o que estiver preenchido */
  var contato = $("#rodape-contato");
  if (contato) {
    var linhas = [];
    if (cfg.email)     linhas.push('<li><a href="mailto:' + cfg.email + '">' + cfg.email + "</a></li>");
    if (cfg.whatsapp)  linhas.push('<li><a href="https://wa.me/' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp ' + (cfg.whatsappRotulo || "") + "</a></li>");
    if (cfg.instagram) linhas.push('<li><a href="' + cfg.instagram + '" target="_blank" rel="noopener">Instagram ' + (cfg.instagramRotulo || "") + "</a></li>");
    if (cfg.facebook)  linhas.push('<li><a href="' + cfg.facebook + '" target="_blank" rel="noopener">Facebook</a></li>');
    if (cfg.youtube)   linhas.push('<li><a href="' + cfg.youtube + '" target="_blank" rel="noopener">YouTube</a></li>');
    if (cfg.responsavel && cfg.responsavel.nome) {
      linhas.push("<li><span>" + cfg.responsavel.nome + "</span></li>");
    }
    contato.innerHTML = linhas.join("");
  }

  /* ---- 4. Revelação no scroll -------------------------------------------
     A classe entra por JS. Sem JS, tudo aparece normalmente.             */
  var alvos = $$([
    ".pilar", ".formato", ".etapa", ".objetivo", ".ficha",
    ".destaque-geral", ".chamada", ".passo", ".doc-secao", ".vazio"
  ].join(","));

  if ("IntersectionObserver" in window && alvos.length) {
    alvos.forEach(function (el) { el.classList.add("revela"); });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var atraso = Math.min(i * 55, 260);
        setTimeout(function () { e.target.classList.add("visivel"); }, atraso);
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    alvos.forEach(function (el) { obs.observe(el); });
  }

  /* ---- 5. Acordeão -------------------------------------------------------
     A altura é animada em pixels e solta para "auto" no fim, para o painel
     acompanhar mudanças de largura sem travar num valor fixo.            */
  $$(".acordeao__item").forEach(function (item, i) {
    var btn    = $(".acordeao__botao", item);
    var painel = $(".acordeao__painel", item);
    if (!btn || !painel) return;

    if (!painel.id) painel.id = "painel-" + (i + 1) + "-" + Math.round(painel.offsetTop);
    btn.setAttribute("aria-controls", painel.id);
    btn.setAttribute("aria-expanded", "false");
    item.setAttribute("data-aberto", "false");
    painel.style.height = "0px";

    btn.addEventListener("click", function () {
      var aberto = item.getAttribute("data-aberto") === "true";

      if (aberto) {
        painel.style.height = painel.scrollHeight + "px";
        requestAnimationFrame(function () { painel.style.height = "0px"; });
      } else {
        painel.style.height = painel.scrollHeight + "px";
      }
      item.setAttribute("data-aberto", String(!aberto));
      btn.setAttribute("aria-expanded", String(!aberto));
    });

    painel.addEventListener("transitionend", function (e) {
      if (e.propertyName !== "height") return;
      if (item.getAttribute("data-aberto") === "true") painel.style.height = "auto";
    });
  });

  /* ---- 6. Índice lateral que acompanha a leitura ------------------------- */
  var indice = $(".indice-lateral");
  if (indice && "IntersectionObserver" in window) {
    var links = $$("a[href^='#']", indice);
    var secoes = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);

    if (secoes.length) {
      var espia = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("ativo", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
      secoes.forEach(function (s) { espia.observe(s); });
    }
  }

  /* ---- 7. Ano corrente onde for pedido ----------------------------------- */
  $$("[data-ano]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
