# Site — Enes (enes.com.br)

Site novo para enes.com.br, estático (HTML, CSS e JavaScript, sem etapa de build).
Abra `index.html` no navegador ou publique a pasta `enes/` em qualquer hospedagem estática.

## Abertura com rolagem

A primeira seção ocupa 4 alturas de tela. Enquanto ela passa, o palco fica preso e a rolagem escolhe o
quadro do vídeo: a mão solta a chave, a chave vira um maço de notas de R$100 e cai na outra mão.
Três frases aparecem em sequência, cada uma no espaço livre da imagem naquele momento.

- **Duração da rolagem:** `--abertura-rolagem` em `styles.css` (400 = 4 telas).
- **Momento de cada frase:** atributo `data-batida="início fim"` em `index.html`, de 0 a 1.
- **Movimento reduzido ou sem JavaScript:** a abertura vira uma tela só, com a imagem final e todo o texto.

## Seções depois da abertura

Na ordem do site atual: três compromissos, pilares, coleção dos oito e-books (com filtro por tema e
o Guia Essencial), "o anúncio mostra o imóvel", curso com a trilha de 10 módulos, autor, dúvidas,
chamada final e rodapé. As capas dos e-books são desenhadas em CSS (classe `.capa`), sem imagens.

## Antes de publicar

1. **Textos:** títulos, rótulos e perguntas vêm do print de enes.com.br. Os parágrafos estavam ilegíveis
   no print e foram reescritos no mesmo sentido; confira com o texto original.
2. **Links:** os botões "Ver conteúdo" dos e-books e "Conhecer o Guia Essencial" apontam para `#`.
3. **Vídeo e imagens:** hoje são carregados direto do servidor do Higgsfield. Rode `./baixar-midia.sh`
   dentro de `enes/` para baixá-los. Com o `ffmpeg` instalado, o script também recodifica o vídeo com
   quadros-chave frequentes, o que deixa a rolagem bem mais fluida (vídeos comuns travam ao voltar a rolagem).
