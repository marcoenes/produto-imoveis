#!/usr/bin/env bash
# Publica no servidor a versão mais recente do site que está no main do GitHub.
# Instalado pelo instalar-vps.sh como /usr/local/bin/atualizar-enes. Rode como root.
set -euo pipefail
FONTE=/opt/produto-imoveis
DESTINO=/var/www/enes

git -C "$FONTE" fetch -q origin main
git -C "$FONTE" reset -q --hard origin/main

# Copia só o que vai ao ar. assets/midia/ (vídeo e imagens baixados) é preservada entre atualizações.
mkdir -p "$DESTINO"
rsync -a --delete \
  --filter='P assets/midia/' \
  --exclude='deploy/' --exclude='README.md' --exclude='baixar-midia.sh' \
  "$FONTE/enes/" "$DESTINO/"

cd "$DESTINO"
bash "$FONTE/enes/baixar-midia.sh"
chown -R www-data:www-data "$DESTINO"
echo "Site atualizado com o commit $(git -C "$FONTE" log -1 --format='%h %s')."
