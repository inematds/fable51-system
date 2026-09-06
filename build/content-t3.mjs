// Trilha 3 — Gastar menos (purple)
import { c, svg } from './lib.mjs';

export const T3 = {
  modules: [
    // ================= 3.1 =================
    {
      id: '3-1', emoji: '🏷️', title: 'Preço por token contra preço por tarefa', punch: 'Fable custa 2x o Opus. E daí?', minutes: 45, level: 'Básico', kind: 'Fundamento',
      lead: 'Por token, o Fable 5.1 é o modelo mais caro da família. A economia só existe medida em custo por tarefa concluída: menos turnos, menos retrabalho, esforço calibrado. E há casos em que o modelo mais barato vence.',
      topics: [
        {
          emoji: '💵', title: 'A tabela de preços', sub: 'Quanto custa cada milhão de tokens',
          what: 'Os preços oficiais da API da Anthropic por milhão de tokens de entrada e de saída, para os modelos atuais.',
          why: 'É a premissa honesta desta trilha: por token, Fable custa 2x o Opus 5 e 5x o Sonnet 5. Qualquer conversa sobre economia começa aqui.',
          keys: 'Token, entrada, saída, $/1M, família de modelos.',
          body: (t) => [
            c.glossary(t, [
              ['Token', 'Pedaço de texto que o modelo lê ou escreve, cerca de 3 a 4 caracteres em português. Mil tokens são umas 700 palavras.'],
              ['Entrada (input)', 'Tudo que vai para o modelo: prompt de sistema, sua mensagem, o histórico, documentos, resultados de ferramentas.'],
              ['Saída (output)', 'O que o modelo escreve, incluindo o raciocínio interno, que é cobrado mesmo quando não aparece.'],
              ['$/1M', 'Dólares por um milhão de tokens. É a unidade da tabela oficial.'],
            ]),
            c.table(t, { headers: ['Modelo', 'Entrada ($/1M)', 'Saída ($/1M)', 'Em relação ao Fable'], rows: [
              ['Fable 5.1 / Fable 5', '10,00', '50,00', 'referência'],
              ['Opus 5', '5,00', '25,00', 'metade'],
              ['Sonnet 5', '2,00', '10,00', 'um quinto'],
              ['Haiku 4.5', '1,00', '5,00', 'um décimo'],
            ], caption: 'Preços de lista da API direta da Anthropic (tabela oficial, consultada em setembro de 2026). Plataformas parceiras podem diferir.' }),
            c.figure(t, svg.bars(t, { label: 'Preço de saída por milhão de tokens: Fable comparado aos outros modelos', aLabel: 'entrada', bLabel: 'saída', max: 55, items: [
              { label: 'Fable 5.1', a: 10, b: 50, aText: '$10', bText: '$50' },
              { label: 'Opus 5', a: 5, b: 25, aText: '$5', bText: '$25' },
              { label: 'Sonnet 5', a: 2, b: 10, aText: '$2', bText: '$10' },
              { label: 'Haiku 4.5', a: 1, b: 5, aText: '$1', bText: '$5' },
            ] }), 'A saída custa cinco vezes a entrada em todos os modelos. E o Fable é o topo da escada. Se a conversa terminasse aqui, a conclusão seria "use o mais barato". Ela não termina aqui.'),
            c.alert({ title: 'Premissa honesta da trilha', text: 'Por token, Fable 5.x é mais caro, não mais barato. Este curso não vai fingir o contrário. O que vem a seguir é como a economia aparece quando você para de contar tokens e começa a contar tarefas concluídas.' }),
          ],
        },
        {
          emoji: '⚖️', title: 'Por que "por token" engana', sub: 'Custo por tarefa concluída',
          what: 'A unidade que importa é o custo para terminar uma tarefa com qualidade aceitável, incluindo tentativas falhas, retrabalho e turnos extras.',
          why: 'Um pedido mais barato que precisa de mais turnos ou de correção não é mais barato. A tabela de preços não prevê o ranking.',
          keys: 'Custo por tarefa, retrabalho, turnos, taxa de acerto.',
          body: (t) => [
            c.p('Um modelo barato que erra e precisa de duas tentativas custou o dobro do que a tabela diz. Um modelo caro que acerta de primeira, com menos idas e vindas, pode ter custado menos. A guia de otimização de custo da Anthropic resume: <strong class="text-purple-400">julgue o custo por tarefa concluída, não por pedido</strong>.'),
            c.figure(t, svg.scale(t, { label: 'Balança entre preço por token e custo por tarefa concluída', tilt: 0.5, left: { title: 'Por token', lines: ['Fable: $50 / 1M saída', 'Sonnet: $10 / 1M saída', '"o barato ganha"'] }, right: { title: 'Por tarefa', lines: ['tentativas × tokens', '+ retrabalho + turnos', '"depende da tarefa"'] } }), 'O prato da direita pesa mais porque inclui o que a tabela esconde: quantas vezes você precisou pedir de novo.'),
            c.concept(t, { title: 'A conta que você precisa fazer', emoji: '🧮', paras: [
              'Custo por tarefa = (tokens de entrada × preço de entrada + tokens de saída × preço de saída) × número de tentativas até ficar bom. Some os turnos de correção. Um modelo que precisa de 1,5 tentativa em média já perdeu boa parte da vantagem de preço.',
            ] }),
            c.table(t, { headers: ['Cenário', 'Preço de lista', 'Tentativas', 'Custo real relativo'], rows: [
              ['Modelo barato, acerta de primeira', '1x', '1', '1x'],
              ['Modelo barato, precisa refazer uma vez', '1x', '2', '2x'],
              ['Modelo 5x mais caro, acerta de primeira', '5x', '1', '5x'],
              ['Modelo 5x mais caro em esforço baixo (metade do custo), acerta de primeira', '2,5x', '1', '2,5x'],
            ], caption: 'Ilustrativo. O ponto é que tentativas multiplicam o preço de lista.' }),
          ],
        },
        {
          emoji: '🥇', title: 'Quando o Fable em esforço baixo vence o barato', sub: 'Pesquisa profunda: ganhou e custou 10% menos por tarefa',
          what: 'Em medições publicadas pela Anthropic, o Fable 5 em esforço baixo superou o Sonnet 5 num benchmark de pesquisa profunda custando cerca de 10% menos por tarefa.',
          why: 'É a prova de que o ranking por preço de lista não prevê o ranking por custo real. O modelo mais caro, em esforço baixo, pode ser o mais barato por tarefa.',
          keys: 'Esforço baixo, benchmark de pesquisa, cauda de tarefas difíceis.',
          body: (t) => [
            c.p('A guia oficial de otimização de custo relata: em uma bateria de pesquisa profunda, o <strong class="text-purple-400">Fable 5 em esforço baixo venceu o Sonnet 5 custando cerca de 10% menos por tarefa</strong>. O modelo com o token mais caro terminou a tarefa mais barato, porque errou menos e precisou de menos passos.'),
            c.figure(t, svg.bars(t, { label: 'Ilustração: custo por tarefa em pesquisa profunda, Sonnet 5 contra Fable 5 em esforço baixo', aLabel: 'Sonnet 5 (padrão)', bLabel: 'Fable 5 (low)', max: 110, items: [
              { label: 'Custo por tarefa', a: 100, b: 90, aText: '100', bText: '~90' },
              { label: 'Qualidade', a: 90, b: 100, aText: 'menor', bText: 'maior' },
            ] }), 'Menos custo e mais qualidade ao mesmo tempo. Isso só aparece quando a unidade de medida é a tarefa concluída.'),
            c.data({ title: 'Outros números da mesma guia (pesquisa e conhecimento, Fable 5)', items: [
              '<strong>Esforço medium</strong> igualou a acurácia do padrão custando <strong>70% a 85%</strong> do preço.',
              '<strong>Esforço low</strong> perdeu 1 a 3 pontos e cortou <strong>um terço a metade</strong> do custo por tarefa.',
              'O padrão (high) não comprou nada mensurável acima de medium em nenhum dos quatro benchmarks medidos.',
              'Esforço baixo também é mais rápido: 4,5 contra 7,9 minutos por problema num benchmark de pesquisa.',
            ] }),
            c.alert({ title: 'Validade dos números', text: 'As medições são da Anthropic, com o Fable 5 (não o 5.1), em benchmarks específicos. Elas mostram o formato da curva, não o seu resultado. Sua tarefa pode se comportar diferente. Por isso o módulo 3.2 ensina a medir.' }),
          ],
        },
        {
          emoji: '🔁', title: 'A economia do assinante: parar de repetir', sub: 'Memória e busca em conversas cortam turnos',
          what: 'Para quem usa o aplicativo (plano fixo), a economia não é em dólares por token: é em cota de uso e tempo. Cada re-explicação de contexto é um turno gasto.',
          why: 'A maior parte do público do curso paga assinatura, não API. As ferramentas novas de memória e busca em conversas são a alavanca de economia deles.',
          keys: 'Cota de uso, turno, re-explicação, memória, busca em conversas.',
          body: (t) => [
            c.p('Se você paga assinatura, não paga por token. Mas paga em <strong class="text-purple-400">cota de mensagens e em tempo</strong>. Cada vez que você cola de novo o contexto do projeto, explica quem você é ou repete uma decisão antiga, gastou um turno que a memória e a busca em conversas poderiam ter poupado.'),
            c.steps(t, { title: 'Onde o assinante gasta sem perceber', items: [
              { h: 'Colar o contexto de novo', sub: 'Mil palavras a cada conversa nova', text: 'Com memória em arquivos, perfil e projeto entram sozinhos. A Trilha 2 mostrou como testar se isso está funcionando na sua conta.' },
              { h: 'Reexplicar uma decisão', sub: '"Como eu te disse antes..."', text: 'Com busca em conversas, "aquela decisão sobre o fornecedor" basta. Um turno em vez de três.' },
              { h: 'Pedir para encurtar', sub: '"Resume isso", "menos texto"', text: 'O prompt capturado já impõe brevidade e formatação mínima. Se você ainda pede para encurtar, está gastando turno em algo que o padrão já faz; peça o formato certo de primeira.' },
              { h: 'Refazer por falta de formato', sub: '"Não era isso que eu queria"', text: 'Um exemplo positivo curto no primeiro pedido (Trilha 2, módulo 2.3) evita o segundo pedido.' },
            ] }),
            c.code(t, { objective: 'Medir sua própria repetição por uma semana', lang: 'text', code: `Durante uma semana, a cada conversa nova com o Claude, anote:
- Quantas linhas de contexto você colou antes da primeira pergunta? <número>
- Quantas vezes escreveu "como eu disse", "lembra que", "de novo"? <número>
- Quantas vezes pediu "encurta" ou "refaz"? <número>

No fim da semana, some. Depois tente uma semana sem colar contexto (confiando na memória e na busca) e compare.`, verify: 'Se os números da segunda semana caíram sem perda de qualidade, a memória e a busca estão pagando a assinatura. Se não caíram, volte à Trilha 2 e veja qual teste falhou.' }),
          ],
        },
        {
          emoji: '🧮', title: 'Exercício: três tarefas suas, dois modelos', sub: 'Uma planilha de duas linhas por tarefa',
          what: 'Estimar o custo de três tarefas reais suas em dois modelos, contando tokens e tentativas, para ver qual sai mais barato por tarefa.',
          why: 'É o hábito que a trilha quer instalar: nunca decidir modelo pela tabela de preços; decidir pela conta da tarefa.',
          keys: 'Estimativa de tokens, tentativas, custo por tarefa, comparação.',
          body: (t) => [
            c.p('Escolha três tarefas que você faz com frequência. Para cada uma, estime tokens de entrada e saída e o número de tentativas que cada modelo costuma precisar. A conta é simples e o resultado costuma surpreender.'),
            c.code(t, { objective: 'Planilha mínima de custo por tarefa (copie para uma planilha ou faça à mão)', lang: 'text', code: `Tarefa: <ex.: resumo de relatório de 10 páginas para a diretoria>
Tokens de entrada estimados: <ex.: 8.000>   (≈ 700 palavras por mil tokens)
Tokens de saída estimados:   <ex.: 600>

Modelo A: <Fable 5.1, esforço low>
  custo = 8.000/1M × $10 + 600/1M × $50 = $0,08 + $0,03 = $0,11 por tentativa
  tentativas típicas: <1>   →   custo por tarefa: $0,11

Modelo B: <Sonnet 5>
  custo = 8.000/1M × $2 + 600/1M × $10 = $0,016 + $0,006 = $0,022 por tentativa
  tentativas típicas: <2, porque costuma precisar de correção>   →   custo por tarefa: $0,044

Vencedor nesta tarefa: <B, por 2,5x>   Observação: <B ainda ganha mesmo com retrabalho>`, verify: 'Repita para as três tarefas. Se o modelo barato ganhou nas três mesmo contando tentativas, ele é o certo para elas. Se o caro em esforço baixo ganhou em alguma, você achou uma tarefa onde a tabela de preços mente.' }),
            c.concept(t, { title: 'O que este exercício ensina', emoji: '🎯', bullets: [
              'A saída pesa mais que a entrada: 600 tokens de saída no Fable custam mais que 8.000 de entrada no Sonnet.',
              'O raciocínio interno é saída cobrada. Esforço alto gera mais raciocínio; esforço baixo, menos. É por isso que esforço é a primeira alavanca.',
              'Tentativas multiplicam tudo. Um modelo que acerta de primeira tem uma vantagem escondida.',
            ] }),
          ],
        },
        {
          emoji: '🥈', title: 'Onde o mais barato ganha', sub: 'Código, volume e o que dá para checar',
          what: 'Casos medidos em que o modelo mais barato entregou o mesmo ou quase: Opus 5 empatou com Fable 5 em código a 60% do custo; Haiku a um décimo do custo com acurácia menor.',
          why: 'Uma trilha de economia que só defende o modelo caro não merece confiança. Estes são os casos em que descer de modelo é a decisão certa.',
          keys: 'Saturação, subconjunto de código, alto volume, saída checável.',
          body: (t) => [
            c.p('A mesma guia de custo da Anthropic mostra o outro lado. Em um subconjunto de código onde os dois modelos já acertam quase tudo, o <strong class="text-purple-400">Opus 5 igualou o Fable 5 (91,7% contra 91,3%) custando cerca de 60%</strong>. Quando a tarefa satura, o modelo mais caro não tem onde ganhar.'),
            c.table(t, { headers: ['Situação', 'Medição publicada', 'Decisão'], rows: [
              ['Código onde ambos acertam quase tudo', 'Opus 5: 91,7% · Fable 5: 91,3% · custo do Opus ≈ 60%', 'Desça para o Opus 5.'],
              ['Perguntas de conhecimento em alto volume', 'Haiku 4.5: 63% de acerto a 1/10 do custo do Opus 5 (92%)', 'Haiku, se você consegue checar a saída e o erro é barato.'],
              ['Loop longo com agentes', 'Modelos pequenos perdem na cauda de tarefas difíceis', 'Não desça; a economia se perde em falhas.'],
              ['Pesquisa profunda', 'Fable 5 em low venceu Sonnet 5 por 10% menos', 'Fable em esforço baixo.'],
            ] }),
            c.figure(t, svg.split(t, { label: 'Quando descer de modelo e quando não descer', bridge: 'a régua é a tarefa', left: { title: 'Desça de modelo', items: ['Ambos saturam (acertam quase tudo)', 'Alto volume, saída checável', 'Erro é barato de corrigir', 'Você mediu e a curva é plana'] }, right: { title: 'Não desça', items: ['Loop longo com muitas etapas', 'Cauda de tarefas difíceis pesa', 'Erro é caro ou invisível', 'Você ainda não mediu'] } }), 'Descer de modelo é a última alavanca, não a primeira. Antes dela vêm cache e esforço (módulo 3.2). E a decisão é sempre por tarefa, com medição.'),
            c.tip({ title: 'Recomendação padrão da própria Anthropic', text: 'Para a maioria dos fluxos com agentes, comece com o Opus 5. Reserve o Fable 5.1 para o trabalho de raciocínio mais exigente e de horizonte longo. E lembre: em Claude Code e API, o modelo padrão sugerido para novos projetos é o Opus 5, não o Fable.' }),
          ],
        },
      ],
      quiz: [
        { q: 'Por token, o Fable 5.1 custa quanto em relação ao Opus 5?', options: ['O mesmo.', 'O dobro (10/50 contra 5/25 por milhão).', 'A metade.'], answer: 1, why: 'Fable: $10 entrada / $50 saída. Opus 5: $5 / $25. A premissa honesta da trilha é que, por token, Fable é mais caro.' },
        { q: 'Um modelo barato que precisa de duas tentativas em média, comparado a um 5x mais caro que acerta de primeira em esforço baixo (metade do custo):', options: ['O barato sempre ganha.', 'Depende: com 2 tentativas o barato custa 2x; o caro em low custa 2,5x. Quase empate; a qualidade decide.', 'O caro sempre ganha.'], answer: 1, why: 'Tentativas multiplicam o preço de lista. É por isso que a unidade certa é custo por tarefa concluída.' },
        { q: 'Em qual caso medido o modelo mais barato entregou praticamente o mesmo resultado?', options: ['Pesquisa profunda.', 'Código onde ambos já acertam quase tudo (Opus 5 a 60% do custo do Fable 5).', 'Loop longo com agentes.'], answer: 1, why: 'Quando a tarefa satura, o modelo caro não tem onde ganhar. Descer de modelo é a decisão certa ali.' },
      ],
      summary: [
        ['Tabela de preços', 'Fable 10/50, Opus 5 5/25, Sonnet 5 2/10, Haiku 1/5 dólares por milhão. Por token, Fable é o mais caro.'],
        ['Custo por tarefa', 'tokens × preço × tentativas, mais retrabalho. A tabela não prevê o ranking.'],
        ['Fable em low venceu Sonnet', 'em pesquisa profunda, por 10% menos por tarefa. Medium igualou o padrão a 70–85% do custo.'],
        ['Economia do assinante', 'memória e busca em conversas cortam turnos de re-explicação. Meça por uma semana.'],
        ['Exercício de três tarefas', 'estime tokens e tentativas em dois modelos; decida por tarefa.'],
        ['Onde o barato ganha', 'código saturado (Opus a 60%), alto volume checável (Haiku). Não em loop longo.'],
      ],
    },

    // ================= 3.2 =================
    {
      id: '3-2', emoji: '🎚️', title: 'Esforço, falhas e a cauda', punch: 'O primeiro botão antes de trocar de modelo', minutes: 45, level: 'Intermediário', kind: 'Prática',
      lead: 'Esforço (effort) é a primeira alavanca de custo que troca capacidade por dinheiro. Depois vem a política de "rodar barato e refazer só o que falhou". E a lição mais contra-intuitiva: a conta é decidida pelas tarefas difíceis, não pelas típicas.',
      topics: [
        {
          emoji: '🎛️', title: 'Esforço é o primeiro botão', sub: 'O que ele controla e por que vem antes do modelo',
          what: 'Um parâmetro (low, medium, high, xhigh, max) que controla quanto o modelo pensa e quantas chamadas de ferramenta faz, sem trocar de modelo.',
          why: 'Troca capacidade por custo dentro do mesmo modelo. Trocar de modelo muda o teto de inteligência; esforço não. Por isso é testado primeiro.',
          keys: 'effort, output_config, profundidade de raciocínio, chamadas de ferramenta.',
          body: (t) => [
            c.p('No Fable 5.1 o raciocínio interno está sempre ligado. O que você controla é a <strong class="text-purple-400">profundidade</strong>, com o parâmetro de esforço. Ele escala quanto o modelo pensa e quantas ferramentas chama. Custa saída (que é a parte cara), mas não muda o modelo.'),
            c.table(t, { headers: ['Nível', 'Quando faz sentido', 'Efeito típico'], rows: [
              ['low', 'Subagentes, tarefas simples, alto volume, latência importa', 'Menos chamadas de ferramenta, menos preâmbulo, confirmações curtas'],
              ['medium', 'Passo de economia onde a qualidade se mantém', 'Em pesquisa, igualou o padrão a 70–85% do custo'],
              ['high (padrão)', 'Trabalho sensível a inteligência', 'Equilíbrio entre qualidade e eficiência'],
              ['xhigh', 'Código e agentes de longo horizonte (padrão do Claude Code)', 'Mais uso de ferramentas, mais profundidade'],
              ['max', 'Quando acertar importa mais que custar', 'Só depois de medir que há ganho acima de xhigh'],
            ] }),
            c.figure(t, svg.flow(t, { label: 'Ordem das alavancas de custo, da mais barata para a mais arriscada', steps: [
              { title: 'Ganhos grátis', sub: 'cache, higiene|de tokens' }, { title: 'Esforço', sub: 'primeiro trade-off' }, { title: 'Orçamento de tarefa', sub: 'teto advisório' }, { title: 'Trocar de modelo', sub: 'por último, medindo' },
            ] }), 'Esforço é o primeiro passo que troca qualidade por custo. Modelo é o último, porque muda o teto de inteligência e reseta o cache.'),
            c.alert({ title: 'Regra que não pode ser quebrada', text: 'Varra o esforço no modelo atual antes de descer de modelo. Se em esforço baixo a tarefa ainda passa, aí sim desça um degrau, redefina o esforço para o padrão daquele modelo e varra de novo. Uma alavanca por vez.' }),
          ],
        },
        {
          emoji: '📉', title: 'Curva plana: pesquisa e conhecimento', sub: 'Quando descer de nível quase não custa',
          what: 'Em trabalho de pesquisa e conhecimento, as curvas medidas são quase planas: medium igualou o padrão por 70–85% do custo; low perdeu 1 a 3 pontos por um terço a metade do custo.',
          why: 'É onde a economia é maior e mais segura. Se seu trabalho é ler, resumir, comparar e responder, provavelmente sua curva é essa.',
          keys: 'Curva plana, medium, low, 70–85%, um terço a metade.',
          body: (t) => [
            c.figure(t, svg.curve(t, { label: 'Curva quase plana de pesquisa e conhecimento: custo cai muito, qualidade quase não cai', yLabel: 'relativo ao padrão (100)', xLabels: ['low', 'medium', 'high (padrão)'], series: [
              { name: 'qualidade', values: [97, 100, 100], texts: ['-1 a -3', 'igual', '100'] },
              { name: 'custo', values: [55, 78, 100], texts: ['50–66%', '70–85%', '100%'] },
            ] }), 'A linha de qualidade quase não se mexe; a de custo despenca. Este é o formato de curva em que você deve descer de nível sem medo.'),
            c.data({ title: 'Medições publicadas (Fable 5, pesquisa e conhecimento)', items: [
              '<strong>medium</strong>: mesma acurácia do padrão em quatro benchmarks, a 70% a 85% do custo.',
              '<strong>low</strong>: 1 a 3 pontos a menos, um terço a metade a menos de custo por tarefa.',
              'O padrão não comprou nada mensurável acima de medium em nenhum dos quatro.',
              'Tempo: 4,5 minutos por problema em low contra 7,9 no padrão, num benchmark de pesquisa.',
            ] }),
            c.code(t, { objective: 'Varredura mínima de esforço para uma tarefa sua de pesquisa (Claude Code ou API)', lang: 'text', code: `1. Escolha 10 pedidos reais de pesquisa/resumo que você faz (inclua 2 difíceis).
2. Rode os 10 em esforço LOW, em sessão separada. Anote custo (ou tokens) e se a resposta serviu.
3. Rode os mesmos 10 em MEDIUM, sessão separada. Anote.
4. Rode em HIGH. Anote.
5. Monte a tabela: nível | serviu (de 10) | custo médio.
Leia: se "serviu" for igual em low e high, a curva é plana. Fique no low.`, verify: 'Diferenças de uma ou duas respostas são ruído numa rodada só. Se a decisão estiver apertada, repita a rodada nos dois níveis em disputa antes de decidir.' }),
          ],
        },
        {
          emoji: '📈', title: 'Curva íngreme: código longo', sub: 'Quando cada nível abaixo custa pontos reais',
          what: 'Em código de horizonte longo, a troca é real: no Opus 5, medium perdeu cerca de 2 pontos por metade do custo, e low perdeu cerca de 8 pontos por um quarto.',
          why: 'Saber que a curva é íngreme evita cortar esforço onde isso destrói o resultado. E abre a alternativa do módulo seguinte.',
          keys: 'Curva íngreme, 2 pontos por metade, 8 pontos por um quarto, teto de raciocínio.',
          body: (t) => [
            c.figure(t, svg.curve(t, { label: 'Curva íngreme de código longo: o custo cai, mas a qualidade cai junto', yLabel: 'relativo ao padrão (100)', xLabels: ['low', 'medium', 'high (padrão)'], series: [
              { name: 'qualidade', values: [92, 98, 100], texts: ['-8 pts', '-2 pts', '100'] },
              { name: 'custo', values: [25, 50, 100], texts: ['25%', '50%', '100%'] },
            ] }), 'Aqui a qualidade acompanha o custo para baixo. Cortar para low economiza três quartos, mas perde oito pontos. Se oito pontos são falhas que você precisa consertar à mão, não valeu.'),
            c.data({ title: 'Medições publicadas', items: [
              '<strong>Código de horizonte longo (Opus 5)</strong>: medium perdeu ~2 pontos por metade do custo; low perdeu ~8 pontos por um quarto.',
              '<strong>Trabalho no teto de raciocínio</strong> (pesquisa profunda com vários subtemas): cada degrau de esforço comprou ~2,4 pontos de rubrica. Não há corte grátis nessa curva.',
            ] }),
            c.grid2(t, { okTitle: 'Sinais de que sua tarefa tem curva íngreme', ok: ['Muitas etapas encadeadas, uma depende da outra.', 'Erros só aparecem no fim (teste que quebra, arquivo que não abre).', 'A tarefa difícil é a regra, não a exceção.'], badTitle: 'Sinais de curva plana', bad: ['Ler, resumir, comparar, classificar.', 'Cada pedido é independente.', 'Você consegue julgar a resposta em segundos.'] }),
            c.tip({ title: 'Inclua a tarefa difícil na varredura', text: 'Curvas são mais planas em tarefas fáceis. É na cauda difícil que o esforço alto paga o próprio custo. Se sua amostra só tem tarefas fáceis, ela vai dizer que tudo é plano, e você vai descobrir a curva íngreme em produção.' }),
          ],
        },
        {
          emoji: '♻️', title: 'Rode barato e refaça só o que falhou', sub: 'Mesma taxa de acerto por metade do custo',
          what: 'Uma política: rodar tudo em esforço baixo e refazer no padrão apenas as tarefas que falharam num verificador. Em código, deu 93% de acerto a $0,70 por tarefa contra 91,7% a $1,39 rodando tudo no padrão.',
          why: 'É o jeito de ter economia mesmo em curva íngreme. Só funciona se você tem um sinal de falha (teste, validador, checador).',
          keys: 'Política de re-execução, sinal de falha, verificador, custo contando as tentativas falhas.',
          body: (t) => [
            c.p('Se a curva é íngreme mas você <strong class="text-purple-400">consegue detectar quando falhou</strong> (um teste, um validador de formato, um checador), existe uma saída: rode tudo em baixo e refaça no padrão só o que falhou.'),
            c.figure(t, svg.flow(t, { label: 'Política de rodar barato e refazer só o que falhou', steps: [
              { title: 'Rode em LOW', sub: 'todas as tarefas' }, { title: 'Verifique', sub: 'teste / validador' }, { title: 'Falhou?', sub: 'refaça no PADRÃO' }, { title: 'Some o custo', sub: 'incluindo as falhas' },
            ] }), 'O custo final inclui as tentativas baratas que falharam. Mesmo assim, nas medições publicadas, ficou pela metade.'),
            c.table(t, { headers: ['Política', 'Taxa de acerto', 'Custo por tarefa'], rows: [
              ['Tudo no padrão', '91,7%', '$1,39'],
              ['Tudo em low, refazer falhas no padrão', '~93%', '~$0,70'],
              ['Tudo em medium, refazer falhas no padrão', '~94%', '~$0,95'],
            ], caption: 'Medições da Anthropic em código. Use para a economia, não para o ganho de acerto; e conte o custo do verificador e o tempo dobrado nas falhas.' }),
            c.code(t, { objective: 'Molde de verificador simples para a política (exemplo com um arquivo gerado)', lang: 'bash', code: `# 1) tarefa em esforço baixo gera saida.json
# 2) verificador: o arquivo existe, é JSON válido e tem os campos exigidos?
python3 - <<'EOF'
import json, sys
try:
    d = json.load(open("saida.json"))
    faltando = [k for k in ("titulo", "resumo", "data") if k not in d]
    sys.exit(1 if faltando else 0)
except Exception:
    sys.exit(1)
EOF
# 3) se saiu com código 1, refaça a tarefa no esforço padrão`, verify: 'Rode em 10 tarefas. Conte quantas falharam no low e foram refeitas. Some o custo das duas etapas e compare com rodar as 10 direto no padrão.' }),
          ],
        },
        {
          emoji: '🦎', title: 'Precifique a cauda, não a mediana', sub: 'Duas tarefas em vinte levaram 43% do gasto',
          what: 'Na tarefa típica todos os modelos parecem iguais e o barato parece melhor. A conta é decidida pelas tarefas difíceis: numa rodada de 20 problemas de pesquisa, 2 carregaram 43% do gasto.',
          why: 'É a lição mais contra-intuitiva de custo. Quem compara pela mediana escolhe o modelo errado.',
      keys: 'Cauda, mediana, 10% mais difíceis, concentração de gasto.',
          body: (t) => [
            c.p('Compare modelos na <strong class="text-purple-400">décima parte mais difícil</strong> do seu trabalho. Na tarefa típica todos parecem parecidos e o mais barato parece o melhor; a conta é decidida pelas tarefas que o modelo barato erra. E mesmo sem falha nenhuma, a cauda concentra o gasto.'),
            c.figure(t, svg.donut(t, { label: 'Concentração de gasto numa rodada de 20 problemas de pesquisa', center: '43%|em 2 de 20 problemas', parts: [
              { title: '2 problemas difíceis', sub: '43% do gasto total', value: 43 },
              { title: 'Os outros 18', sub: '57% do gasto', value: 57 },
            ] }), 'Dois problemas em vinte consumiram quase metade do dinheiro. Se você só olhasse a mediana, nunca veria isso.'),
            c.steps(t, { title: 'Como precificar a cauda', items: [
              { h: 'Identifique os 10% mais difíceis', sub: 'Do seu fluxo real', text: 'Quais tarefas mais demoram, mais voltam com erro, mais exigem correção? Liste-as. São elas que vão decidir.' },
              { h: 'Rode só essas nos candidatos', sub: 'Modelo A × modelo B', text: 'Não gaste amostra com as fáceis. Nas fáceis todo mundo passa.' },
              { h: 'Conte custo e falhas na cauda', sub: 'Aqui aparece a diferença', text: 'Um modelo barato que falha em 3 das 5 difíceis custou 3 refações. Some.' },
              { h: 'Decida pela cauda', sub: 'Não pela média', text: 'Se o modelo mais caro vence na cauda e empata no resto, ele é mais barato no total, porque a cauda é onde o dinheiro está.' },
            ] }),
          ],
        },
        {
          emoji: '📏', title: 'Regras de medição que evitam decisão errada', sub: 'Uma alavanca por vez, nunca por uma rodada só',
          what: 'As disciplinas de medição da guia oficial: varredura com células idênticas exceto o esforço, sessões separadas, tarefa difícil incluída, repetição quando a diferença é pequena, uma alavanca por diff.',
          why: 'Uma medição mal feita é pior que nenhuma: ela dá confiança em algo errado.',
          keys: 'Célula idêntica, sessão separada, ruído, repetição, uma alavanca por vez.',
          body: (t) => [
            c.grid2(t, { okTitle: 'Faça', ok: ['Células idênticas exceto o esforço; mesmo modelo; mesma ordem de pedidos.', 'Um nível por sessão. Complete todos os pedidos num nível antes de ir ao próximo.', 'Inclua uma tarefa difícil que você conhece.', 'Repita a rodada quando a diferença for de uma ou duas tarefas.', 'Aplique uma alavanca por vez, meça, mantenha ou reverta.'], badTitle: 'Não faça', bad: ['Trocar esforço no meio da sessão (invalida cache, distorce).', 'Decidir por uma rodada só quando está apertado.', 'Amostra só de tarefas fáceis.', 'Aplicar cache + esforço + modelo juntos e não saber o que ajudou.', 'Guardar uma alavanca que economizou mas devolveu acurácia: isso não é otimização.'] }),
            c.figure(t, svg.flow(t, { label: 'Ciclo de aplicar, medir, manter ou reverter, uma alavanca por vez', steps: [
              { title: 'Aplique 1 alavanca', sub: 'só ela' }, { title: 'Meça', sub: 'acerto e custo|por tarefa' }, { title: 'Compare', sub: 'com a config anterior' }, { title: 'Mantenha ou reverta', sub: 'e registre o porquê' },
            ] }), 'A ordem de aplicação é sempre cache, esforço, orçamento, modelo. O ranking de economia decide o que entra; a ordem decide a sequência.'),
            c.concept(t, { title: 'Receita mínima de avaliação (para quem não tem nenhuma)', emoji: '🧪', bullets: [
              '<strong>Entradas</strong>: 20 a 30 pedidos reais, congelados. Toda configuração roda o mesmo conjunto.',
              '<strong>Julgamento</strong>: o mais barato que sirva: resposta-gabarito, uma rubrica curta que você pontua, ou um checador automático (teste passa, JSON válido).',
              '<strong>Executor</strong>: um roteiro que roda o conjunto numa configuração, grava saída e uso de tokens, e reporta acerto e custo por tarefa.',
              '<strong>Aprovação</strong>: estime o custo (entradas × configurações × custo por tarefa) antes de rodar.',
            ] }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual é a ordem correta das alavancas de custo, da primeira para a última?', options: ['Trocar de modelo, depois esforço, depois cache.', 'Cache e higiene de tokens, depois esforço, depois orçamento de tarefa, depois trocar de modelo.', 'Esforço, depois modelo, depois cache.'], answer: 1, why: 'Ganhos grátis primeiro. Esforço é o primeiro trade-off. Modelo vem por último porque muda o teto de inteligência e reseta o cache.' },
        { q: 'Sua tarefa é código longo com curva íngreme, mas você tem testes automatizados. Qual política economiza?', options: ['Rodar tudo em low e aceitar a perda.', 'Rodar tudo em low e refazer no padrão só o que falhou nos testes.', 'Rodar tudo em max.'], answer: 1, why: 'Nas medições publicadas: 93% a $0,70 contra 91,7% a $1,39. Exige um sinal de falha confiável.' },
        { q: 'Por que comparar modelos pela mediana das tarefas leva a erro?', options: ['A mediana é difícil de calcular.', 'Na tarefa típica todos parecem iguais; a conta é decidida pela cauda difícil, onde o barato falha e o gasto se concentra.', 'Não leva a erro.'], answer: 1, why: 'Dois problemas em vinte carregaram 43% do gasto numa rodada medida. A cauda decide.' },
      ],
      summary: [
        ['Esforço primeiro', 'troca capacidade por custo no mesmo modelo. Varra antes de trocar de modelo.'],
        ['Curva plana', 'pesquisa e conhecimento: medium igual ao padrão a 70–85%; low perde 1–3 pontos por metade.'],
        ['Curva íngreme', 'código longo: medium perde 2 pontos por metade; low perde 8 por um quarto. Inclua a tarefa difícil.'],
        ['Rode barato, refaça falhas', '93% a $0,70 contra 91,7% a $1,39. Precisa de verificador.'],
        ['Precifique a cauda', '2 de 20 problemas levaram 43% do gasto. Compare nos 10% mais difíceis.'],
        ['Meça direito', 'células idênticas, sessão separada, repetição no empate, uma alavanca por vez.'],
      ],
    },

    // ================= 3.3 =================
    {
      id: '3-3', emoji: '🔧', title: 'Alavancas do 5.1 para quem usa a API', punch: 'Opcional: cache, esforço por mensagem, orçamento, lote', minutes: 50, level: 'Avançado', kind: 'Prática',
      lead: 'Módulo opcional para quem programa contra a API. O Fable 5.1 trouxe leitura de cache a um quarto de centavo por mil tokens, troca de esforço sem resetar o cache, orçamento de tarefa e fallbacks. A ordem de aplicação continua a mesma: cache, esforço, orçamento, modelo.',
      topics: [
        {
          emoji: '🧭', title: 'A ordem das alavancas e o que mudou no 5.1', sub: 'Cache, esforço, orçamento, modelo, e as novidades',
          what: 'Um mapa das alavancas de custo da API, na ordem em que a guia oficial manda aplicar, marcando o que é novo no Fable 5.1.',
          why: 'Quem aplica fora de ordem não sabe o que ajudou e perde cache no caminho.',
          keys: 'Cache de prompt, effort, task_budget, batch, fallbacks, ordem de aplicação.',
          body: (t) => [
            c.glossary(t, [
              ['API', 'A interface para programas chamarem o Claude diretamente, pagando por token. Diferente do aplicativo por assinatura.'],
              ['Cache de prompt', 'Reaproveitar a parte do pedido que não muda (prompt de sistema, documentos fixos) para não pagar por ela de novo a preço cheio.'],
              ['Orçamento de tarefa', 'Um teto de tokens que o modelo enxerga e usa para se organizar, diferente do limite duro de saída.'],
              ['Lote (batch)', 'Enviar muitos pedidos de uma vez, sem pressa, pela metade do preço.'],
            ]),
            c.figure(t, svg.flow(t, { label: 'Ordem de aplicação das alavancas de custo na API', steps: [
              { title: '1. Cache', sub: 'prefixo estável|leitura barata' }, { title: '2. Esforço', sub: 'low → max|por rota' }, { title: '3. Orçamento', sub: 'task_budget|advisório' }, { title: '4. Lote e fallback', sub: 'batch 50%|refusal fallback' }, { title: '5. Modelo', sub: 'por último|medindo' },
            ] }), 'Cada passo é medido antes do próximo. Trocar de modelo por último, porque reseta o cache e muda o teto.'),
            c.table(t, { headers: ['Alavanca', 'Novidade no Fable 5.1', 'Efeito'], rows: [
              ['Cache de prompt', 'Leitura de cache a <strong>$0,25 por milhão</strong> de tokens', 'Prefixo repetido custa 1/40 do preço de entrada'],
              ['Esforço', 'Troca de esforço <strong>por mensagem</strong> sem resetar o cache (beta)', 'Baixa o esforço no meio da conversa sem perder o prefixo cacheado'],
              ['Orçamento de tarefa', 'Disponível (beta), mínimo 20.000 tokens', 'Modelo se organiza dentro do teto: -18% por -2,7 pontos; -47% por -4,4'],
              ['Fallbacks', 'Roteamento server-side por categoria de recusa', 'Em recusa de segurança, outro modelo responde sem código extra'],
              ['Lote', 'Igual: 50% do preço', 'Para tudo que não precisa de resposta imediata'],
            ] }),
          ],
        },
        {
          emoji: '🗄️', title: 'Cache de prompt: o ganho grátis', sub: 'Prefixo estável e a leitura a $0,25',
          what: 'Colocar o conteúdo que não muda (prompt de sistema, ferramentas, documentos fixos) no início do pedido e marcar um ponto de cache. No 5.1 a leitura custa $0,25 por milhão.',
          why: 'É a única alavanca que não troca qualidade por nada. E é a mais fácil de quebrar sem perceber.',
          keys: 'Prefixo, cache_control, invalidador silencioso, cache_read_input_tokens.',
          body: (t) => [
            c.p('O cache funciona por <strong class="text-purple-400">prefixo</strong>: qualquer byte que mude no início invalida tudo que vem depois. A ordem de renderização é ferramentas, depois prompt de sistema, depois mensagens. Coloque o que é estável primeiro e o que varia (data, identificador do pedido, a pergunta) depois do último ponto de cache.'),
            c.code(t, { objective: 'Forma do pedido com ponto de cache no prompt de sistema (corpo da requisição, independente de linguagem)', lang: 'json', code: `{
  "model": "claude-fable-5-1",
  "max_tokens": 16000,
  "system": [
    {
      "type": "text",
      "text": "<seu prompt de sistema longo e ESTÁVEL: sem data, sem id de pedido>",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [
    { "role": "user", "content": "<a pergunta que varia>" }
  ]
}`, verify: 'Na resposta, olhe usage.cache_read_input_tokens. Na primeira chamada é zero (escrita). Da segunda em diante, com o mesmo prefixo, deve ser grande. Se continuar zero, há um invalidador silencioso: data no prompt, JSON sem ordenação fixa, lista de ferramentas que muda.' }),
            c.grid2(t, { okTitle: 'Mantém o cache', ok: ['Prompt de sistema congelado, sem hora ou data.', 'Lista de ferramentas na mesma ordem sempre.', 'Documentos fixos antes do ponto de cache; pergunta depois.', 'Instrução nova no meio da conversa como mensagem de sistema no array, não editando o topo.'], badTitle: 'Quebra o cache sem avisar', bad: ['"Hoje é {data}" no prompt de sistema.', 'JSON com chaves em ordem aleatória.', 'Conjunto de ferramentas que varia por pedido.', 'Editar o prompt de sistema do topo para trocar o esforço.'] }),
            c.tip({ title: 'Prefixo mínimo', text: 'Prefixos curtos demais não são cacheados (o mínimo varia por modelo, de algumas centenas a alguns milhares de tokens). Se seu prompt de sistema é pequeno, junte a ele os documentos de referência estáveis para passar do mínimo.' }),
          ],
        },
        {
          emoji: '🔀', title: 'Esforço por mensagem sem resetar o cache', sub: 'Novidade do 5.1',
          what: 'Uma mensagem de sistema com conteúdo vazio e um novo esforço, inserida no meio da conversa, muda o esforço dali em diante sem invalidar o prefixo cacheado.',
          why: 'Antes, trocar o esforço no topo do pedido resetava o cache. Agora dá para começar alto e baixar quando a tarefa fica rotineira, mantendo o cache.',
          keys: 'Mensagem de sistema no array, content vazio, output_config.effort, beta.',
          body: (t) => [
            c.p('No Fable 5.1, no Mythos 5.1 e no Opus 5, você pode acrescentar ao array de mensagens uma <strong class="text-purple-400">mensagem de sistema com conteúdo vazio</strong> carregando só o novo esforço. O prefixo anterior continua cacheado.'),
            c.code(t, { objective: 'Baixar o esforço a partir de um ponto da conversa (beta; cabeçalho de beta necessário)', lang: 'json', code: `// cabeçalho HTTP:  anthropic-beta: mid-conversation-output-config-2026-07-01
{
  "model": "claude-fable-5-1",
  "max_tokens": 16000,
  "output_config": { "effort": "high" },
  "system": [ { "type": "text", "text": "<prompt estável>", "cache_control": { "type": "ephemeral" } } ],
  "messages": [
    { "role": "user", "content": "<pedido difícil 1>" },
    { "role": "assistant", "content": "<resposta 1>" },
    { "role": "system", "content": [], "output_config": { "effort": "low" } },
    { "role": "user", "content": "<pedido rotineiro 2>" }
  ]
}`, verify: 'Compare usage.cache_read_input_tokens antes e depois da mensagem de esforço: não deve cair. E a resposta ao pedido 2 deve vir mais curta e rápida.' }),
            c.alert({ title: 'Regras de colocação', text: 'A mensagem de esforço (conteúdo vazio) pode ficar em qualquer posição. Uma mensagem de sistema com TEXTO no meio da conversa tem regras: deve vir depois de uma mensagem de usuário e ser a última ou ser seguida por um turno do assistente; não pode ser a primeira. Sonnet 5 não suporta mensagens de sistema no meio.' }),
          ],
        },
        {
          emoji: '🎯', title: 'Orçamento de tarefa', sub: 'O modelo enxerga o teto e se organiza',
          what: 'Um teto de tokens para um laço com agentes que o modelo vê durante a geração, diferente do limite duro de saída. Mínimo 20.000. Beta.',
          why: 'Reduz custo com perda controlada: -18% por -2,7 pontos num orçamento folgado; -47% por -4,4 no mais apertado permitido.',
          keys: 'task_budget, advisório, p90, streaming, invalida cache se mudar.',
          body: (t) => [
            c.p('O limite de saída (<code>max_tokens</code>) corta o modelo sem aviso. O <strong class="text-purple-400">orçamento de tarefa</strong> é diferente: o servidor injeta um contador que o modelo enxerga, e ele passa a se organizar para terminar dentro do teto. É advisório, não uma parede.'),
            c.code(t, { objective: 'Pedido com orçamento de tarefa (beta; use streaming por causa do max_tokens grande)', lang: 'json', code: `// cabeçalho HTTP:  anthropic-beta: task-budgets-2026-03-13
{
  "model": "claude-fable-5-1",
  "max_tokens": 128000,
  "stream": true,
  "output_config": {
    "effort": "high",
    "task_budget": { "type": "tokens", "total": 64000 }
  },
  "messages": [ { "role": "user", "content": "<tarefa longa com critério de pronto>" } ],
  "tools": [ ... ]
}`, verify: 'Some usage.output_tokens ao longo do laço. Compare com o mesmo laço sem orçamento. Nas medições publicadas: orçamento folgado deu -18% de custo por -2,7 pontos; o mais apertado, -47% por -4,4 pontos.' }),
            c.steps(t, { title: 'Como escolher o número', items: [
              { h: 'Meça o p90 do seu laço', sub: 'Sem orçamento', text: 'Rode a tarefa algumas vezes e veja quantos tokens a nona de cada dez consome. Esse é o ponto de partida.' },
              { h: 'Defina e aperte', sub: 'Uma vez, no primeiro pedido', text: 'Mudar o orçamento no meio invalida o cache. Defina antes de começar. Depois aperte em rodadas separadas.' },
              { h: 'Verifique aderência', sub: 'É advisório', text: 'O modelo tende a respeitar, mas não é garantido. Orçamentos muito apertados podem gerar comportamento parecido com recusa.' },
            ] }),
          ],
        },
        {
          emoji: '📦', title: 'Lote pela metade e fallbacks', sub: 'O que não tem pressa e o que pode ser recusado',
          what: 'O endpoint de lotes processa pedidos sem pressa a 50% do preço. Os fallbacks server-side redirecionam para outro modelo quando o Fable 5.1 recusa por categoria de segurança.',
          why: 'Lote é a maior economia bruta para trabalho assíncrono. Fallback evita código defensivo e mantém a taxa de conclusão.',
          keys: 'Batches, custom_id, resultado fora de ordem, stop_reason refusal, fallbacks default.',
          body: (t) => [
            c.p('Duas alavancas de operação. A primeira é para tudo que <strong class="text-purple-400">não precisa de resposta agora</strong>: classificação noturna, geração de relatórios, extração de milhares de documentos. A segunda é para o Fable 5.1 especificamente, que pode declinar um pedido por classificador de segurança.'),
            c.code(t, { objective: 'Forma de um lote (batch): muitos pedidos, metade do preço, resultado em qualquer ordem', lang: 'json', code: `// POST /v1/messages/batches
{
  "requests": [
    { "custom_id": "doc-001", "params": { "model": "claude-fable-5-1", "max_tokens": 2000,
        "messages": [ { "role": "user", "content": "<pedido 1>" } ] } },
    { "custom_id": "doc-002", "params": { "model": "claude-fable-5-1", "max_tokens": 2000,
        "messages": [ { "role": "user", "content": "<pedido 2>" } ] } }
  ]
}
// depois: consultar processing_status até "ended" e ler os resultados POR custom_id`, verify: 'Os resultados chegam em qualquer ordem: nunca use a posição, sempre o custom_id. O custo aparece pela metade do preço de lista.' }),
            c.code(t, { objective: 'Fallback server-side por categoria de recusa (beta) — recomendado por padrão no Fable 5.1', lang: 'json', code: `// cabeçalho HTTP:  anthropic-beta: server-side-fallback-2026-07-01
{
  "model": "claude-fable-5-1",
  "max_tokens": 16000,
  "fallbacks": "default",
  "messages": [ { "role": "user", "content": "<pedido>" } ]
}
// Sempre checar stop_reason antes de ler content:
// "refusal" traz stop_details.category (ex.: "cyber", "bio") e explicação.`, verify: 'Envie um pedido que costume ser declinado e observe: com fallbacks, a resposta vem de outro modelo em vez de um stop_reason "refusal". Sem fallbacks, você precisa tratar a recusa no seu código.' }),
            c.alert({ title: 'Outras regras do 5.1 que afetam código antigo', text: 'Forçar uso de ferramenta (tool_choice "any" ou "tool") devolve erro 400: use "auto" com instrução no prompt, ou saída estruturada. Preenchimento prévio da resposta do assistente também devolve 400. Blocos de raciocínio são presos ao modelo que os produziu e histórico editado invalida raciocínio anterior: mantenha o histórico só acrescentando.' }),
          ],
        },
        {
          emoji: '📐', title: 'Medir na API: o mínimo que funciona', sub: 'Vinte pedidos, um executor, custo por tarefa',
          what: 'A receita mínima de avaliação para quem programa: pedidos congelados, julgamento barato, executor que grava uso de tokens, e aprovação de custo antes de rodar.',
          why: 'Sem medição, toda alavanca vira aposta. Com vinte pedidos e um roteiro, você tem decisão.',
          keys: 'Eval mínimo, usage, custo por tarefa, uma alavanca por diff.',
          body: (t) => [
            c.steps(t, { title: 'Os quatro pedaços', items: [
              { h: 'Entradas congeladas', sub: '20 a 30 pedidos reais', text: 'Tirados dos seus logs ou escritos por você. Inclua os difíceis. Toda configuração roda exatamente o mesmo conjunto.' },
              { h: 'Julgamento barato', sub: 'O mais simples que sirva', text: 'Gabarito para comparar, rubrica curta que você pontua, ou checador automático (teste passa, JSON válido, campos presentes). Juiz por modelo só se nada mais servir, e ele também custa.' },
              { h: 'Executor', sub: 'Um roteiro por configuração', text: 'Roda o conjunto, grava cada saída e o campo usage da resposta (entrada, saída, cache lido, cache escrito), e imprime acerto e custo por tarefa.' },
              { h: 'Aprovação de custo', sub: 'Antes de rodar', text: 'Estime: entradas × configurações × custo por tarefa. Uma varredura de esforço em três níveis com repetição é várias rodadas. Saiba quanto vai gastar antes.' },
            ] }),
            c.code(t, { objective: 'Cálculo de custo por tarefa a partir do campo usage (fórmula, qualquer linguagem)', lang: 'text', code: `custo = usage.input_tokens               × preço_entrada
      + usage.cache_creation_input_tokens × preço_entrada × 1,25
      + usage.cache_read_input_tokens     × preço_leitura_cache   (Fable 5.1: $0,25 / 1M)
      + usage.output_tokens               × preço_saída

custo_por_tarefa = soma dos custos de todas as chamadas até a tarefa passar no julgamento
                   (incluindo tentativas que falharam)`, verify: 'Some por tarefa, não por chamada. Uma tarefa que precisou de três chamadas custa a soma das três. Compare configurações por essa soma e pela taxa de acerto, sempre juntas.' }),
            c.grid2(t, { okTitle: 'Decisão bem feita', ok: ['Acerto e custo por tarefa lidos juntos.', 'Cache medido a partir da segunda chamada (a primeira é escrita, custa 1,25x).', 'Uma alavanca por diff; reverter é limpo.', 'Repetição quando a diferença é de uma ou duas tarefas.'], badTitle: 'Decisão mal feita', bad: ['Olhar só o custo e ignorar que a acurácia caiu.', 'Medir cache na primeira chamada e concluir que "ficou mais caro".', 'Mudar três coisas e atribuir o ganho a uma.', 'Concluir por uma rodada com resultado apertado.'] }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual alavanca deve ser aplicada primeiro na API, segundo a guia oficial?', options: ['Trocar para um modelo mais barato.', 'Cache de prompt e higiene de tokens: são ganhos sem troca de qualidade.', 'Orçamento de tarefa.'], answer: 1, why: 'Ganhos grátis primeiro. Esforço é o primeiro trade-off; modelo, o último.' },
        { q: 'Você colocou "Hoje é 06/09/2026" no prompt de sistema. O que acontece com o cache?', options: ['Nada.', 'Invalida todo dia: o prefixo muda, e cache_read_input_tokens fica zero.', 'Melhora.'], answer: 1, why: 'Cache é por prefixo exato. Data no prompt de sistema é o invalidador silencioso mais comum.' },
        { q: 'No Fable 5.1, como baixar o esforço no meio da conversa sem perder o cache?', options: ['Editar o output_config do topo do pedido.', 'Acrescentar uma mensagem de sistema com conteúdo vazio e o novo esforço (beta).', 'Não é possível.'], answer: 1, why: 'É a novidade do 5.1 (e Opus 5). Editar o topo reseta o cache; a mensagem no array preserva o prefixo.' },
      ],
      summary: [
        ['Ordem', 'cache, esforço, orçamento, lote e fallback, modelo por último.'],
        ['Cache', 'prefixo estável, sem data; leitura a $0,25 por milhão no 5.1; verifique cache_read_input_tokens.'],
        ['Esforço por mensagem', 'mensagem de sistema vazia com novo esforço, sem resetar o cache (beta).'],
        ['Orçamento de tarefa', 'mínimo 20.000; defina uma vez a partir do p90; -18% por -2,7 pontos folgado, -47% por -4,4 apertado.'],
        ['Lote e fallback', 'batch a 50% por custom_id; fallbacks "default" para recusas do 5.1.'],
        ['Medir', '20 a 30 pedidos, julgamento barato, executor que grava usage, custo por tarefa somando tentativas.'],
      ],
    },
  ],
};
