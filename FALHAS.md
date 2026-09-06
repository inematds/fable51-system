# FALHAS — fable51-system

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-06 | Célula de tabela com placeholder `<passou / parcial / falhou>` era lida como tag HTML e sumia na ficha consolidada (módulo 2.2) | trocar `<...>` por `[...]` fora de code box; grep `'<[a-z` no build antes de publicar | prompt |
| 2026-09-06 | TOC do módulo (`data-inema-toc`) ficava sticky por CSS do learn.css e cobria o conteúdo ao rolar | `[data-inema-toc]{position:static!important}` no head | infra |
