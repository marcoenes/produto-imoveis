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

## Publicar na VPS (Hostinger)

Os arquivos em `deploy/` instalam o site numa VPS Ubuntu/Debian com nginx. O código vem do `main`
deste repositório no GitHub; o vídeo e as imagens são baixados para o servidor e o vídeo é recodificado
para a rolagem.

**Primeira vez** (acesse a VPS por SSH como root e rode):

```bash
curl -fsSL https://raw.githubusercontent.com/marcoenes/produto-imoveis/main/enes/deploy/instalar-vps.sh -o instalar-vps.sh
bash instalar-vps.sh                              # site no IP da VPS
bash instalar-vps.sh enes.com.br voce@email.com   # ou: no domínio, com HTTPS
```

Para usar um domínio, o registro A dele precisa apontar antes para o IP da VPS.

Se a porta 80 já tiver dono (por exemplo, um contêiner Docker ou um painel), publique em outra porta,
sem domínio: `PORTA=8080 bash instalar-vps.sh`. O site fica em `http://IP:8080`. Se não abrir, libere
a porta no firewall da VPS (no painel da Hostinger).

**Atualizar** depois de um merge no `main`: `atualizar-enes` na VPS.

| Arquivo | O que faz |
|---|---|
| `deploy/instalar-vps.sh` | Instala nginx, git, rsync e ffmpeg; clona o repositório em `/opt/produto-imoveis`; publica em `/var/www/enes`; configura o nginx e, com domínio, o HTTPS. |
| `deploy/atualizar.sh` | Instalado como `atualizar-enes`: baixa o `main` e publica de novo, mantendo a mídia já baixada. |
| `deploy/nginx.conf` | Configuração do site no nginx (cache e cabeçalhos). |

## Antes de publicar

1. **Textos:** títulos, rótulos e perguntas vêm do print de enes.com.br. Os parágrafos estavam ilegíveis
   no print e foram reescritos no mesmo sentido; confira com o texto original.
2. **Links:** os botões "Ver conteúdo" dos e-books e "Conhecer o Guia Essencial" apontam para `#`.
3. **Vídeo e imagens:** hoje são carregados direto do servidor do Higgsfield. Rode `./baixar-midia.sh`
   dentro de `enes/` para baixá-los. Com o `ffmpeg` instalado, o script também recodifica o vídeo com
   quadros-chave frequentes, o que deixa a rolagem bem mais fluida (vídeos comuns travam ao voltar a rolagem).
