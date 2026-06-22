# Memento Mori

Aplicação web contemplativa que transforma uma data de nascimento em uma peça
visual das semanas de vida até os 84 anos. A experiência é deliberadamente
simples: o usuário informa a data, a aplicação valida a entrada, calcula as
semanas completas já vividas e gera uma composição exportável em JPG.

O produto não é um dashboard. Ele deve parecer uma peça editorial silenciosa,
com inspiração estoica romana, materiais discretos e foco absoluto na grade de
`84 x 52` semanas.

## Estado Atual

- Fluxo principal em React + TypeScript.
- Entrada única no formato `DDMMAAAA`, sem barras.
- Validação de data inexistente, formato inválido e data futura.
- Cálculo real por dias corridos, usando `floor(dias / 7)`.
- Grade visual com `4.368` células.
- Marcadores laterais a cada 7 anos.
- Exportação JPG por `html-to-image`, com `pixelRatio` elevado para preservar
  nitidez.
- Preset visual mobile/wallpaper como saída final.
- Deploy preparado para Cloudflare Pages.

## Stack

- React 19
- TypeScript
- Vite 8
- date-fns
- html-to-image
- Newsreader via `@fontsource-variable/newsreader`
- Vitest + Testing Library
- Playwright
- Cloudflare Pages/Wrangler para publicação opcional

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run test
npm run test:e2e
npm run build
```

Scripts de publicação:

```bash
npm run preview
npm run preview:cloudflare
npm run deploy:cloudflare
```

## Fluxo do Produto

1. O usuário informa a data de nascimento em `DDMMAAAA`.
2. A aplicação valida formato, existência da data e coerência temporal.
3. A aplicação calcula semanas completas vividas até o dia atual.
4. Uma frase estoica curta é sorteada.
5. A composição final é renderizada com título, frase, grade e marcadores.
6. O usuário exporta a composição em `.jpg`.

## Estrutura do Projeto

```text
.
├── docs/
│   ├── archive/                 # Referências históricas e explorações visuais
│   └── deployment/              # Guias de publicação
├── e2e/                         # Testes Playwright
├── public/                      # Arquivos estáticos e headers do Pages
├── src/
│   ├── components/              # Componentes de UI e composição visual
│   ├── lib/                     # Regras de negócio, conteúdo e presets
│   ├── test/                    # Setup de testes unitários
│   ├── App.tsx                  # Orquestração do fluxo
│   ├── App.css                  # Linguagem visual principal
│   └── main.tsx                 # Bootstrap do React
└── wrangler.toml                # Configuração do Cloudflare Pages
```

## Pontos Principais do Código

- [src/App.tsx](src/App.tsx): controla estado do formulário, validação,
  visualização gerada, frase sorteada e retorno ao estado inicial.
- [src/lib/life-weeks.ts](src/lib/life-weeks.ts): concentra a regra de negócio
  mais importante do projeto: parsing, validação, cálculo de semanas e montagem
  da matriz de anos/semanas.
- [src/components/BirthDateForm.tsx](src/components/BirthDateForm.tsx):
  formulário único de entrada.
- [src/components/MobileWallpaperFrame.tsx](src/components/MobileWallpaperFrame.tsx):
  enquadramento final usado tanto na prévia quanto na exportação.
- [src/components/LifeWeeksGrid.tsx](src/components/LifeWeeksGrid.tsx):
  renderização da composição visual e da grade.
- [src/components/ExportButton.tsx](src/components/ExportButton.tsx):
  exportação JPG a partir de uma superfície de renderização dedicada.
- [src/lib/mobile-wallpaper.ts](src/lib/mobile-wallpaper.ts): preset de
  dimensões, escala e estilo do wallpaper.
- [src/lib/stoic-quotes.ts](src/lib/stoic-quotes.ts): repositório de frases.
- [src/lib/concepts.ts](src/lib/concepts.ts): textos conceituais exibidos após
  a geração.

## Regras de Domínio

- Horizonte fixo: `84 anos`.
- Base visual: `52 semanas por ano`.
- Total visual: `84 * 52 = 4.368` células.
- Semanas vividas: `floor(dias_corridos / 7)`.
- O preenchimento nunca deve ultrapassar `4.368` semanas.
- A grade deve permanecer organizada em `84` linhas e `52` colunas.
- A data atual deve ser obtida no momento da execução, não fixada em código de
  produção.

## Exportação

A exportação é parte central do produto. O botão de exportação renderiza uma
instância dedicada da composição e gera um JPG com:

- dimensões definidas no preset visual;
- `pixelRatio` elevado;
- fundo explícito para evitar transparência;
- qualidade alta;
- mesma composição vista na prévia.

Ao alterar layout, tipografia, escala ou grade, valide a exportação além da
interface em tela.

## Testes e Validação

Antes de publicar ou considerar uma mudança pronta, rode:

```bash
npm run lint
npm run test
npm run build
```

Quando a mudança afetar fluxo do usuário, formulário, exportação ou layout
responsivo, rode também:

```bash
npm run test:e2e
```

Toda alteração de interface, UI, layout, composição visual, tipografia,
responsividade ou exportação deve ser validada com prints da tela. Use
preferencialmente capturas via Playwright e, quando a mudança afetar o wallpaper
final, compare também a prévia em tela com a imagem JPG exportada. A validação
deve observar posicionamento dos objetos, hierarquia visual, legibilidade,
alinhamentos, espaçamentos, proporções, marcadores, grade e possíveis
sobreposições com relógio, status bar, aplicativos, dock ou controles do
sistema em uso como plano de fundo mobile.

Cobertura atual:

- `src/lib/life-weeks.test.ts`: validação e cálculo de semanas.
- `src/App.test.tsx`: fluxo principal da interface.
- `src/components/ExportButton.test.tsx`: comportamento de exportação.
- `e2e/app.spec.ts`: fluxo integrado via navegador.

## Publicação

A publicação recomendada é pelo Cloudflare Pages como site estático Vite.

Configuração esperada:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Environment variable: `NODE_VERSION=22`

Guia completo: [docs/deployment/cloudflare-pages.md](docs/deployment/cloudflare-pages.md).

## Arquivo e Referências

Materiais que ajudaram a formar a direção visual e conceitual ficam fora da raiz
do projeto, em [docs/archive](docs/archive). Eles não fazem parte do runtime da
aplicação.

Use o arquivo apenas como referência histórica. Não reintroduza assets ou scripts
exploratórios no fluxo principal sem uma justificativa clara.

## Manutenção

- Mantenha a raiz do projeto enxuta.
- Não versione `dist`, relatórios de teste, caches locais ou saídas temporárias.
- Preserve a linguagem visual sóbria: off-white, areia, pedra, carvão e bronze
  envelhecido.
- Evite features paralelas antes de proteger o fluxo principal.
- Mudanças em cálculo, grade ou exportação devem vir acompanhadas de testes.
