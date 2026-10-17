#!/usr/bin/env bash
# Instala o site enes numa VPS Ubuntu/Debian (ex.: Hostinger) com nginx. Rode uma vez, como root:
#
#   bash instalar-vps.sh                       -> site no IP da VPS (http://IP)
#   bash instalar-vps.sh dominio.com.br email  -> site no domínio, com HTTPS (Let's Encrypt)
#
# Para o domínio funcionar, o registro A dele já precisa apontar para o IP da VPS.
set -euo pipefail
DOMINIO="${1:-}"
EMAIL="${2:-}"
REPO=https://github.com/marcoenes/produto-imoveis.git
FONTE=/opt/produto-imoveis

[ "$(id -u)" = 0 ] || { echo "Rode como root (ou com sudo)."; exit 1; }
command -v apt-get >/dev/null || { echo "Este script é para Ubuntu/Debian (apt-get)."; exit 1; }
if [ -n "$DOMINIO" ] && [ -z "$EMAIL" ]; then
  echo "Com domínio, informe também um e-mail para o certificado HTTPS: bash instalar-vps.sh $DOMINIO voce@email.com"
  exit 1
fi

# Não mexe num servidor que já tem outro programa na porta 80 (Apache, painel etc.).
if command -v ss >/dev/null && ss -ltnp 2>/dev/null | grep -E ':80\s' | grep -vq nginx; then
  echo "A porta 80 já está em uso por outro programa:"
  ss -ltnp | grep -E ':80\s'
  echo "Pare esse programa ou me avise para adaptar a instalação."
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q nginx git rsync ffmpeg curl

# Sem domínio, o site responde em qualquer endereço; só é seguro se o nginx não servir outros sites.
if [ -z "$DOMINIO" ]; then
  outros=$(find /etc/nginx/sites-enabled -mindepth 1 ! -name default ! -name enes 2>/dev/null | wc -l)
  if [ "$outros" -gt 0 ]; then
    echo "Este nginx já serve outros sites. Rode de novo informando o domínio: bash instalar-vps.sh dominio.com.br email"
    exit 1
  fi
fi

if [ -d "$FONTE/.git" ]; then
  git -C "$FONTE" fetch -q origin main
else
  git clone -q --depth 1 "$REPO" "$FONTE"
fi
git -C "$FONTE" reset -q --hard origin/main

install -m 755 "$FONTE/enes/deploy/atualizar.sh" /usr/local/bin/atualizar-enes
atualizar-enes

if [ -n "$DOMINIO" ]; then
  sed "s/DOMINIO/$DOMINIO/" "$FONTE/enes/deploy/nginx.conf" > /etc/nginx/sites-available/enes
else
  sed -e "s/DOMINIO/_/" -e "s/listen 80;/listen 80 default_server;/" -e "s/listen \[::\]:80;/listen [::]:80 default_server;/" \
    "$FONTE/enes/deploy/nginx.conf" > /etc/nginx/sites-available/enes
  rm -f /etc/nginx/sites-enabled/default
fi
ln -sf /etc/nginx/sites-available/enes /etc/nginx/sites-enabled/enes
nginx -t
systemctl enable --now nginx
systemctl reload nginx

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow 'Nginx Full'
fi

if [ -n "$DOMINIO" ]; then
  apt-get install -y -q certbot python3-certbot-nginx
  certbot --nginx -d "$DOMINIO" --non-interactive --agree-tos -m "$EMAIL" --redirect
  echo "Pronto: https://$DOMINIO"
else
  echo "Pronto: http://$(curl -fsS -4 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
fi
echo "Para publicar mudanças futuras do GitHub: atualizar-enes"
