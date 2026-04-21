# Memento Mori

Aplicação web contemplativa que recebe a data de nascimento do usuário e gera
uma composição visual com todas as semanas de vida até os 84 anos.

O produto final da interface e da exportação é uma única composição pensada
como wallpaper mobile: título `MEMENTO MORI`, uma frase estoica aleatória e a
grade de `84 x 52` semanas.

## Stack

- React 19
- TypeScript
- Vite 8
- date-fns
- html-to-image
- Vitest + Testing Library
- Playwright

## Scripts

```bash
npm install
npm run dev
npm run build
npm run test
npm run test:e2e
```

## Fluxo do produto

1. Informar a data de nascimento em `DD/MM/AAAA`.
2. Validar formato, existência da data e datas futuras.
3. Calcular semanas completas vividas até a data atual.
4. Sortear uma frase curta do repositório estoico.
5. Renderizar a composição final com:
   `MEMENTO MORI`, frase, grade de semanas e marcadores laterais.
6. Exportar o resultado em `.jpg` com preset único para mobile.

## Como o código está organizado

### 1. Orquestração da tela

- [src/App.tsx](src/App.tsx)
  Controla a entrada de data, o estado de erro, a frase sorteada e o momento em
  que a composição final aparece.

### 2. Regras de negócio do tempo

- [src/lib/life-weeks.ts](src/lib/life-weeks.ts)
  Concentra a lógica que realmente importa para o domínio:
  validação da data, cálculo de semanas vividas, deslocamento da semana de
  nascimento e montagem da grade `84 x 52`.

### 3. Composição visual final

- [src/components/MobileWallpaperFrame.tsx](src/components/MobileWallpaperFrame.tsx)
  É o enquadramento do wallpaper.
- [src/components/LifeWeeksGrid.tsx](src/components/LifeWeeksGrid.tsx)
  Renderiza o título, a frase e a grade.
- [src/components/ExportButton.tsx](src/components/ExportButton.tsx)
  Gera o JPG a partir da mesma composição usada na prévia.

### 4. Conteúdo e configuração

- [src/lib/mobile-wallpaper.ts](src/lib/mobile-wallpaper.ts)
  Guarda o preset visual do wallpaper final.
- [src/lib/stoic-quotes.ts](src/lib/stoic-quotes.ts)
  Repositório das frases aleatórias.
- [src/lib/concepts.ts](src/lib/concepts.ts)
  Textos explicativos exibidos ao final da tela depois que a composição é gerada.

## Ideia central da arquitetura

O projeto tenta separar bem três responsabilidades:

1. Regra de negócio:
   calcular corretamente o tempo vivido.
2. Composição:
   transformar esse cálculo em uma peça gráfica contemplativa.
3. Conteúdo:
   manter frases, textos conceituais e preset visual fora do componente principal.

Essa divisão deixa a manutenção mais simples: quando for preciso mexer em texto,
visual ou cálculo, cada parte já tem um lugar previsível.

## Validação

Os testes cobrem:

- validação e cálculo em `src/lib/life-weeks.test.ts`
- fluxo principal da interface em `src/App.test.tsx`
- exportação do JPG em `src/components/ExportButton.test.tsx`

Antes de publicar alterações, rode:

```bash
npm run test
npm run build
```
