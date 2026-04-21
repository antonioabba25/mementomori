# AGENTS.md

## Propósito

Este projeto deve resultar em uma aplicação web contemplativa e minimalista que recebe a data de nascimento do usuário e gera uma visualização das semanas de vida dessa pessoa até os 84 anos.

O produto final precisa oferecer, como saída principal, uma imagem exportável em `.jpeg` ou `.jpg`, escolhendo a variação com melhor resolução prática para preservar nitidez da grade e legibilidade dos marcadores.

## Visão do Produto

A aplicação não deve parecer uma ferramenta corporativa, um dashboard ou um experimento visual futurista. Ela deve funcionar como uma peça de contemplação do tempo, com inspiração estética estoica romana.

Referências conceituais:
- sobriedade
- contemplação
- finitude
- ordem
- disciplina
- silêncio visual

Referências estéticas:
- Marco Aurélio
- Cícero
- linguagem editorial clássica
- materiais visuais que evoquem papel, pedra, bronze envelhecido e tinta discreta

## Resultado Esperado

Quando a aplicação estiver funcional, o fluxo ideal deve ser:

1. O usuário informa sua data de nascimento no formato `DD/MM/AAAA`.
2. A aplicação valida a entrada.
3. A aplicação calcula quantas semanas completas a pessoa já viveu até a data atual da execução.
4. A aplicação constrói uma grade visual de `84 anos x 52 semanas`.
5. Cada célula representa uma semana.
6. Semanas vividas aparecem preenchidas.
7. Semanas futuras aparecem vazias ou em contraste reduzido.
8. A aplicação renderiza a visualização com marcações laterais a cada 7 anos.
9. O usuário pode exportar o resultado como arquivo `.jpeg` ou `.jpg`.

## Requisitos Funcionais

### Entrada

- Aceitar data de nascimento em `DD/MM/AAAA`.
- Validar formato, existência da data e coerência temporal.
- Impedir datas futuras.
- Tratar mensagens de erro com tom discreto e claro.

### Cálculo

- Considerar `84 anos` como horizonte fixo da visualização.
- Considerar `52 semanas por ano` como base visual uniforme.
- Total visual esperado: `4368 células`.
- O cálculo de semanas vividas deve ser real, usando a diferença entre a data atual e a data de nascimento.
- A quantidade de semanas vividas pode ser calculada por `floor(dias_corridos / 7)`.
- O preenchimento da grade deve respeitar o limite máximo visual de `4368` semanas.

### Visualização

- Organizar a grade em linhas por ano e colunas por semana.
- Cada linha representa `1 ano`.
- Cada linha contém `52 células`.
- Exibir marcações laterais nos anos:
  - `0`
  - `7`
  - `14`
  - `21`
  - `28`
  - `35`
  - `42`
  - `49`
  - `56`
  - `63`
  - `70`
  - `77`
  - `84`
- Permitir destaque sutil do ano atual de vida.
- Permitir destaque opcional da semana corrente com contorno fino, desde que não polua a composição.

### Exportação

- A aplicação deve gerar exportação em `.jpeg` ou `.jpg`.
- A exportação deve priorizar alta nitidez da grade.
- O agente que implementar a funcionalidade deve preferir resolução aumentada, por exemplo com `pixel ratio` superior ao padrão da tela.
- O arquivo exportado deve preservar:
  - proporção da composição
  - contraste entre semanas vividas e futuras
  - legibilidade de marcadores laterais
  - legibilidade do título e subtítulo, se presentes
- Se houver duas estratégias equivalentes, priorizar a que produzir melhor resolução visual com menor risco de artefatos.

## Direção de UX

- A tela inicial deve ser simples e centrada.
- Deve haver um único campo principal para data de nascimento.
- Deve haver um botão claro para gerar a visualização.
- O resultado pode aparecer abaixo do formulário, sem mudar drasticamente o contexto da página.
- A interface deve evitar excesso de texto explicativo.
- O conteúdo textual deve ser breve, elegante e contemplativo.

Texto de apoio sugerido:

`A vida é composta de semanas; a virtude está em como se vive cada uma.`

## Direção Visual

### O que perseguir

- minimalismo
- elegância
- sobriedade
- aparência editorial
- proporção rigorosa
- sensação de peça gráfica contemplativa

### O que evitar

- visual futurista
- neon
- cores vibrantes
- gradientes chamativos
- sombras pesadas
- ícones desnecessários
- aparência infantil
- aparência lúdica
- aparência de dashboard SaaS

### Paleta sugerida

- off-white
- areia
- pedra
- carvão
- bronze envelhecido

### Tipografia

- Preferir tipografia com caráter clássico e sóbrio.
- Evitar aparência excessivamente tecnológica.
- Usar poucos pesos e tamanhos.
- Preservar excelente legibilidade da grade e dos marcadores.

### Composição

- Espaçamento generoso.
- Linhas finas e discretas.
- Forte organização geométrica.
- Hierarquia visual contida.
- A grade deve ser a protagonista.

## Diretrizes Técnicas

- Preferir implementação em React.
- Manter arquitetura simples e modular.
- Priorizar desktop, sem abandonar responsividade.
- Garantir boa leitura mesmo com grande quantidade de células.
- Preferir `CSS Grid` para a grade principal.
- Evitar bibliotecas pesadas quando possível.

Estrutura sugerida:
- `App`
- `BirthDateForm`
- `LifeWeeksGrid`
- `YearRow`
- `WeekCell`
- `SideMarkers`
- `ExportButton`

## Regras de Implementação para Agentes

- Preservar a experiência contemplativa acima de efeitos visuais chamativos.
- Não adicionar features paralelas antes de concluir o fluxo principal.
- Tratar a exportação da imagem como parte central do produto, não como detalhe secundário.
- Garantir que a imagem gerada seja fiel ao layout exibido na interface.
- Sempre validar a data antes de processar a grade.
- Manter o código limpo, legível e modular.
- Favorecer soluções previsíveis e fáceis de manter.

## Ordem de Prioridade

Ao trabalhar neste projeto, seguir esta ordem:

1. Validar e processar corretamente a data de nascimento.
2. Calcular corretamente as semanas vividas.
3. Renderizar corretamente a grade de `84 x 52`.
4. Aplicar a linguagem visual minimalista e estoica.
5. Implementar exportação em `.jpeg/.jpg` com boa resolução.
6. Refinar responsividade, microdetalhes e polimento.

## Critérios de Aceitação

Uma implementação será considerada aderente quando:

- a data de nascimento for validada corretamente
- a quantidade de semanas vividas refletir a data atual da execução
- a grade de 84 anos estiver completa e uniforme
- as semanas vividas estiverem visivelmente preenchidas
- as semanas futuras estiverem visualmente distintas
- houver marcações laterais a cada 7 anos
- a interface mantiver tom sóbrio, clássico e minimalista
- o usuário conseguir exportar a composição em `.jpeg` ou `.jpg`
- o arquivo exportado tiver nitidez suficiente para leitura confortável

## Resumo Operacional

Este projeto deve ser tratado como uma aplicação web de contemplação do tempo. O núcleo do produto é a transformação de uma data de nascimento em uma imagem elegante, silenciosa e precisa da vida em semanas, limitada a 84 anos, com exportação final em formato `.jpeg` ou `.jpg`.
