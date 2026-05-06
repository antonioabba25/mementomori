# Publicacao no Cloudflare Pages

Este projeto e um app Vite/React estatico. A publicacao recomendada e pelo
Cloudflare Pages conectado ao repositorio Git, com deploy automatico a cada push
na branch principal.

## Validacao local

Antes de publicar ou fazer um deploy manual, rode:

```bash
npm ci
npm run lint
npm run test
npm run build
```

Para conferir o build local:

```bash
npm run preview
```

## Configuracao no painel do Cloudflare

1. Acesse `Workers & Pages`.
2. Crie um novo projeto em `Pages`.
3. Conecte o repositorio do GitHub.
4. Use estas configuracoes:

| Campo | Valor |
| --- | --- |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Production branch | `main` |

Em `Environment variables`, defina:

| Nome | Valor |
| --- | --- |
| `NODE_VERSION` | `22` |

## Deploy manual opcional

O fluxo principal deve ser pelo Git, mas tambem ha scripts para publicar ou
testar a versao de Pages pela CLI:

```bash
npm run preview:cloudflare
npm run deploy:cloudflare
```

O primeiro comando executa o build e sobe uma previa local com `wrangler pages
dev`. O segundo executa o build e publica o conteudo de `dist` no projeto
`mementomori`.

No primeiro uso, o Wrangler pode abrir o navegador para autenticar sua conta
Cloudflare.

## Pos-publicacao

Depois do primeiro deploy, valide:

- A URL `*.pages.dev` abre a aplicacao.
- A data de nascimento aceita o formato `DDMMAAAA`, sem barras.
- Datas invalidas e futuras mostram erro discreto.
- A grade de semanas e renderizada por completo.
- A exportacao gera um arquivo `.jpg`.
- O arquivo exportado preserva nitidez, contraste e marcadores laterais.

## Dominio proprio

Com o deploy funcionando em `*.pages.dev`, adicione o dominio em `Custom
domains` dentro do projeto Pages. Se o DNS do dominio ja estiver na Cloudflare,
o registro e o certificado TLS costumam ser configurados automaticamente.
