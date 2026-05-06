# AGENTS.md

## Norte do Projeto

Memento Mori é uma aplicação web contemplativa e minimalista. Ela recebe uma
data de nascimento em `DDMMAAAA` e transforma essa data em uma composição
visual das semanas de vida até os 84 anos.

A saída principal é uma imagem exportável em `.jpg`/`.jpeg`, com nitidez
suficiente para preservar grade, marcadores e tipografia. A exportação não é
detalhe secundário: ela é o produto final.

## Estado Atual da Aplicação

- Stack: React, TypeScript, Vite, date-fns, html-to-image, Vitest, Testing
  Library e Playwright.
- A experiência principal é um wallpaper mobile/exportável.
- A grade tem `84` linhas por `52` colunas, totalizando `4.368` semanas.
- A composição usa título `MEMENTO MORI`, frase estoica curta e marcadores
  laterais a cada 7 anos.
- O deploy recomendado é Cloudflare Pages.

## Prioridade de Trabalho

Ao decidir o que fazer primeiro, siga esta ordem:

1. Validar e processar corretamente a data de nascimento.
2. Calcular corretamente as semanas vividas.
3. Renderizar a grade completa de `84 x 52`.
4. Preservar a linguagem visual minimalista, editorial e estoica.
5. Garantir exportação JPG/JPEG nítida e fiel ao layout.
6. Refinar responsividade e microdetalhes.
7. Só então considerar qualquer melhoria secundária.

## Regras de Domínio

- Aceitar apenas data no formato `DDMMAAAA`, sem barras.
- Validar formato, existência da data e coerência temporal.
- Impedir datas futuras.
- Calcular semanas vividas com diferença real de dias:
  `floor(dias_corridos / 7)`.
- Usar horizonte fixo de `84 anos`.
- Usar base visual uniforme de `52 semanas por ano`.
- Limitar o preenchimento ao máximo visual de `4.368` semanas.
- Manter marcadores laterais em:
  `0`, `7`, `14`, `21`, `28`, `35`, `42`, `49`, `56`, `63`, `70`, `77`, `84`.

## Direção de UX

- Tela inicial simples, centrada e silenciosa.
- Um único campo principal para a data de nascimento.
- Um botão claro para gerar a visualização.
- Resultado pode aparecer abaixo do formulário sem quebrar o contexto.
- Texto curto, elegante e discreto.
- Mensagens de erro devem ser claras, mas sem tom alarmista.

Texto de apoio compatível:

`A vida é composta de semanas; a virtude está em como se vive cada uma.`

## Direção Visual

Buscar:

- sobriedade;
- contemplação;
- finitude;
- ordem;
- disciplina;
- silêncio visual;
- linguagem editorial clássica;
- referências materiais de papel, pedra, bronze envelhecido e tinta discreta.

Evitar:

- dashboard corporativo;
- visual futurista;
- neon;
- cores vibrantes;
- gradientes chamativos;
- sombras pesadas;
- excesso de ícones;
- aparência infantil ou lúdica;
- landing page promocional.

Paleta preferencial:

- off-white;
- areia;
- pedra;
- carvão;
- bronze envelhecido.

Tipografia:

- Preferir serifas clássicas e sóbrias.
- Evitar aparência tecnológica.
- Usar poucos pesos e tamanhos.
- Proteger legibilidade de título, frase, grade e marcadores.

## Arquitetura Atual

```text
src/
├── components/
│   ├── BirthDateForm.tsx
│   ├── ExportButton.tsx
│   ├── LifeWeeksGrid.tsx
│   ├── MobileWallpaperFrame.tsx
│   ├── SideMarkers.tsx
│   ├── WeekCell.tsx
│   └── YearRow.tsx
├── lib/
│   ├── concepts.ts
│   ├── life-weeks.ts
│   ├── mobile-wallpaper.ts
│   └── stoic-quotes.ts
├── test/
│   └── setup.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

Responsabilidades:

- `src/lib/life-weeks.ts`: parsing, validação, cálculo e matriz da grade.
- `src/lib/mobile-wallpaper.ts`: preset visual da composição exportável.
- `src/components/MobileWallpaperFrame.tsx`: superfície final de preview/export.
- `src/components/ExportButton.tsx`: geração do JPG.
- `src/App.tsx`: orquestração da experiência.
- `src/App.css`: linguagem visual principal.

## Exportação

Ao mexer na exportação:

- preservar o uso da mesma composição visual da prévia;
- manter fundo explícito no JPG;
- preferir `pixelRatio` acima do padrão da tela;
- validar título, frase, grade e marcadores no arquivo gerado;
- evitar soluções que dependam de screenshot manual;
- não trocar formato final para PNG sem pedido explícito.

## Testes Esperados

Use:

```bash
npm run lint
npm run test
npm run build
```

Use também:

```bash
npm run test:e2e
```

quando alterar fluxo principal, layout renderizado, formulário, exportação ou
comportamento de navegador.

Mudanças em `life-weeks.ts` devem ter testes unitários. Mudanças na exportação
devem considerar testes em `ExportButton.test.tsx` e validação visual/manual
quando necessário.

## Organização e Limpeza

- A raiz deve conter apenas configuração, entrada do app, documentação principal
  e arquivos necessários de publicação.
- Artefatos gerados localmente não devem ser versionados: `dist`,
  `test-results`, `playwright-report`, `.wrangler`, `.tmp-*`, `.DS_Store`.
- Referências históricas e exploração visual pertencem a `docs/archive`.
- Guias operacionais pertencem a `docs/deployment` ou outra subpasta clara de
  `docs`.
- Não recriar scripts exploratórios no runtime do projeto sem necessidade
  explícita.
- Antes de remover arquivo versionado, confirme se ele é código runtime,
  documentação viva ou material histórico. Material histórico útil deve ser
  arquivado, não descartado.

## Regras para Futuras Tarefas

- Preserve mudanças existentes no worktree que não foram feitas por você.
- Prefira alterações pequenas, previsíveis e alinhadas ao padrão atual.
- Não adicione bibliotecas pesadas para resolver problemas simples.
- Não crie abstrações novas sem ganho claro de legibilidade ou manutenção.
- Evite features paralelas antes de fechar o fluxo principal.
- Se alterar estrutura de pastas, atualize README, imports, scripts e testes.
- Se alterar deploy, atualize `docs/deployment/cloudflare-pages.md`.
- Se alterar a visão de produto, atualize este arquivo e o README.

## Critérios de Aceitação

Uma entrega aderente deve garantir:

- data validada corretamente;
- semanas vividas coerentes com a data atual de execução;
- grade uniforme com `84 x 52`;
- semanas vividas e futuras visualmente distintas;
- marcadores laterais a cada 7 anos;
- interface sóbria, clássica e minimalista;
- exportação `.jpg`/`.jpeg` funcional;
- arquivo exportado com nitidez confortável;
- documentação atualizada quando houver mudança estrutural.
