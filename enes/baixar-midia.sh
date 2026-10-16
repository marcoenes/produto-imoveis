#!/usr/bin/env bash
# Baixa o vídeo e os quadros da abertura gerados no Higgsfield para dentro do site
# e troca os links externos pelos arquivos locais. Rode a partir da pasta enes/.
set -euo pipefail
B="https://d8j0ntlcm91z4.cloudfront.net/user_3K2leFyP9UFWbuiqKIKWrHzt4GF"
mkdir -p assets/midia
declare -A M=(
  [abertura-inicio.png]="hf_20261016_222539_822a85d6-d4b3-4be2-93e0-3038bec4176e.png"
  [abertura-fim.png]="hf_20261016_222539_921b5b95-94c3-4fe6-9100-ff9bc2338346.png"
  [abertura.mp4]="hf_20261016_222610_04c219c7-4451-4959-aafe-6844e6c1c9ff.mp4"
)
for local in "${!M[@]}"; do
  remoto="${M[$local]}"
  curl -fsSL "$B/$remoto" -o "assets/midia/$local"
  sed -i.bak "s#$B/$remoto#assets/midia/$local#g" index.html main.js
done
rm -f index.html.bak main.js.bak

# Para a rolagem não travar, o vídeo precisa de um quadro-chave a cada poucos quadros.
if command -v ffmpeg >/dev/null; then
  ffmpeg -loglevel error -y -i assets/midia/abertura.mp4 -an \
    -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 22 -g 4 -pix_fmt yuv420p -movflags +faststart \
    assets/midia/abertura-rolagem.mp4
  mv assets/midia/abertura-rolagem.mp4 assets/midia/abertura.mp4
  echo "Vídeo recodificado para rolagem."
else
  echo "Aviso: instale o ffmpeg e rode de novo para a rolagem ficar mais fluida."
fi
echo "Pronto: arquivos em assets/midia/ e links atualizados."
