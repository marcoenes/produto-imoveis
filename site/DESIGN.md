# Imóvel Sem Armadilhas — plano de design

## Assunto, público e função
- **Assunto:** série de livros/curso que ensina a negociar imóveis (compra, venda, locação) com o Método CASA.
- **Público:** quem negocia imóvel poucas vezes na vida e não domina contratos, documentos ou impostos.
- **Função da página:** levar à compra na Hotmart (R$397 ou 12× R$39,70), com confiança suficiente para quem desconfia de promessas.

## Referências
- **Marca (manda):** kit de logo "Imóvel Sem Armadilhas" — versão 01 azul-marinho e dourado; versão 03 marfim e azul-marinho.
  Slogan "Construa riqueza. Proteja seu futuro." sem alterações.
- **Superlógica (inspiração):** página clara, respiro generoso, botões em pílula, fotos de pessoas reais,
  seções que alternam fundo claro e escuro. Aproveitamos o tom de "tecnologia confiável", não a identidade.

## Cor (medida nos arquivos da marca)
| Token | Hex | Papel |
|---|---|---|
| `--marfim` | `#FEFAF2` | fundo principal (fundo da versão 03) |
| `--marinho` | `#002C62` | texto, títulos, símbolo em fundo claro |
| `--noite` | `#02162E` | seções escuras (fundo da versão 01) |
| `--dourado` | `#C9A05A` | botões, detalhes e texto sobre fundo escuro |
| `--dourado-claro` | `#E6C88F` | texto dourado pequeno sobre `--noite` |
| `--linha` | `#E6DECB` | divisórias e contornos |

Dourado nunca vira texto sobre marfim (contraste insuficiente); ali ele só aparece como marca-texto ou fio.

## Tipo
- **Lexend** para títulos, botões e números — geométrica e aberta como o nome da marca, legível para leigos.
- **Source Serif 4** para textos corridos — ecoa o itálico serifado do slogan. Corpo 19px, entrelinha 1,65.
- Sem caixa-alta em rótulos, sem palavra isolada destacada dentro de títulos.

## Layout
Alinhado à esquerda, coluna de leitura de até ~66 caracteres, largura máxima 1180px.

```
[Símbolo ········ Método · Conteúdo · Preço · Dúvidas   (Botão)]
[Título + lista + botão            ][ Estante com os 8 volumes  ]
[Vídeo 16:9 em fundo noite + legenda]
[Dor: texto | foto do contrato marcado]
[C A S A: letra gigante à esquerda de cada passo]
[A conta: extrato + desconto, − despesas, = resultado]
[12 pontos de atenção em duas colunas]
[Quatro lados da mesa: abas com foto]
[Oito frentes = os oito volumes da estante]
[Três atalhos comuns × o que o método faz]
[Autor][Oferta][Garantia][3 passos][FAQ][Chamada final][Rodapé com logo vertical]
+ barra fixa no celular
```

## Princípios
1. **A estante é a assinatura.** Os oito volumes aparecem na abertura como lombadas azul-marinho com título dourado;
   um volume de frente mostra o logo oficial. Na seção "oito frentes", a numeração retoma as lombadas.
2. **Marca intocada.** O logo é usado a partir dos PNGs oficiais, só com o fundo removido — sem redesenho, sombra ou brilho.
3. **Mostrar a conta, não prometer.** Números em formato de extrato, algarismos tabulares.
4. **Movimento mínimo.** Nenhuma entrada animada por seção; o vídeo roda sem som e para com `prefers-reduced-motion`.
