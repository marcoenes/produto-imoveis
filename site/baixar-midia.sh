#!/usr/bin/env bash
# Baixa as imagens e o vídeo gerados no Higgsfield para dentro do site
# e troca os links externos pelos arquivos locais. Rode a partir da pasta site/.
set -euo pipefail
B="https://d8j0ntlcm91z4.cloudfront.net/user_3K2leFyP9UFWbuiqKIKWrHzt4GF"
mkdir -p assets/midia
declare -A M=(
  [contrato.webp]="hf_20260930_125936_6c97b27e-50ac-473d-9a83-452dabf2258f_min.webp"
  [comprar.webp]="hf_20260930_125935_f996068c-ce34-474c-86bd-547d3f7bf395_min.webp"
  [vender.webp]="hf_20260930_125935_76e01495-8dec-44ba-ad51-4c2fc5b59f4b_min.webp"
  [locador.webp]="hf_20260930_125935_505ed3f1-31f0-4fe5-8392-2a6aee172e67_min.webp"
  [inquilino.webp]="hf_20260930_125934_28f0d981-7ca3-44e4-b23e-9dc4bac2be01_min.webp"
  [video-capa.webp]="hf_20260930_125935_604674a4-395c-4c15-9789-bf79ad3457e2_min.webp"
  [video-previa.mp4]="hf_20260930_130851_260adce4-64a8-4c34-b014-2dbe400634c0.mp4"
)
for local in "${!M[@]}"; do
  remoto="${M[$local]}"
  curl -fsSL "$B/$remoto" -o "assets/midia/$local"
  sed -i.bak "s#$B/$remoto#assets/midia/$local#g" index.html main.js
done
rm -f index.html.bak main.js.bak
echo "Pronto: arquivos em assets/midia/ e links atualizados."
