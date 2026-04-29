# Brief de Design para Stitch - Memento Mori

## Objetivo

O projeto e uma aplicacao web contemplativa e minimalista que transforma uma data de nascimento em uma composicao visual das semanas de vida ate os 84 anos.

O layout deve parecer uma peca editorial silenciosa, classica e precisa. Nao deve parecer dashboard, ferramenta corporativa, landing page comercial ou experimento futurista.

## Experiencia Principal

1. O usuario informa a data de nascimento no formato `DD/MM/AAAA`.
2. A aplicacao valida a entrada.
3. A interface gera uma composicao visual com `84 anos x 52 semanas`.
4. Cada celula representa uma semana.
5. Semanas vividas aparecem preenchidas.
6. Semanas futuras aparecem vazias ou com contraste reduzido.
7. Marcadores laterais aparecem a cada 7 anos: `0`, `7`, `14`, `21`, `28`, `35`, `42`, `49`, `56`, `63`, `70`, `77`, `84`.
8. O usuario exporta a composicao final como `.jpg`.

## Estrutura Atual da Pagina

### 1. Hero

Conteudo atual:

- Eyebrow: `Memento Mori`
- Titulo: `Uma visualizacao estoica do tempo.`
- Texto introdutorio: `Transforme uma data de nascimento em uma arquitetura visivel da vida: 84 anos, 4.368 semanas e uma leitura mais honesta do presente.`
- Frase curta: `Nao para assustar. Para esclarecer.`

Direcao:

- Deve continuar simples, centralizado e editorial.
- O hero nao deve competir com a grade.
- O titulo pode ser refinado, mas precisa manter sobriedade e impacto contido.

### 2. Formulario

Elementos atuais:

- Card centralizado.
- Titulo: `Data de nascimento`
- Texto curto de apoio.
- Campo unico para data.
- Botao: `Gerar visualizacao`
- Mensagem de erro discreta.

Direcao:

- Manter o formulario como entrada principal, sem adicionar campos paralelos.
- Melhorar proporcao, alinhamento, espacamento e legibilidade.
- O botao deve ser claro, mas nao chamativo.
- A mensagem de erro deve ter tom discreto e direto.

### 3. Estado Vazio

Conteudo atual:

- Texto explicando que a data gera o wallpaper final.

Direcao:

- Pode ser reduzido.
- Deve preservar silencio visual.
- Evitar bloco grande, visual de dashboard ou excesso de instrucao.

### 4. Resultado Gerado

Elementos atuais:

- Barra superior com:
  - `Composicao gerada`
  - quantidade de semanas vividas
  - data de geracao
  - botao `Exportar JPG Final`
- Preview vertical do wallpaper.
- Secoes conceituais abaixo da composicao.

Direcao:

- A composicao visual deve ser protagonista.
- A barra superior deve parecer utilitaria e discreta.
- O botao de exportacao deve ser visivel, mas secundario em expressao visual.
- As secoes conceituais abaixo podem ser mais quietas, com menor peso visual.

## Composicao Exportavel Atual

A composicao final e um wallpaper vertical.

Dimensoes tecnicas atuais:

- Largura base: `1320px`
- Altura base: `2868px`
- Exportacao JPG com `pixelRatio: 2`
- Qualidade JPG: `0.98`
- Nome do preset: `iphone16-widget-90`

Elementos da composicao:

- Fundo claro, com textura visual discreta.
- Titulo superior: `MEMENTO MORI`
- Frase estoica curta sorteada.
- Grade de semanas.
- Marcadores laterais.

Direcao:

- Preservar nitidez da grade.
- Preservar legibilidade do titulo e da frase.
- Evitar sombras pesadas e efeitos decorativos.
- A imagem exportada deve parecer uma peca grafica final, nao um screenshot de interface.

## Paleta Atual

Tokens principais do CSS:

- Fundo: `#ebe2d2`
- Superficie: `#f6f0e6`
- Superficie suave: `#fbf7ef`
- Tinta principal: `#2f2418`
- Tinta secundaria: `#4f4131`
- Texto discreto: `#756451`
- Bronze envelhecido: `#8f6d43`
- Erro: `#8c4e3f`
- Bordas: tons de marrom com baixa opacidade

Direcao:

- Manter off-white, areia, pedra, carvao e bronze envelhecido.
- Evitar neon, cores vibrantes, roxo dominante, azul SaaS, gradientes chamativos e preto puro.
- A composicao pode ganhar refinamento material com sensacao de papel, pedra clara, bronze envelhecido e tinta discreta.

## Tipografia Atual

Fonte base:

- `Source Serif 4 Variable`, com fallback `Georgia, serif`

Direcao:

- Manter carater classico, editorial e sobrio.
- Evitar tipografia tecnologica.
- Usar poucos pesos e tamanhos.
- Preservar excelente leitura em marcadores laterais, titulo e frase.

## Layout Atual

Container principal:

- Largura maxima aproximada: `1180px`
- Margens laterais responsivas
- Conteudo centralizado
- Espacamento vertical generoso

Preview do wallpaper:

- Base real: `1320px x 2868px`
- Escala na tela: aproximadamente `0.29` no desktop
- Escala menor em telas pequenas
- Moldura com raio de borda e sombra leve

Grade:

- `84` linhas
- `52` colunas por linha
- Celulas quadradas
- Pequenos gaps entre celulas
- Marcador lateral em coluna propria

## O Que Otimizar no Stitch

Prioridades de design:

1. Refinar proporcao entre hero, formulario e resultado.
2. Reduzir qualquer sensacao de card corporativo.
3. Tornar o preview/exportacao o centro visual da experiencia.
4. Melhorar o equilibrio entre silencio visual e clareza de acao.
5. Refinar espacamentos, hierarquia tipografica e ritmo vertical.
6. Manter a grade legivel e limpa.
7. Tornar a pagina elegante em desktop e aceitavel no mobile.

Nao alterar a logica do produto:

- Nao mudar o fluxo principal.
- Nao adicionar novas features.
- Nao adicionar dashboard, metricas extras, graficos adicionais ou navegacao complexa.
- Nao transformar em landing page promocional.
- Nao poluir a composicao com icones, ilustracoes ou elementos decorativos.

## Prompt para Stitch

Use este prompt para orientar a otimizacao visual:

```text
Otimize o design/layout de uma aplicacao web chamada Memento Mori.

A aplicacao recebe uma data de nascimento em DD/MM/AAAA e gera uma composicao visual contemplativa das semanas de vida ate os 84 anos. A experiencia deve parecer uma peca editorial classica, sobria e silenciosa, inspirada em estoicismo romano, Marco Aurelio, Cicero, papel antigo, pedra clara, bronze envelhecido e tinta discreta.

O fluxo atual deve ser preservado:
1. Hero curto e centralizado.
2. Formulario com um unico campo de data de nascimento.
3. Botao para gerar visualizacao.
4. Resultado com barra discreta, preview vertical do wallpaper e botao de exportacao JPG.
5. Grade de 84 x 52 semanas, com marcadores laterais a cada 7 anos.

Melhore apenas layout, composicao, espacamento, hierarquia visual, proporcao, acabamento e responsividade. Nao adicione novas funcionalidades.

Direcao visual:
- minimalista, contemplativa, editorial, classica;
- fundo off-white/areia com sensacao sutil de papel;
- texto em carvao/marrom escuro;
- acentos discretos em bronze envelhecido;
- bordas finas e pouco contrastadas;
- sombras muito leves ou quase inexistentes;
- tipografia serifada, sobria e legivel;
- muito espaco em branco;
- grade como protagonista.

Evite:
- aparencia de dashboard SaaS;
- hero promocional;
- cards excessivos;
- neon, roxo, azul tecnologico ou cores vibrantes;
- gradientes chamativos;
- icones desnecessarios;
- efeitos futuristas;
- excesso de texto explicativo;
- sombras pesadas;
- visual infantil ou ludico.

O resultado deve manter uma tela inicial simples, centrada e elegante. Depois da geracao, a composicao exportavel deve dominar a pagina, com o botao de exportacao visivel mas discreto. O layout deve funcionar bem em desktop e se adaptar ao mobile sem comprometer a leitura da composicao.

Preserve a ideia central: "A vida e composta de semanas; a virtude esta em como se vive cada uma."
```

