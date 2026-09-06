# Proposta de curso — "Fable 5.1: o que mudou, como usar, como gastar menos"

Data: 2026-09-05. Base: extração pública do runtime do Claude.ai para o Fable 5.1 (275.723 chars, 46 ferramentas; https://github.com/elder-plinius/CL4R1T4S/tree/main/ANTHROPIC), prompt oficial publicado pela Anthropic (https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1), comparação Fable 5 × 5.1 congelada em 2026-09-02, mais tabela oficial de preços e guia de custo da skill `claude-api`.

---

## 1. Análise do conteúdo

### O que os arquivos são

| Arquivo | O que é | Confiabilidade |
|---|---|---|
| `Claude-Fable-5.1.md` | Runtime montado do Claude.ai (prompt central + memória + busca + artefatos + roteamento + schemas de 46 ferramentas) | Extração **não oficial**. Anthropic publica só o prompt central. |
| Field Guide (PDF EN/PT) | Comparação Fable 5 vs Fable 5.1 no mesmo commit, mesmo método de contagem | Reproduzível, mas compara dois dumps não autenticados |
| Benchmarks citados | Anthropic: ciência com agentes 24,7→52,6; negócios 17,1→31,4; código 70,5→73,4 | Oficial, escolhido pela Anthropic |

### Os números que resumem a mudança

- Prompt: **17.501 → 40.046 palavras (2,3x)**.
- **+28 ferramentas** (18 mantidas, 46 total, zero removidas).
- **75% do crescimento** = memória (+8.639 palavras) + schemas de ferramentas (+8.328).

### As 28 adições, por função

| Grupo | Qtd | Ferramentas | O que muda pro usuário |
|---|---|---|---|
| Memória | 6 | memory_list/read/write/append/str_replace/delete | Claude mantém arquivos (perfil, preferências, projetos, pessoas). Lê antes de escrever, edita pontualmente, apaga com checagem de versão. |
| Conversas passadas | 3 | conversation_search, recent_chats, read_conversation | Reabre a conversa original, não só o resumo. Dispara por pistas linguísticas ("meu projeto", "o que você sugeriu"). |
| Respostas visuais | 13 | chart, comparison_card, quiz, step_card, itinerary, translation, visualize:show_widget... | Resposta vira interface (gráfico, quiz, comparação) em vez de texto longo. |
| Plugins + skills | 4 | search_plugins, search_skills, suggest_plugin_install, suggest_skills | Claude procura uma capacidade faltante e sugere (máx. 1 cartão por conversa). |
| Pesquisa | 1 | suggest_research | Oferece pesquisa profunda multi-fonte e espera decisão. |
| Controle | 1 | end_conversation | Botão de parada estreito, só segurança, com confirmação. |

### Regras de comportamento que apareceram (além das ferramentas)

- **Memória com limite rígido:** nunca armazena saúde, religião, orientação, dados de pagamento, etc. Fato guardado só entra na resposta se **mudar a substância**; "decorar" com memória é tratado como vigilância.
- **Rotina de visual em 4 passos:** precisa de visual? → MCP conectado serve? → pediu arquivo? → só então Visualizer inline.
- **Tom:** curto, sem "genuinamente/honestamente", formatação mínima, sem bullets ao recusar, sem formatação em conversa pessoal.
- **Skills obrigatórias antes de gerar arquivo:** ler o SKILL.md relevante é passo mandatório.
- **Anti-cópia:** máx. 1 citação curta (<15 palavras) por fonte em buscas.

### O paradoxo que o curso precisa carregar

Fable 5.1 **pontua mais alto** e o **sistema ao redor cresceu muito**. Nenhuma fonte prova que um causou o outro. O Field Guide pede: **julgue o modelo e o produto separadamente**. Isso vira a moldura da Trilha 1, não um rodapé.

### Onde o conteúdo é fraco (pra o curso não repetir o erro)

- Não diz nada sobre **preço** nem sobre **API**. A trilha de economia precisa de fonte externa (tabela oficial + guia de custo).
- Disponibilidade das 46 ferramentas **varia por superfície, plano e conta**. O aluno pode não ver todas.
- Dump congelado em 02/09/2026; o produto muda depois.

---

## 2. Proposta do curso

### Posicionamento

- **Nome sugerido:** *Fable 5.1 na prática — o que mudou, como usar, como gastar menos*
- **Formato:** curso simples e direto, 3 trilhas curtas, cada módulo = 1 ideia + 1 exercício + 1 quiz de 3 perguntas. Total estimado: **90 a 120 min**.
- **Público primário (decisão):** assinante do **Claude.ai / Claude Code** (público INEMA, leigo 40+). Desenvolvedor de API entra como **módulo opcional** no fim da Trilha 3. Motivo: servir os dois por igual deixa de ser "simples e direto".
- **Avaliação:** o curso é a própria avaliação: cada trilha fecha com um teste prático que a pessoa roda na conta dela e registra o resultado (os 5 testes do Field Guide).
- **Moldura obrigatória em todo módulo:** "fonte oficial" vs "dump não oficial"; "modelo" vs "produto ao redor".

---

### Trilha 1 — O que mudou (entender)

Objetivo: em 30 min a pessoa explica com as próprias palavras o que é diferente no Fable 5.1 e o que NÃO está provado.

| Módulo | Conteúdo | Exercício |
|---|---|---|
| 1.1 Duas coisas chamadas "prompt de sistema" | Prompt central oficial vs runtime montado (dump). Por que a distinção importa. | Abrir o índice oficial da Anthropic e o dump; apontar o que só existe no dump. |
| 1.2 Os três números | 2,3x palavras, +28 ferramentas, 75% memória+schemas. | Ler a página 6 do Field Guide e dizer em uma frase pra onde foram as palavras. |
| 1.3 Claude é mais que o modelo | As 4 camadas: memória, ferramentas, interface, política. | Classificar 6 ferramentas nas 4 camadas. |
| 1.4 As 28 adições em 6 grupos | Atlas das ferramentas (tabela acima). | Quiz: "qual grupo resolve X?" |
| 1.5 O paradoxo | Benchmarks subiram E o sistema cresceu. Coexistência ≠ causalidade. | Escrever 2 frases: uma sobre o modelo, uma sobre o produto. Não misturar. |
| 1.6 Mais memória = mais regras | Normal / dependente de configuração / nunca armazenar. | Listar 3 coisas que o Claude NUNCA guarda mesmo se você pedir. |

Teste de saída: explicar pra um colega em 2 minutos o que mudou, sem usar a palavra "melhor".

---

### Trilha 2 — Aplicar na prática (fazer)

Objetivo: rodar os **5 testes do comprador** do Field Guide na própria conta e registrar resultado. Cada teste mapeia num grupo de ferramentas.

| Módulo | Grupo de ferramentas | Exercício prático | O que registrar |
|---|---|---|---|
| 2.1 Continuidade | Memória (6) | Perguntar "o que você lembra do meu estilo de escrita / do meu projeto?". Depois pedir pra corrigir um item. | Acertou? Escopo certo? Corrigiu? |
| 2.2 Registro | Conversas passadas (3) | Referenciar uma decisão antiga sem re-explicar ("aquela estratégia que decidimos"). Ver se ele busca ou inventa. | Buscou a conversa original ou inventou continuidade? |
| 2.3 Interface | Respostas visuais (13) | Dar uma tabela pequena (10 linhas) e pedir "a apresentação mais útil". | Veio gráfico/cartão nativo ou 8 parágrafos? |
| 2.4 Capacidade | Plugins + skills (4) | Dar uma tarefa repetitiva especializada e perguntar se uma skill/plugin ajudaria. | Sugeriu 1 cartão? Foi pertinente? |
| 2.5 Controle | Memória (settings) + end_conversation | Abrir configurações de memória, remover um item, confirmar que sumiu. Conhecer o que "Generate memory from chats" e "Search and reference chats" ligam/desligam. | Conseguiu apagar? Entendeu os dois interruptores? |
| 2.6 Escrever pro Fable | Regras de tom do prompt | Reescrever um pedido antigo tirando micro-instruções ("seja conciso", "use bullets"). Prompts pra modelos anteriores são prescritivos demais. | O resultado piorou ou melhorou com menos instrução? |
| 2.7 Claude Code (bônus) | Effort, memória em arquivo, skills | Rodar a mesma tarefa em `low` e `high` effort; observar diferença. | Tempo, saída, qualidade. |

Regra pra todos: **anotar superfície (web/mobile/Code), plano, data**. São testes de produto, não benchmark universal.

Teste de saída: ficha preenchida dos 5 testes + 1 frase de veredito próprio.

---

### Trilha 3 — Como gastar menos com Fable 5.x (economizar)

**Premissa honesta que abre a trilha:** por token, Fable 5.x é **mais caro**, não mais barato.

| Modelo | Entrada $/1M | Saída $/1M |
|---|---|---|
| Fable 5.1 / Fable 5 | 10,00 | 50,00 |
| Opus 5 | 5,00 | 25,00 |
| Sonnet 5 | 2,00 | 10,00 |
| Haiku 4.5 | 1,00 | 5,00 |

Fable custa **2x o Opus 5 e 5x o Sonnet 5** por token. A economia só existe medida em **custo por tarefa concluída**: menos turnos, menos re-explicação, menos retrabalho, esforço calibrado. E há casos em que o modelo mais barato ganha; o curso diz quais.

| Módulo | Ideia central | Exercício | Fonte |
|---|---|---|---|
| 3.1 Preço por token vs preço por tarefa | Tabela acima. Fable a `low` venceu Sonnet 5 em pesquisa profunda custando ~10% menos por tarefa. | Calcular custo de 3 tarefas suas nos 2 modelos. | claude-api / cost-optimization §2.7 |
| 3.2 Economia do assinante: não repetir | Memória + busca de conversas = parar de colar contexto de novo a cada chat. Cada re-explicação é token pago (no plano, é cota gasta). | Medir quantas linhas você colava antes; testar sem colar. | dump (memory, past_chats) |
| 3.3 Effort é o primeiro botão | Em pesquisa/conhecimento a curva é quase plana: `medium` = mesma acurácia por 70–85% do custo; `low` perde 1–3 pontos e corta 1/3 a 1/2. Em código longo há troca real (Opus 5: `medium` −2 pts por metade; `low` −8 pts por 1/4). | No Claude Code, rodar a mesma tarefa em `low`, `medium`, `high`. | cost-optimization §2.6 |
| 3.4 Rode barato, refaça só o que falhou | Tudo em `low`, refazer falhas no default: mesma taxa de acerto por ~metade do custo (93% a $0,70 vs 91,7% a $1,39). Só vale se há um checador (teste, validador). | Montar uma tarefa com checador simples e aplicar a política. | cost-optimization §2.6 |
| 3.5 Onde o mais barato ganha | Em subconjunto de código, Opus 5 empatou com Fable 5 (91,7 vs 91,3) a ~60% do custo. Haiku responde conhecimento a 1/10 do custo com 63% vs 92% de acerto: bom pra volume com saída checável, ruim pra loop longo. | Classificar 5 tarefas suas: Fable / Opus / Sonnet-Haiku. | cost-optimization §2.7 |
| 3.6 Precifique a cauda | Na tarefa típica todos parecem iguais e o barato parece melhor; a conta é decidida pelas tarefas que o barato erra. Em uma rodada de 20 problemas, 2 carregaram 43% do gasto. | Identificar as 10% tarefas mais difíceis do seu fluxo. | cost-optimization §2.7 |
| 3.7 (Opcional, dev API) Alavancas 5.1 | Cache de leitura a $0,25/MTok; troca de effort por mensagem sem resetar cache; task budgets (−18% por −2,7 pts; −47% por −4,4 pts); batch a 50%; fallbacks server-side. Regra: cache → effort → budget → modelo, nessa ordem, uma alavanca por vez, medindo. | Ligar `cache_read_input_tokens` nos logs e provar que não é zero. | claude-api SKILL.md + cost-optimization |

Regra da trilha: **varrer effort no Fable antes de descer de modelo**; nunca decidir por uma rodada só.

Teste de saída: plano de 1 página: "minhas tarefas, qual modelo, qual effort, o que checa falha".

---

## 3. Estrutura sugerida do produto

```
fable51-system/
  doc/                       (fontes, já existe)
  curso/
    index.html               landing + 3 trilhas
    trilha-1-o-que-mudou/    6 módulos
    trilha-2-na-pratica/     7 módulos (5 testes + 2 bônus)
    trilha-3-economizar/     6 módulos + 1 opcional
    assets/
  PROPOSTA-CURSO.md          (este arquivo)
```

- Cada módulo: 1 tela, ~5 min, 1 exercício, quiz de 3 perguntas.
- Ficha dos 5 testes como PDF/HTML imprimível (é o "certificado" prático).
- Versão do prompt fixada no rodapé: "dump de 02/09/2026, commit 93b0ae6".

## 4. Riscos e decisões pendentes

- **Disponibilidade:** o aluno pode não ver as 13 ferramentas visuais no plano dele. O módulo 2.3 precisa dizer "se não aparecer, registre isso; é dado, não falha".
- **Números de custo** vêm de rodadas da Anthropic com Fable 5 (não 5.1). Dizer isso. Cache a $0,25 é novidade 5.1.
- **Formato do curso:** as skills `formato-curso-v5` (público 40+ leigo, INEMA.PRO) e `formato-curso-v2` (dark âmbar + camada de aprendizagem) só rodam por invocação direta. Precisa escolher antes de construir.
