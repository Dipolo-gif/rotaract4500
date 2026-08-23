/* =========================================================================
   servidor.js  ·  servidor local para ver o site antes de publicar
   -------------------------------------------------------------------------
   Não faz parte do site. Serve só para abrir o projeto no seu computador
   com um endereço http, do jeito que ele vai funcionar quando estiver no ar.

   Como usar (precisa ter o Node instalado):
     1. Abra o terminal na pasta do projeto
     2. Digite:  node servidor.js
     3. Abra no navegador:  http://localhost:4500

   Para parar, aperte Ctrl+C no terminal.
   ========================================================================= */

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORTA = process.env.PORT || 4500;
const RAIZ  = __dirname;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif":  "image/gif",
  ".ico":  "image/x-icon",
  ".pdf":  "application/pdf",
  ".mp4":  "video/mp4",
  ".mp3":  "audio/mpeg",
  ".woff2":"font/woff2",
  ".json": "application/json; charset=utf-8",
  ".txt":  "text/plain; charset=utf-8",
  ".md":   "text/plain; charset=utf-8"
};

http.createServer((req, res) => {
  let caminho = decodeURIComponent(req.url.split("?")[0]);
  if (caminho === "/") caminho = "/index.html";

  const alvo = path.join(RAIZ, path.normalize(caminho));
  // impede sair da pasta do projeto
  if (!alvo.startsWith(RAIZ)) {
    res.writeHead(403).end("Fora da pasta do projeto");
    return;
  }

  fs.readFile(alvo, (erro, dados) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>404</h1><p>Arquivo nao encontrado: " + caminho + "</p>");
      return;
    }
    res.writeHead(200, {
      "Content-Type": TIPOS[path.extname(alvo).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(dados);
  });
}).listen(PORTA, () => {
  console.log("Site no ar em http://localhost:" + PORTA);
  console.log("Para parar, aperte Ctrl+C");
});
