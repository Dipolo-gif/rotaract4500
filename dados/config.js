/* =========================================================================
   config.js  ·  PAINEL DE CONTROLE DO SITE
   -------------------------------------------------------------------------
   Este é o único arquivo que você precisa mexer para trocar contatos, links
   e redes sociais. Altere o texto entre as aspas e salve. Não apague as
   vírgulas nem as chaves.
   ========================================================================= */

const CONFIG = {

  /* --- Identificação ---------------------------------------------------- */
  distrito: "Distrito 4500",
  nomeDistrito: "Caloroso",   /* o nome do distrito, aparece junto do número */
  organizacao: "Rotaract",
  projeto: "Sua História Faz Parte da Nossa",
  anoRotario: "2026 / 2027",

  /* --- Contato ----------------------------------------------------------
     Troque pelos dados reais do distrito. O e-mail é usado pelo botão
     "Enviar por e-mail" da página Participe.                              */
  email: "",

  /* WhatsApp com DDI e DDD, apenas números. Ex.: 5599999999999            */
  whatsapp: "5584994137144",
  whatsappRotulo: "(84) 99413-7144",

  /* --- Redes sociais -----------------------------------------------------
     Deixe uma linha com "" (aspas vazias) para esconder a rede do rodapé.  */
  instagram: "",
  instagramRotulo: "",
  facebook: "",
  youtube: "",

  /* --- Responsável pelo projeto ------------------------------------------ */
  responsavel: {
    nome: "Diretoria Distrital de Imagem Pública",
    cargo: "Distrito 4500 de Rotaract",
  },

  /* --- Textos que aparecem em vários lugares ------------------------------ */
  fraseAssinatura: "Se você fez parte dela, a sua história também faz parte da nossa.",

  /* --- Ajustes do acervo --------------------------------------------------
     Quantas fichas aparecem na prévia da página inicial.                   */
  fichasNaHome: 3,
};

/* Não altere daqui para baixo. */
if (typeof window !== "undefined") window.CONFIG = CONFIG;
