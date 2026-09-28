// Comportamento comum às três páginas: menu no celular e dados do config.js.
(function () {
  "use strict";

  var cfg = window.CONFIG || {};

  // menu no celular
  var botao = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");

  function fecharMenu() {
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    nav.setAttribute("data-aberto", "false");
  }

  if (botao && nav) {
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      if (aberto) return fecharMenu();
      botao.setAttribute("aria-expanded", "true");
      botao.setAttribute("aria-label", "Fechar menu");
      nav.setAttribute("data-aberto", "true");
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", fecharMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-aberto") === "true") {
        fecharMenu();
        botao.focus();
      }
    });
  }

  // link da página atual
  var pagina = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach(function (a) {
    if (a.getAttribute("href") === pagina) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // textos vindos do config.js
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var chave = el.getAttribute("data-config");
    if (chave === "rodapeCredito") {
      el.textContent = [cfg.distrito, cfg.nomeDistrito, "de", cfg.organizacao, "|", cfg.anoRotario]
        .filter(Boolean).join(" ");
    } else if (cfg[chave]) {
      el.textContent = cfg[chave];
    }
  });

  // botão de WhatsApp da chamada final
  var ctaWhats = document.getElementById("cta-whats");
  if (ctaWhats && cfg.whatsapp) {
    ctaWhats.href = "https://wa.me/" + cfg.whatsapp;
    ctaWhats.hidden = false;
  }

  // contatos do rodapé, só os que estiverem preenchidos
  var contato = document.getElementById("rodape-contato");
  if (contato) {
    var itens = [];
    if (cfg.whatsapp)  itens.push('<li><a href="https://wa.me/' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp ' + (cfg.whatsappRotulo || "") + "</a></li>");
    if (cfg.instagram) itens.push('<li><a href="' + cfg.instagram + '" target="_blank" rel="noopener">Instagram ' + (cfg.instagramRotulo || "") + "</a></li>");
    if (cfg.email)     itens.push('<li><a href="mailto:' + cfg.email + '">' + cfg.email + "</a></li>");
    if (cfg.facebook)  itens.push('<li><a href="' + cfg.facebook + '" target="_blank" rel="noopener">Facebook</a></li>');
    if (cfg.youtube)   itens.push('<li><a href="' + cfg.youtube + '" target="_blank" rel="noopener">YouTube</a></li>');
    contato.innerHTML = itens.join("");
  }
})();
