/* =========================================================================
   participar.js: monta o depoimento e entrega para e-mail ou WhatsApp
   Não existe servidor por trás: o texto é montado no navegador e enviado
   pelo aplicativo que a pessoa já usa.
   ========================================================================= */
(function () {
  "use strict";

  var form = document.getElementById("form-historia");
  if (!form) return;

  var cfg   = window.CONFIG || {};
  var aviso = document.getElementById("aviso-form");
  var CHAVE = "rascunho-historia-4500";

  var $  = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }
  function fala(msg, cor) {
    if (!aviso) return;
    aviso.textContent = msg;
    aviso.style.color = cor || "var(--slate-texto)";
  }

  /* ---- Rascunho: nada se perde se a página fechar ----------------------- */
  var campos = $$("#form-historia input, #form-historia textarea, #form-historia select");

  function salvar() {
    try {
      var estado = {};
      campos.forEach(function (c) {
        estado[c.id] = c.type === "checkbox" ? c.checked : c.value;
      });
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch (e) { /* navegador sem armazenamento, segue sem rascunho */ }
  }

  function restaurar() {
    try {
      var bruto = localStorage.getItem(CHAVE);
      if (!bruto) return;
      var estado = JSON.parse(bruto);
      campos.forEach(function (c) {
        if (!(c.id in estado)) return;
        if (c.type === "checkbox") c.checked = !!estado[c.id];
        else c.value = estado[c.id];
      });
      fala("Rascunho recuperado deste navegador.");
    } catch (e) { /* rascunho inválido, ignora */ }
  }

  campos.forEach(function (c) {
    c.addEventListener("input", salvar);
    c.addEventListener("change", salvar);
  });
  restaurar();

  /* ---- Montagem do depoimento -------------------------------------------- */
  function montar() {
    var linhas = [];
    var risco = "-----------------------------------------";

    linhas.push("SUA HISTORIA FAZ PARTE DA NOSSA");
    linhas.push((cfg.distrito || "Distrito 4500") + " de " + (cfg.organizacao || "Rotaract"));
    linhas.push(risco);
    linhas.push("");

    linhas.push("QUEM E");
    linhas.push("Nome: " + (val("nome") || "-"));
    if (val("clube"))   linhas.push("Clube: " + val("clube"));
    if (val("periodo")) linhas.push("Periodo no Rotaract: " + val("periodo"));
    if (val("cargo"))   linhas.push("Cargos e funcoes: " + val("cargo"));
    linhas.push("");

    linhas.push("CONTATO");
    if (val("email"))    linhas.push("E-mail: " + val("email"));
    if (val("telefone")) linhas.push("Telefone: " + val("telefone"));
    if (val("formato"))  linhas.push("Formato preferido: " + val("formato"));
    linhas.push("");

    var respondidas = 0;
    var relato = [];
    $$("#form-historia textarea[data-pergunta]").forEach(function (t, i) {
      var r = String(t.value || "").trim();
      if (!r) return;
      respondidas++;
      relato.push(String(i + 1).padStart(2, "0") + ". " + t.getAttribute("data-pergunta"));
      relato.push(r);
      relato.push("");
    });

    if (relato.length) {
      linhas.push("RELATO");
      linhas.push(risco);
      linhas = linhas.concat(relato);
    }

    if (val("material")) {
      linhas.push("MATERIAL GUARDADO");
      linhas.push(val("material"));
      linhas.push("");
    }

    linhas.push("AUTORIZACOES");
    linhas.push("Uso de nome, imagem, voz e relato: " + ($("#autorizo").checked ? "SIM" : "NAO"));
    linhas.push("Aceita ser contatado pela equipe: " + ($("#contato-ok").checked ? "SIM" : "NAO"));
    linhas.push("");
    linhas.push(risco);
    linhas.push("Enviado pelo site do projeto.");

    return { texto: linhas.join("\n"), respondidas: respondidas };
  }

  /* ---- Validação mínima ---------------------------------------------------- */
  function validar() {
    if (!val("nome")) {
      fala("Preencha o seu nome antes de enviar.", "var(--cardinal)");
      var n = $("#nome");
      n.focus();
      n.scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    }
    if (!$("#autorizo").checked) {
      fala("Marque a autorização de uso para que a equipe possa publicar o relato.", "var(--cardinal)");
      $("#autorizo").focus();
      return false;
    }
    return true;
  }

  /* ---- Copiar ------------------------------------------------------------- */
  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (ok, erro) {
      try {
        var area = document.createElement("textarea");
        area.value = texto;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
        ok();
      } catch (e) { erro(e); }
    });
  }

  /* ---- Botões --------------------------------------------------------------- */
  var LIMITE_MAILTO = 1700;

  /* Sem e-mail configurado, o botão sairia sem destinatário. Some com ele e
     promove o WhatsApp a ação principal, para o envio não ficar órfão. */
  if (!cfg.email) {
    var botaoEmail = $("#enviar-email");
    var botaoZap   = $("#enviar-whats");
    if (botaoEmail) botaoEmail.hidden = true;
    if (botaoZap) botaoZap.classList.remove("btn--ouro");
  }

  $("#enviar-email").addEventListener("click", function () {
    if (!validar()) return;
    var m = montar();
    var assunto = "Sua Historia Faz Parte da Nossa - " + val("nome");
    var destino = cfg.email || "";

    if (m.texto.length > LIMITE_MAILTO) {
      copiar(m.texto).then(function () {
        fala("O depoimento é longo, então foi copiado para a área de transferência. Cole no corpo do e-mail que vai abrir.");
        window.location.href = "mailto:" + destino +
          "?subject=" + encodeURIComponent(assunto) +
          "&body=" + encodeURIComponent("Cole aqui o depoimento copiado (Ctrl+V ou toque e segure).\n\n");
      }).catch(function () {
        fala("Não foi possível copiar automaticamente. Use o botão Copiar respostas e cole no seu e-mail para " + destino + ".", "var(--cardinal)");
      });
      return;
    }

    fala("Abrindo seu programa de e-mail com o depoimento pronto.");
    window.location.href = "mailto:" + destino +
      "?subject=" + encodeURIComponent(assunto) +
      "&body=" + encodeURIComponent(m.texto);
  });

  $("#enviar-whats").addEventListener("click", function () {
    if (!validar()) return;
    var numero = (cfg.whatsapp || "").replace(/\D/g, "");
    if (!numero || /^0+$/.test(numero)) {
      fala("O número de WhatsApp ainda não foi configurado. Use o envio por e-mail ou o botão Copiar respostas.", "var(--cardinal)");
      return;
    }
    var m = montar();
    fala("Abrindo o WhatsApp com o depoimento pronto.");
    window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(m.texto), "_blank", "noopener");
  });

  $("#copiar").addEventListener("click", function () {
    var m = montar();
    copiar(m.texto).then(function () {
      fala("Depoimento copiado. Agora é só colar onde quiser enviar.", "var(--grass)");
    }).catch(function () {
      fala("Não foi possível copiar neste navegador. Selecione o texto do formulário manualmente.", "var(--cardinal)");
    });
  });
})();
