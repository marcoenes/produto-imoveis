# Site — Imóvel Sem Armadilhas

Página de vendas estática (HTML, CSS e JavaScript, sem etapa de build). Abra `index.html` no navegador
ou publique a pasta `site/` em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Antes de publicar

1. **Checkout da Hotmart:** em `main.js`, preencha `checkoutUrl`. Enquanto estiver vazio, todos os botões levam à seção de preço.
2. **Vídeo de 5 minutos:** em `main.js`, preencha `videoEmbedUrl` com o link de incorporação (YouTube, Vimeo, Panda etc.).
   O botão "Assistir ao vídeo de 5 minutos" só aparece depois disso.
3. **Foto do Leonardo Enes:** substitua o espaço reservado na seção do autor (há um comentário em `index.html` indicando onde).
4. **Termos, privacidade e condições da compra:** os links do rodapé ainda apontam para `#`.
5. **Imagens e vídeo do Higgsfield:** hoje são carregados direto do servidor do Higgsfield.
   Para hospedar junto com o site, rode `./baixar-midia.sh` dentro de `site/`.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Conteúdo da página, na ordem de `estrutura_do_site.md` |
| `styles.css` | Estilos; cores e fontes definidas no topo como variáveis |
| `main.js` | Configuração (checkout, vídeo), abas, prévia do vídeo e barra fixa no celular |
| `DESIGN.md` | Plano de design: cores, tipos, layout e princípios |
| `assets/img/` | Logo oficial com o fundo removido (versões azul-marinho e dourada) |
| `baixar-midia.sh` | Baixa as mídias do Higgsfield para `assets/midia/` e troca os links |

## Mídias geradas no Higgsfield (projeto "Imóvel Sem Armadilhas — site")

- Contrato com cláusula marcada (seção "O imóvel pode caber no seu bolso")
- Quatro fotos dos lados da negociação: comprar, vender, colocar para alugar, alugar para morar
- Cena das chaves e do contrato (capa do vídeo) e prévia em vídeo de 6 s gerada a partir dela
