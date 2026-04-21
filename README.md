# Memento Mori

Aplicacao web contemplativa que recebe a data de nascimento do usuario e gera
uma composicao visual com todas as semanas de vida ate os 84 anos.

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

## Fluxo do MVP

1. Informar a data de nascimento em `DD/MM/AAAA`.
2. Validar formato, existencia da data e datas futuras.
3. Calcular semanas completas vividas ate a data atual.
4. Renderizar a grade fixa de `84 x 52`.
5. Exportar a composicao em `.jpg` com pixel ratio ampliado.
