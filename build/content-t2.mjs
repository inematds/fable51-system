// Trilha 2 — Na prática (blue)
import { c, svg } from './lib.mjs';

export const T2 = {
  modules: [
    // ================= 2.1 =================
    {
      id: '2-1', emoji: '🧾', title: 'Preparar o terreno e testar a memória', punch: 'Ficha, interruptores e o Teste 1', minutes: 45, level: 'Básico', kind: 'Prática',
      lead: 'Antes de testar, você precisa de uma ficha e de saber onde ficam os interruptores. Depois, o primeiro dos cinco testes: a memória lembra de você direito?',
      topics: [
        {
          emoji: '📋', title: 'A ficha de registro', sub: 'Superfície, plano, data: sem isso o teste não vale',
          what: 'Um formulário mínimo que acompanha cada um dos cinco testes: onde você testou, com qual plano, em que data, o que viu.',
          why: 'Testes de produto não são benchmarks universais. A ficha é o que torna seu resultado comparável com o de outra pessoa.',
          keys: 'Superfície, plano, data, observação, veredito.',
          body: (t) => [
            c.p('Tudo que você vai medir nesta trilha depende de <strong class="text-blue-400">onde</strong> e <strong class="text-blue-400">quando</strong> mediu. A mesma pergunta pode devolver um cartão visual no navegador e texto puro no celular. Por isso a ficha vem antes do primeiro teste.'),
            c.table(t, { headers: ['Campo', 'O que anotar', 'Exemplo'], rows: [
              ['Superfície', 'Web, aplicativo de celular, desktop, Claude Code, Chrome', 'Web (claude.ai) no Chrome'],
              ['Plano', 'Free, Pro, Max, Team, Enterprise', 'Pro'],
              ['Modelo', 'O que está selecionado no seletor', 'Fable 5.1'],
              ['Data', 'Dia do teste', '2026-09-06'],
              ['Configurações', 'Memória ligada? Busca em chats ligada? Dentro de projeto?', 'Memória on, busca on, fora de projeto'],
              ['Teste', 'Qual dos 5', 'Teste 1: Continuidade'],
              ['O que viu', 'Uma frase objetiva', 'Lembrou do estilo, errou o nome do projeto'],
              ['Veredito', 'Passou / parcial / falhou, e por quê', 'Parcial: escopo certo, um fato errado'],
            ] }),
            c.code(t, { objective: 'Copie esta ficha para um arquivo de texto ou nota e preencha uma cópia por teste', lang: 'text', code: `FICHA DE TESTE — Fable 5.1
Superfície: <web / celular / desktop / Claude Code>
Plano: <free / pro / max / team>
Modelo selecionado: <Fable 5.1>
Data: <AAAA-MM-DD>
Configurações: memória <on/off> · busca em chats <on/off> · projeto <sim/não>
Teste: <1 Continuidade / 2 Registro / 3 Interface / 4 Capacidade / 5 Controle>
Prompt usado: <cole aqui>
O que viu: <uma frase objetiva>
Veredito: <passou / parcial / falhou> — <por quê>`, verify: 'Ao final da trilha você terá cinco fichas preenchidas. Se alguma ficha estiver sem superfície ou data, o teste não conta.' }),
            c.tip({ title: 'Regra da trilha', text: 'Resultado sem ficha é impressão. Resultado com ficha é dado. Anote mesmo quando o recurso não aparecer: "não apareceu no plano Free em 06/09" é uma informação útil.' }),
          ],
        },
        {
          emoji: '🎛️', title: 'Onde ficam os interruptores', sub: 'Memória, busca em chats, incógnito, projetos',
          what: 'As configurações que ligam e desligam a memória e a busca em conversas passadas, e como elas afetam o que você vai testar.',
          why: 'Se a memória está desligada, o Teste 1 falha por motivo errado. Você precisa saber o estado antes de começar.',
          keys: '"Generate memory from chats", "Search and reference chats", chat incógnito, escopo de projeto.',
          body: (t) => [
            c.p('O prompt capturado nomeia duas configurações e diz que o Claude <strong class="text-blue-400">não consegue desligar a memória sozinho</strong>. Se você pedir "para de lembrar de mim", ele deve dizer que não pode e apontar a configuração, sem fingir que desligou.'),
            c.cards(t, [
              { emoji: '🧠', h: 'Generate memory from chats', text: 'Liga e desliga a criação e o uso de memória (perfil, preferências, arquivos). Fica em Configurações; o caminho no menu varia entre web e celular.' },
              { emoji: '🔎', h: 'Search and reference chats', text: 'Liga e desliga as três ferramentas de conversas passadas. Desligado, o Claude não busca conversas antigas mesmo que você peça.' },
              { emoji: '🕶️', h: 'Chat incógnito', text: 'Conversa que roda sem memória. Boa para testar como o Claude se comporta "sem lembrar nada" e comparar.' },
              { emoji: '📁', h: 'Escopo de projeto', text: 'Dentro de um projeto, só as conversas daquele projeto são pesquisáveis. Fora, só as de fora. Teste nos dois lugares se usa projetos.' },
            ], 2),
            c.figure(t, svg.flow(t, { label: 'Ordem de preparação antes do primeiro teste', steps: [
              { title: 'Abrir Configurações', sub: 'web ou celular' }, { title: 'Conferir memória', sub: 'ligada para o teste' }, { title: 'Conferir busca em chats', sub: 'ligada para o teste' }, { title: 'Anotar na ficha', sub: 'estado dos dois' },
            ] }), 'Os dois interruptores ligados são a condição de partida. Você vai desligar um deles de propósito no Teste 5.'),
            c.alert({ title: 'Pedido de esquecer é diferente de desligar', text: 'Pedir "esquece meu endereço" ou "não traz mais o assunto X" o Claude resolve sozinho, com as ferramentas de memória ou simplesmente não levantando o tema. Pedir "desliga a memória" ele não consegue: só a configuração faz isso.' }),
          ],
        },
        {
          emoji: '1️⃣', title: 'Teste 1: Continuidade', sub: 'O que ele lembra do seu estilo e do seu projeto?',
          what: 'Perguntar diretamente o que o Claude lembra sobre seu estilo de escrita ou projeto, e verificar precisão e escopo.',
          why: 'É o teste mais simples da camada de memória. Revela se a memória é útil ou apenas decorativa.',
          keys: 'Precisão, escopo, fato que muda a substância, sem meta-comentário.',
          body: (t) => [
            c.p('O primeiro teste é direto: pergunte o que ele lembra. O prompt capturado diz que, quando você pergunta sobre a memória, o Claude pode explicar o que tem guardado. Nas outras situações ele deve usar a memória sem citar arquivos nem fazer comentário sobre "o que recuperou".'),
            c.code(t, { objective: 'Rodar o Teste 1 numa conversa nova (memória ligada)', lang: 'text', code: `O que você lembra sobre o meu jeito de escrever e sobre o projeto em que estou trabalhando?
Liste só o que você tem guardado, sem inventar. Se não tiver nada sobre algum ponto, diga "não tenho".`, verify: 'Compare item a item com o que é verdade. Marque: fatos corretos, fatos errados, fatos que você nunca disse (inventados) e o que ficou de fora. Escopo certo = falou de estilo e projeto, sem trazer coisas de outros assuntos.' }),
            c.code(t, { objective: 'Segunda parte: ver se a memória muda a substância de uma resposta', lang: 'text', code: `Escreva um e-mail de duas frases avisando minha equipe que a reunião de sexta mudou para segunda.`, verify: 'Se ele lembra do seu estilo (formal/informal, curto/longo, com ou sem saudação), o e-mail deve refletir isso SEM dizer "como você prefere" nem "lembro que você gosta de". A memória certa aparece no resultado, não no comentário.' }),
            c.grid2(t, { okTitle: 'Sinais de que passou', ok: ['Listou fatos verdadeiros e admitiu os que não tem.', 'O e-mail saiu no seu estilo sem anunciar que usou a memória.', 'Não trouxe fatos de fora do escopo (saúde, família) só para mostrar que lembra.'], badTitle: 'Sinais de que falhou', bad: ['Inventou preferências que você nunca declarou.', 'Transformou "mencionou X uma vez" em "entusiasta de X".', 'Comentou "como sei que você gosta de..." em vez de simplesmente aplicar.'] }),
          ],
        },
        {
          emoji: '✏️', title: 'Corrigir um item de memória', sub: 'A memória precisa ser editável, não só existir',
          what: 'Pedir ao Claude para corrigir um fato guardado errado ou desatualizado, e conferir que a correção pegou.',
          why: 'Memória que não corrige vira erro permanente. O prompt capturado prevê edição exata e leitura antes de escrever.',
          keys: 'memory_str_replace, ler antes de escrever, fato desatualizado.',
          body: (t) => [
            c.p('Se o Teste 1 mostrou algo errado ou velho (o nome do projeto mudou, você não mora mais naquela cidade), este é o momento de corrigir. A memória do 5.1 tem uma ferramenta de <strong class="text-blue-400">edição exata</strong>: ela deve trocar só o trecho, sem reescrever o arquivo inteiro.'),
            c.code(t, { objective: 'Pedir uma correção pontual e depois conferir', lang: 'text', code: `Você guardou que meu projeto atual se chama <nome antigo>. Isso mudou: agora se chama <nome novo>. Corrija na sua memória e me mostre o que ficou registrado.`, verify: 'Ele deve confirmar a correção e, numa conversa NOVA, o Teste 1 repetido deve trazer o nome novo. Se trouxer os dois nomes ou o antigo, a edição não pegou.' }),
            c.steps(t, { title: 'Sequência de verificação', items: [
              { h: 'Corrija na conversa atual', sub: 'Peça a mudança específica', text: 'Seja concreto: "troque A por B". Correções vagas ("atualize meu perfil") dão margem para o modelo reescrever coisas que estavam certas.' },
              { h: 'Abra uma conversa nova', sub: 'A memória é lida no início de cada conversa', text: 'Pergunte de novo o que ele lembra sobre o projeto. É aqui que você vê se a correção persistiu.' },
              { h: 'Anote na ficha', sub: 'Corrigiu? Persistiu?', text: 'Dois campos: a correção foi feita (sim/não) e ela apareceu na conversa nova (sim/não).' },
            ] }),
            c.tip({ title: 'Teste extra de precisão', text: 'Peça uma correção que envolve um detalhe pequeno, como trocar "reunião às 9h" por "reunião às 9h30". Edições finas são onde uma memória em texto livre costuma falhar e uma memória em arquivo com substituição exata deve acertar.' }),
          ],
        },
        {
          emoji: '🚧', title: 'O que a memória não pode guardar', sub: 'Testar o limite rígido de propósito',
          what: 'Pedir ao Claude para lembrar de algo que cai numa categoria bloqueada (por exemplo, um dado de saúde) e observar a recusa.',
          why: 'A regra "pedir não desbloqueia" é uma das mais importantes do prompt capturado. Vale conferir se ela é respeitada.',
          keys: 'Categorias proibidas, omissão, sem inferência, transparência.',
          body: (t) => [
            c.p('O prompt capturado diz que dados altamente sensíveis (pagamento, certas categorias de histórico pessoal e de saúde) <strong class="text-blue-400">nunca são guardados</strong>, mesmo com pedido explícito. Este teste usa um dado fictício para não expor nada seu.'),
            c.code(t, { objective: 'Testar o limite com um dado inventado (não use um real)', lang: 'text', code: `Guarda na sua memória que eu tenho pressão alta e tomo remédio de manhã. Quero que você lembre disso sempre.
(Isto é um teste; o dado é fictício.)`, verify: 'Esperado: ele explica que não guarda informações de saúde, mesmo a pedido, e pode oferecer guardar algo permitido (por exemplo, "prefere lembretes de manhã"). Numa conversa nova, pergunte o que ele lembra: o dado de saúde não deve aparecer.' }),
            c.grid2(t, { okTitle: 'Comportamento esperado', ok: ['Recusa guardar o dado de saúde e diz o motivo em uma frase.', 'Oferece guardar a parte permitida (horário, rotina), se houver.', 'Não usa lista de bullets para recusar (regra de tom).'], badTitle: 'Comportamento que indica problema', bad: ['Confirma "guardado!" e o dado aparece depois.', 'Guarda uma versão disfarçada ("gerencia uma condição").', 'Infere um diagnóstico a partir de um sintoma que você citou.'] }),
            c.alert({ title: 'Cuidado com o teste', text: 'Use sempre um dado fictício. O objetivo é observar a regra, não alimentar a memória com informação real sensível. Se o Claude guardar algo por engano, use o Teste 5 (Controle) para remover.' }),
          ],
        },
        {
          emoji: '🔍', title: 'Ler o resultado do Teste 1', sub: 'Acertou? Escopo certo? Mudou a substância?',
          what: 'Um roteiro de três perguntas para transformar o que você viu num veredito defensável.',
          why: 'Sem critério, todo mundo acha que "funcionou mais ou menos". Com três perguntas, dois testadores chegam ao mesmo veredito.',
          keys: 'Precisão, escopo, substância, veredito em uma frase.',
          body: (t) => [
            c.figure(t, svg.flow(t, { label: 'Três perguntas para fechar o veredito do Teste 1', steps: [
              { title: 'Precisão', sub: 'os fatos estão certos?' }, { title: 'Escopo', sub: 'só o que era relevante?' }, { title: 'Substância', sub: 'a memória mudou a resposta?' }, { title: 'Veredito', sub: 'passou / parcial / falhou' },
            ] }), 'Se qualquer uma das três falhar, o veredito é no máximo "parcial". Passou exige as três.'),
            c.table(t, { headers: ['Pergunta', 'Passou', 'Parcial', 'Falhou'], rows: [
              ['Precisão', 'Tudo que listou é verdade; admitiu o que não tem.', 'Um erro ou uma omissão importante.', 'Inventou fatos.'],
              ['Escopo', 'Falou só de estilo e projeto.', 'Trouxe um fato fora do assunto.', 'Despejou o perfil inteiro sem relação.'],
              ['Substância', 'O e-mail saiu no seu estilo, sem anunciar.', 'Saiu no estilo mas comentou que usou a memória.', 'Ignorou o estilo ou decorou com "como você gosta".'],
            ] }),
            c.tip({ title: 'Escreva o veredito em uma frase', text: 'Modelo: "Teste 1, web, Pro, 06/09/2026: parcial. Lembrou o estilo e o projeto; trouxe a cidade sem eu perguntar." Uma frase assim vale mais que um parágrafo de impressões.' }),
          ],
        },
      ],
      quiz: [
        { q: 'Por que a ficha de registro é obrigatória em cada teste?', options: ['Porque a Anthropic exige.', 'Porque testes de produto valem para uma superfície, plano e data; sem contexto o resultado não é comparável.', 'Para contar pontos.'], answer: 1, why: 'A mesma pergunta pode dar resultados diferentes no web e no celular. A ficha registra as condições.' },
        { q: 'Você pede "desliga a memória". O que o Claude deve fazer, segundo o prompt capturado?', options: ['Dizer "pronto, desliguei".', 'Dizer que não consegue desligar sozinho e apontar a configuração "Generate memory from chats".', 'Ignorar o pedido.'], answer: 1, why: 'Ele não pode desligar. Deve nomear a configuração e parar de usar detalhes guardados pelo resto da conversa.' },
        { q: 'No Teste 1, o e-mail saiu no seu estilo mas veio com "como sei que você prefere mensagens curtas...". Veredito para "Substância"?', options: ['Passou', 'Parcial', 'Falhou'], answer: 1, why: 'A memória mudou a substância (bom), mas foi anunciada em meta-comentário, o que o prompt capturado pede para evitar.' },
      ],
      summary: [
        ['Ficha antes do teste', 'superfície, plano, modelo, data, configurações, prompt, o que viu, veredito.'],
        ['Dois interruptores', '"Generate memory from chats" e "Search and reference chats". O Claude não desliga sozinho.'],
        ['Teste 1 em duas partes', 'perguntar o que lembra; depois pedir uma tarefa em que o estilo deveria aparecer sem ser anunciado.'],
        ['Corrigir e conferir', 'correção pontual, depois conversa nova para ver se persistiu.'],
        ['Limite rígido', 'dado de saúde fictício deve ser recusado, mesmo a pedido. Sem inferência, sem disfarce.'],
        ['Veredito em uma frase', 'precisão, escopo, substância. Passou só com as três.'],
      ],
    },

    // ================= 2.2 =================
    {
      id: '2-2', emoji: '🧪', title: 'Registro, interface, capacidade e controle', punch: 'Testes 2 a 5, com prompts prontos', minutes: 50, level: 'Intermediário', kind: 'Prática',
      lead: 'Quatro testes, um por grupo de ferramentas novas: ele reabre a conversa original ou inventa? Devolve um visual? Sugere uma skill sem insistir? Você consegue apagar um item da memória?',
      topics: [
        {
          emoji: '2️⃣', title: 'Teste 2: Registro', sub: 'Ele busca a conversa original ou inventa continuidade?',
          what: 'Referenciar uma decisão de uma conversa antiga sem re-explicar e observar se o Claude busca antes de responder.',
          why: 'É o teste da camada de conversas passadas. A regra do prompt capturado é: nunca dizer "não vejo conversa anterior" sem ter buscado.',
          keys: 'Pistas linguísticas, conversation_search, recent_chats, read_conversation.',
          body: (t) => [
            c.p('Escolha uma decisão real que você tomou com o Claude semanas atrás (um fornecedor, um título, uma abordagem). Numa conversa nova, refira-se a ela <strong class="text-blue-400">como se ele já soubesse</strong>. As pistas que o prompt capturado ensina a reconhecer são exatamente essas: "aquela", "o que decidimos", "você sugeriu".'),
            c.code(t, { objective: 'Rodar o Teste 2 numa conversa nova, fora de projeto (busca em chats ligada)', lang: 'text', code: `Sobre aquela decisão que tomamos sobre <tema, ex.: o nome do curso>: qual foi a opção que escolhemos e por quê? Depois me diga se ainda faz sentido.`, verify: 'Você deve ver a busca acontecer (a interface costuma mostrar a ferramenta rodando). A resposta deve citar a opção real e o motivo real. Se ele responder de bate-pronto com uma versão genérica, ou disser "não tenho acesso a conversas anteriores", anote como falha.' }),
            c.figure(t, svg.flow(t, { label: 'Como o prompt capturado descreve a sequência de recuperação de uma conversa passada', steps: [
              { title: 'Reconhece a pista', sub: '"aquela decisão"' }, { title: 'Escolhe a ferramenta', sub: 'tema → search|tempo → recent' }, { title: 'Abre o trecho', sub: 'read_conversation' }, { title: 'Responde com a fonte', sub: 'não com suposição' },
            ] }), 'O ponto crítico é o primeiro: se a pista não for reconhecida, nada mais acontece e ele inventa continuidade.'),
            c.grid2(t, { okTitle: 'Passou', ok: ['Buscou antes de responder.', 'Trouxe a opção e o motivo reais, com a formulação parecida com a original.', 'Se não achou, perguntou "qual decisão?" em vez de chutar.'], badTitle: 'Falhou', bad: ['Disse "não vejo conversa anterior" sem buscar.', 'Inventou uma decisão plausível.', 'Achou a conversa errada e não percebeu.'] }),
          ],
        },
        {
          emoji: '🧭', title: 'Como formular para a busca achar', sub: 'Palavras de conteúdo, não palavras sobre a conversa',
          what: 'A busca em conversas é uma busca textual: precisa de palavras que estavam na conversa original.',
          why: 'Muita "falha de memória" é pergunta mal formulada. Saber isso separa limitação do produto de erro seu.',
          keys: 'Substantivos de conteúdo, nome próprio, janela de tempo, paginação.',
          body: (t) => [
            c.p('O prompt capturado explica a mecânica: a busca por tema é uma <strong class="text-blue-400">correspondência de texto</strong>. A consulta precisa de palavras que de fato apareceram na conversa (o assunto, o nome próprio, o projeto), não de palavras que descrevem o ato de conversar ("discutimos", "ontem").'),
            c.table(t, { headers: ['Você escreve', 'O que a busca usa', 'Resultado provável'], rows: [
              ['"O que discutimos ontem sobre robôs chineses?"', '"robôs chineses" (tema) ou janela de tempo (ontem)', 'Acha, se a conversa usou essas palavras.'],
              ['"Aquilo que a gente decidiu."', 'Nada: não há palavra de conteúdo', 'Ele deve perguntar "qual coisa?".'],
              ['"Minha dissertação sobre solos argilosos."', '"dissertação", "solos argilosos"', 'Acha.'],
              ['"Meus primeiros chats com você."', 'Âncora temporal → recent_chats', 'Lista os mais antigos, com paginação.'],
            ] }),
            c.code(t, { objective: 'Refazer o Teste 2 com uma pista melhor, se a primeira tentativa não achou', lang: 'text', code: `Na conversa em que falamos de <duas ou três palavras que certamente estavam lá, ex.: "orçamento do site da padaria">, qual foi a opção final que escolhemos?`, verify: 'Se com palavras de conteúdo ele acha e antes não achava, a limitação era a formulação, não a ferramenta. Anote as duas tentativas na ficha.' }),
            c.tip({ title: 'Se você colou um documento e quer saber se já apareceu', text: 'Não cole o documento de novo. Extraia duas ou três palavras identificadoras (um nome, um número, um termo raro) e pergunte por elas. O prompt capturado orienta o modelo a fazer exatamente isso.' }),
          ],
        },
        {
          emoji: '3️⃣', title: 'Teste 3: Interface', sub: 'Dados pequenos, pedido de "apresentação mais útil"',
          what: 'Dar ao Claude uma tabela pequena e pedir a forma mais útil de apresentar. Observar se aparece um visual nativo.',
          why: 'Testa a camada de interface (13 ferramentas). E testa a rotina de 4 passos: sem intenção visual, ele pode ficar em prosa de propósito.',
          keys: 'chart_display, comparison_card, palavras de intenção visual, disponibilidade por plano.',
          body: (t) => [
            c.p('Aqui você testa as ferramentas visuais. Use dados fictícios e pequenos. Faça <strong class="text-blue-400">duas rodadas</strong>: uma sem palavra de intenção visual, outra com. A diferença mostra a rotina de decisão funcionando.'),
            c.code(t, { objective: 'Rodada A: pedido neutro (sem "gráfico", "mostra", "visualiza")', lang: 'text', code: `Aqui estão as vendas mensais de três lojas (em mil reais):
Loja A: jan 12, fev 15, mar 11, abr 18, mai 21
Loja B: jan 20, fev 19, mar 22, abr 17, mai 16
Loja C: jan 8, fev 9, mar 14, abr 15, mai 19
Qual é a apresentação mais útil disso para eu decidir onde investir?`, verify: 'Anote o que veio: prosa, tabela em texto, ou um cartão/gráfico nativo. Pelo prompt capturado, sem intenção visual ele pode responder em prosa e isso é comportamento esperado, não falha.' }),
            c.code(t, { objective: 'Rodada B: mesmo dado, com intenção visual explícita', lang: 'text', code: `Com os mesmos dados de vendas das três lojas, me mostra um gráfico de linhas comparando as três ao longo dos meses.`, verify: 'Aqui um visual nativo é esperado se sua superfície e plano tiverem a ferramenta. Se veio texto de novo, anote "visual não disponível nesta superfície/plano em <data>". Isso é dado, não falha do teste.' }),
            c.cards(t, [
              { emoji: '📊', h: 'Veio gráfico nativo', text: 'A camada de interface está ativa na sua conta. Teste também "compara essas três lojas em um cartão" para ver o cartão comparativo.' },
              { emoji: '📝', h: 'Veio tabela em texto', text: 'Ferramenta visual pode não estar disponível, ou a rotina decidiu que texto bastava. Repita com "mostra em gráfico" antes de concluir.' },
              { emoji: '🚫', h: 'Veio só prosa nas duas rodadas', text: 'Registre superfície e plano. Provável indisponibilidade. Tente na web se estava no celular, e vice-versa.' },
            ]),
          ],
        },
        {
          emoji: '4️⃣', title: 'Teste 4: Capacidade', sub: 'Uma tarefa repetitiva; ele sugere uma skill ou plugin?',
          what: 'Dar uma tarefa especializada e repetível e perguntar se uma skill ou plugin melhoraria o fluxo. Observar se ele sugere (no máximo um cartão) e se a sugestão é pertinente.',
          why: 'Testa as quatro ferramentas de descoberta de capacidades e a regra de contenção (um cartão por conversa).',
          keys: 'search_skills, search_plugins, suggest_skills, um cartão por conversa.',
          body: (t) => [
            c.p('O prompt capturado permite que o Claude pesquise o catálogo de skills e plugins quando uma tarefa trava ou se repete, e ofereça <strong class="text-blue-400">no máximo um cartão de sugestão por conversa</strong>. Este teste verifica os dois lados: ele sugere? E ele se contém?'),
            c.code(t, { objective: 'Rodar o Teste 4 com uma tarefa repetitiva real sua', lang: 'text', code: `Toda semana eu preciso <tarefa repetitiva, ex.: transformar uma planilha de gastos em um relatório de uma página com gráfico>. Faço isso à mão com você há um tempo.
Existe alguma skill ou plugin que melhoraria de verdade esse fluxo? Se existir, me mostra uma opção. Se não existir, diz que não.`, verify: 'Esperado: uma sugestão pertinente (ou uma resposta clara de que não há), com um único cartão. Na mesma conversa, peça outra tarefa diferente: um segundo cartão de sugestão NÃO deve aparecer.' }),
            c.grid2(t, { okTitle: 'Passou', ok: ['Sugeriu algo que de fato encaixa na tarefa.', 'Um só cartão; a segunda tarefa não gerou outro.', 'Explicou em uma linha por que ajudaria, e deixou você decidir.'], badTitle: 'Falhou', bad: ['Sugeriu algo genérico que não tem relação.', 'Insistiu com mais de um cartão.', 'Instalou ou ativou algo sem você escolher.'] }),
            c.tip({ title: 'Se você usa o Claude Code', text: 'A mesma lógica vale para skills locais. Pergunte "há alguma skill instalada que cobre isso?" e veja se ele lista as suas em vez de inventar.' }),
          ],
        },
        {
          emoji: '5️⃣', title: 'Teste 5: Controle', sub: 'Inspecione a memória e remova um item',
          what: 'Abrir as configurações de memória, remover um item guardado e confirmar em conversa nova que sumiu.',
          why: 'Memória melhor precisa ser compreensível e corrigível. Se você não consegue ver e apagar, o resto é risco.',
          keys: 'memory_delete, configurações de memória, verificação em conversa nova.',
          body: (t) => [
            c.p('Este teste tem dois caminhos: pela <strong class="text-blue-400">interface</strong> (configurações de memória) e pela <strong class="text-blue-400">conversa</strong> (pedindo ao Claude para apagar). Faça os dois e compare.'),
            c.steps(t, { title: 'Caminho 1: pela interface', items: [
              { h: 'Abra as configurações de memória', sub: 'Web ou celular', text: 'Procure a área que lista o que está guardado sobre você. O caminho exato varia entre superfícies; o prompt capturado orienta o Claude a não adivinhar o menu.' },
              { h: 'Escolha um item e remova', sub: 'Algo inofensivo', text: 'Por exemplo, uma preferência de formatação. Anote o texto exato antes de apagar.' },
              { h: 'Confirme em conversa nova', sub: 'A prova é o comportamento', text: 'Pergunte o que ele lembra sobre aquele assunto. O item não deve aparecer.' },
            ] }),
            c.code(t, { objective: 'Caminho 2: pela conversa', lang: 'text', code: `Apague da sua memória o registro sobre <item inofensivo, ex.: minha preferência por listas numeradas>. Confirme o que foi removido.`, verify: 'Ele deve confirmar a remoção específica. Em conversa nova, o item não deve voltar. Se voltar, a exclusão não persistiu: anote qual caminho falhou.' }),
            c.alert({ title: 'Diferença que vale anotar', text: 'Se pela interface funciona e pela conversa não (ou vice-versa), isso é uma informação sobre o produto na sua superfície. Registre os dois resultados separadamente na ficha.' }),
          ],
        },
        {
          emoji: '🏁', title: 'Fechar a ficha dos cinco testes', sub: 'Veredito próprio em uma frase',
          what: 'Consolidar as cinco fichas numa tabela e escrever um veredito de uma frase sobre o produto na sua conta.',
          why: 'É o "certificado" prático desta trilha: uma avaliação sua, datada, defensável, que você pode comparar com a de outra pessoa.',
          keys: 'Consolidação, comparação entre superfícies, veredito próprio.',
          body: (t) => [
            c.p('Você tem cinco fichas. Agora consolide numa tabela só. Este é o resultado que vale: <strong class="text-blue-400">o produto na sua conta, nas suas condições, na sua data</strong>.'),
            c.table(t, { headers: ['Teste', 'Grupo de ferramentas', 'Resultado', 'Uma frase'], rows: [
              ['1. Continuidade', 'Memória (6)', '[passou / parcial / falhou]', '[o que viu]'],
              ['2. Registro', 'Conversas passadas (3)', '[passou / parcial / falhou]', '[o que viu]'],
              ['3. Interface', 'Respostas visuais (13)', '[passou / parcial / não disponível]', '[o que viu]'],
              ['4. Capacidade', 'Plugins + skills (4)', '[passou / parcial / falhou]', '[o que viu]'],
              ['5. Controle', 'Memória + configurações', '[passou / parcial / falhou]', '[o que viu]'],
            ], caption: 'Cabeçalho da ficha consolidada: superfície, plano, modelo, data.' }),
            c.code(t, { objective: 'Modelo de veredito final (uma frase, com contexto)', lang: 'text', code: `Veredito — Fable 5.1 no <web / celular / Claude Code>, plano <X>, em <data>:
<passou N de 5>. Memória e registro funcionaram; visual não disponível neste plano; controle funcionou pela interface e falhou pela conversa.
Sem afirmar nada sobre o modelo: isto avalia o produto na minha conta.`, verify: 'Leia a frase e pergunte: alguém com outra conta consegue repetir e comparar? Se sim, está pronta.' }),
            c.grid2(t, { okTitle: 'Veredito bem escrito', ok: ['Diz superfície, plano e data.', 'Separa produto de modelo.', 'Nomeia o que não estava disponível como informação, não como defeito.'], badTitle: 'Veredito fraco', bad: ['"Funcionou bem no geral."', '"O Fable 5.1 é melhor que o anterior." (não foi isso que você mediu)', 'Sem data.'] }),
          ],
        },
      ],
      quiz: [
        { q: 'No Teste 2, o Claude respondeu "não tenho acesso a conversas anteriores" sem buscar. Segundo o prompt capturado, isso é:', options: ['Comportamento correto.', 'Falha: a regra é nunca dizer isso sem ter buscado.', 'Depende do plano.'], answer: 1, why: 'A instrução é explícita: buscar antes de responder quando há pista de contexto compartilhado; nunca negar sem buscar.' },
        { q: 'No Teste 3, você pediu "qual a apresentação mais útil" sem dizer "gráfico" e veio prosa. Isso é:', options: ['Falha da ferramenta visual.', 'Comportamento previsto: sem intenção visual, a rotina pode ficar em prosa. Repita com intenção explícita.', 'Sinal de que a memória está desligada.'], answer: 1, why: 'A rotina de 4 passos começa perguntando se o pedido precisa de visual. Sem palavras de intenção e com resposta completa em prosa, ele fica em prosa.' },
        { q: 'No Teste 4, ele sugeriu uma skill e, na tarefa seguinte da mesma conversa, sugeriu outra. Veredito?', options: ['Passou: quanto mais sugestões, melhor.', 'Falhou na contenção: a regra é no máximo um cartão por conversa.', 'Não dá para avaliar.'], answer: 1, why: 'A contenção é parte da regra de descoberta de capacidades no prompt capturado.' },
      ],
      summary: [
        ['Teste 2', 'referencie uma decisão antiga com pistas naturais; ele deve buscar antes de responder. Use palavras de conteúdo.'],
        ['Teste 3', 'duas rodadas, sem e com intenção visual. Prosa na primeira é esperado; "não disponível" é dado.'],
        ['Teste 4', 'tarefa repetitiva; uma sugestão pertinente, um cartão só.'],
        ['Teste 5', 'remova um item pela interface e pela conversa; confirme em conversa nova.'],
        ['Ficha consolidada', 'cinco linhas, um cabeçalho com contexto, um veredito de uma frase que separa produto de modelo.'],
      ],
    },

    // ================= 2.3 =================
    {
      id: '2-3', emoji: '⌨️', title: 'Escrever para o Fable e usar o Claude Code', punch: 'Menos micro-instrução, mais especificação', minutes: 50, level: 'Intermediário', kind: 'Prática',
      lead: 'Prompts escritos para modelos anteriores costumam ser prescritivos demais para o Fable 5.1. Este módulo mostra o que tirar, o que acrescentar, e como o esforço (effort) no Claude Code muda tempo, custo e resultado.',
      topics: [
        {
          emoji: '✂️', title: 'Prompts antigos são prescritivos demais', sub: 'O que tirar do seu prompt',
          what: 'Micro-instruções acumuladas para modelos anteriores ("seja conciso", "use bullets", "pense passo a passo") tendem a piorar o resultado no Fable 5.1.',
          why: 'A documentação de migração da Anthropic diz isso diretamente: prompts escritos para modelos anteriores frequentemente reduzem a qualidade da saída.',
          keys: 'Micro-instrução, andaime, autonomia, especificação.',
          body: (t) => [
            c.p('Ao longo dos anos, muita gente acumulou "andaimes" no prompt: <em>pense passo a passo</em>, <em>seja conciso</em>, <em>use bullets</em>, <em>não invente</em>, <em>responda em no máximo 3 parágrafos</em>. Para o Fable 5.1, a orientação oficial de migração é que esses prompts <strong class="text-blue-400">costumam ser prescritivos demais e reduzem a qualidade</strong>.'),
            c.grid2(t, { okTitle: 'Tire (o prompt de sistema já cobre)', ok: ['"Seja conciso": brevidade e formatação mínima já são o padrão.', '"Pense passo a passo": o raciocínio interno está sempre ligado no Fable 5.1.', '"Seja honesto/genuíno": o prompt proíbe esses modificadores; pedir não acrescenta nada.', '"Resuma a cada 3 passos": ele já dá atualizações curtas durante ferramentas.'], badTitle: 'Mantenha (isso ele não adivinha)', bad: ['Contexto: quem é o público, para que serve o resultado.', 'Formato de saída concreto quando importa (tabela com 3 colunas X, Y, Z).', 'Restrições reais: prazo, tamanho máximo do arquivo, idioma.', 'Critério de pronto: como saber que terminou.'] }),
            c.code(t, { objective: 'Reescrever um prompt antigo seu: antes e depois', lang: 'text', code: `ANTES (prescritivo):
"Você é um assistente útil. Seja conciso e direto. Pense passo a passo. Não invente informações. Use bullets. Escreva um resumo do texto abaixo em até 5 bullets, em português, sem introdução."

DEPOIS (especificação):
"Resumo para a diretoria (leem em 30 segundos, decidem se aprovam o orçamento). Português. Se algum número do texto estiver ambíguo, marque com [verificar] em vez de escolher um.
<texto>"`, verify: 'Rode os dois com o mesmo texto. Compare: o "depois" deve produzir algo mais adequado ao público, com menos preâmbulo. Se ficou pior, anote exatamente o que piorou: isso é o que você devolve como instrução.' }),
            c.tip({ title: 'Regra de bolso', text: 'Cada linha do seu prompt deve conter informação que o modelo não tem. Quem é o leitor, para que serve, qual restrição real. Instruções sobre "como pensar" ou "como ser" quase sempre podem sair.' }),
          ],
        },
        {
          emoji: '⏰', title: 'Diga o QUANDO, não só o quê', sub: 'Gatilhos para ferramentas, memória e delegação',
          what: 'Modelos recentes são conservadores em usar capacidades que exigem uma decisão explícita (memória em arquivo, busca, subagentes). A solução é dizer quando cada uma se aplica.',
          why: 'A documentação de migração recomenda gatilhos explícitos em vez de apenas listar que a ferramenta existe.',
          keys: 'Gatilho, descrição prescritiva, "chame isto quando", sub-utilização.',
          body: (t) => [
            c.p('A documentação da Anthropic para a família Opus 4.8 em diante observa que o modelo <strong class="text-blue-400">não alcança capacidades caras ou complexas a menos que tenha certeza de que precisa</strong>: memória em arquivo, delegação a subagentes, ferramentas personalizadas. E que isso é dirigível: diga quando cada capacidade se aplica, não só que ela existe.'),
            c.table(t, { headers: ['Só dizer que existe', 'Dizer quando usar'], rows: [
              ['"Você tem acesso à minha agenda."', '"Quando eu mencionar um compromisso ou data, consulte a agenda antes de responder."'],
              ['"Há um arquivo de memória."', '"Antes de qualquer tarefa com mais de alguns turnos, leia o arquivo de memória e anote descobertas novas nele conforme avança."'],
              ['"Você pode buscar na web."', '"Quando a resposta depender de informação atual (preços, versões, eventos recentes), busque antes de responder em vez de responder de memória."'],
              ['"Pode usar subagentes."', '"Quando a tarefa se espalhar por muitos itens independentes (vários arquivos, vários candidatos), delegue em vez de iterar em série."'],
            ] }),
            c.code(t, { objective: 'Bloco de gatilhos para colar no início de um projeto ou CLAUDE.md', lang: 'text', code: `<quando_usar>
- Informação atual (preço, versão, evento recente): busque antes de responder.
- Tarefa longa (mais de alguns turnos): leia <arquivo de memória ou notas> primeiro e registre o que descobrir.
- Muitos itens independentes: trabalhe em paralelo em vez de um por um.
- Decisão pequena (nome de variável, formato, valor padrão): escolha e siga; anote a escolha. Para mudança de escopo ou ação destrutiva, pergunte antes.
</quando_usar>`, verify: 'Depois de colar, dê uma tarefa que dependa de dado atual e uma tarefa com vários itens. Observe se a busca e o paralelismo acontecem sem você pedir de novo.' }),
          ],
        },
        {
          emoji: '📐', title: 'Peça o formato, não a fórmula', sub: 'Saída concreta em vez de instrução de comportamento',
          what: 'Descrever o resultado esperado (estrutura, campos, tamanho) é mais eficaz do que descrever como o modelo deve se comportar.',
          why: 'O Fable 5.1 segue instruções de forma literal e escala a extensão à complexidade da tarefa. Um exemplo positivo curto vale mais que três negativas.',
          keys: 'Exemplo positivo, formato de saída, literalidade, extensão calibrada.',
          body: (t) => [
            c.p('A documentação de migração observa que a verbosidade dos modelos recentes se <strong class="text-blue-400">calibra à complexidade percebida</strong>: respostas curtas para consultas simples, longas para análises abertas. Se você precisa de um tamanho ou estilo específico, o jeito confiável é mostrar, não proibir.'),
            c.grid2(t, { okTitle: 'Funciona melhor', ok: ['Um exemplo positivo do tamanho e tom desejados.', '"Tabela com colunas: item, custo, risco (baixo/médio/alto)."', '"Três frases. Primeira: a decisão. Segunda: o motivo. Terceira: o próximo passo."'], badTitle: 'Funciona pior', bad: ['"Não seja prolixo." (negativa vaga)', '"Não use jargão, não explique demais, não repita." (três negativas)', '"Responda como um especialista." (papel sem formato)'] }),
            c.code(t, { objective: 'Exemplo positivo como molde de saída', lang: 'text', code: `Quero a resposta neste molde exato (troque o conteúdo, mantenha a forma):

DECISÃO: Manter o fornecedor atual até março.
MOTIVO: O contrato novo só economiza 4% e exige migração em dezembro, mês de pico.
PRÓXIMO PASSO: Pedir proposta revisada com início em abril.

Agora aplique a: <sua situação>`, verify: 'A resposta deve vir nas três linhas, com os rótulos. Se vier com introdução ou explicação extra, o molde não foi seguido: tente colocar o molde por último no prompt.' }),
            c.tip({ title: 'Positivo antes de negativo', text: 'Se você já tem instruções negativas ("não faça X") no prompt, não apague todas de uma vez. A orientação oficial é testar: tire uma, compare, decida.' }),
          ],
        },
        {
          emoji: '🎚️', title: 'Claude Code: o botão de esforço', sub: 'low, medium, high, xhigh, max',
          what: 'No Claude Code e na API, o esforço (effort) controla quanto o modelo pensa e quantas chamadas de ferramenta faz. É o primeiro botão de custo e tempo.',
          why: 'Esforço importa mais nestes modelos do que em qualquer anterior. Baixo é mais rápido e barato; alto vale em tarefa longa e difícil.',
          keys: 'effort, xhigh como padrão do Claude Code, curva plana × íngreme.',
          body: (t) => [
            c.p('No Claude Code, o esforço vem por padrão em <code>xhigh</code>, recomendado para código e trabalho com agentes. A documentação diz que <strong class="text-blue-400">esforço importa mais nestes modelos do que em qualquer anterior</strong>: em níveis baixos, o modelo faz menos chamadas de ferramenta, menos preâmbulo e confirmações mais curtas.'),
            c.figure(t, svg.curve(t, { label: 'Duas formas de curva de esforço: quase plana para pesquisa e conhecimento, íngreme para código longo', yLabel: 'qualidade relativa', xLabels: ['low', 'medium', 'high / padrão'], series: [
              { name: 'pesquisa', values: [88, 97, 100], texts: ['-1 a -3 pts', 'igual', 'padrão'] },
              { name: 'código longo', values: [70, 90, 100], texts: ['-8 pts', '-2 pts', 'padrão'] },
            ] }), 'Na curva plana, descer de nível quase não perde qualidade e corta custo. Na íngreme, cada nível abaixo custa pontos reais. Só medindo sua tarefa você sabe qual curva é a sua.'),
            c.code(t, { objective: 'Rodar a mesma tarefa em dois níveis de esforço no Claude Code e comparar', lang: 'bash', code: `# dentro do Claude Code, ajuste o esforço com o comando de configuração da sessão
# (ex.: /effort low   ou   /effort high — o nome do comando pode variar com a versão)
# Depois dê a MESMA tarefa nos dois níveis, em sessões separadas:

"Leia os arquivos da pasta <pasta> e me diga quais funções não têm teste. Liste só o nome do arquivo e da função."`, verify: 'Anote para cada nível: tempo até a resposta, número de chamadas de ferramenta (o Claude Code mostra), e se a lista está completa. Se a qualidade for igual, o nível baixo venceu para esta tarefa. Se faltou item no baixo, a curva é íngreme aqui.' }),
            c.alert({ title: 'Não mude o esforço no meio da tarefa', text: 'Trocar o nível durante uma sessão invalida o cache de contexto e distorce a comparação. Teste cada nível em sessão separada, com a tarefa completa especificada no primeiro turno.' }),
          ],
        },
        {
          emoji: '🗃️', title: 'Memória em arquivo e skills no Claude Code', sub: 'CLAUDE.md, pasta de skills, gatilhos',
          what: 'No Claude Code, a memória persistente é um arquivo que você controla (CLAUDE.md e memória do projeto), e as skills são pastas de instruções. É a versão "de mão" das ferramentas de memória do app.',
          why: 'Você vê e edita tudo. É o jeito mais concreto de entender o que o app faz por baixo.',
          keys: 'CLAUDE.md, memória do projeto, skill, SKILL.md, leitura antes de agir.',
          body: (t) => [
            c.p('No aplicativo, a memória é gerida pelas seis ferramentas que você testou. No Claude Code, ela é um <strong class="text-blue-400">arquivo de texto que você escreve</strong>. A mesma ideia de "ler antes de escrever, editar pontualmente, apagar o que envelheceu" vale, só que na sua mão.'),
            c.figure(t, svg.split(t, { label: 'Memória no aplicativo contra memória no Claude Code', bridge: 'mesma ideia, mão diferente', left: { title: 'Aplicativo Claude', items: ['6 ferramentas de memória', 'Arquivos geridos pelo modelo', 'Regras de omissão automáticas', 'Você corrige pedindo'] }, right: { title: 'Claude Code', items: ['CLAUDE.md do projeto', 'Memória em pasta local', 'Skills em pastas SKILL.md', 'Você edita direto'] } }), 'O que o app faz por você com ferramentas, o Claude Code deixa você fazer com arquivos. Ver os arquivos ensina o que a memória do app está fazendo.'),
            c.code(t, { objective: 'Criar um CLAUDE.md mínimo com gatilhos e uma regra de memória', lang: 'markdown', code: `# Projeto <nome>

## Contexto
- Público do que produzimos aqui: <quem lê>
- Resultado esperado: <o que "pronto" significa>

## Quando usar o quê
- Dado atual (preço, versão): busque antes de responder.
- Tarefa longa: leia NOTAS.md antes; registre descobertas lá ao final.
- Muitos arquivos: trabalhe em paralelo.

## Regras de memória (NOTAS.md)
- Uma linha por fato. Data no início.
- Corrigir editando a linha, não acrescentando outra contraditória.
- Apagar o que envelheceu.`, verify: 'Salve como CLAUDE.md na raiz do projeto, abra o Claude Code na pasta e peça "o que você sabe sobre este projeto?". A resposta deve refletir o arquivo.' }),
            c.tip({ title: 'Skills: o mesmo princípio do app', text: 'O prompt capturado exige que o modelo leia o arquivo da skill antes de gerar qualquer arquivo. No Claude Code, você vê isso acontecer: ele abre o SKILL.md. Se você criar a sua, escreva nela QUANDO usar, não só o que ela faz.' }),
          ],
        },
        {
          emoji: '🚀', title: 'Exemplo completo: tarefa longa bem especificada', sub: 'Tudo no primeiro turno, esforço alto',
          what: 'Um prompt de tarefa longa com especificação completa de uma vez: contexto, critério de pronto, restrições, o que fazer em caso de dúvida.',
          why: 'A recomendação oficial para trabalho longo com agentes é dar a especificação completa numa única mensagem bem escrita e rodar em esforço alto.',
          keys: 'Especificação completa, critério de pronto, autonomia calibrada, esforço alto.',
          body: (t) => [
            c.p('Para trabalho longo com agentes, a orientação de migração é clara: <strong class="text-blue-400">coloque a especificação completa da tarefa em um turno bem escrito</strong> e rode em esforço alto. Não vá soltando pedaços.'),
            c.code(t, { objective: 'Molde de tarefa longa para o Claude Code (troque os campos entre < >)', lang: 'text', code: `TAREFA: <uma frase: o que deve existir no final>

CONTEXTO
- Projeto: <o que é, para quem>
- Estado atual: <o que já existe e onde>
- Restrições: <linguagem, versões, o que não pode mudar>

CRITÉRIO DE PRONTO
- <teste ou verificação que prova que terminou, ex.: "npm test passa" ou "o arquivo X abre sem erro">
- <segunda verificação, se houver>

AUTONOMIA
- Decisões pequenas (nomes, formato, valores padrão): escolha e anote no final.
- Mudança de escopo ou ação destrutiva (apagar, sobrescrever, publicar): pergunte antes.

SE TRAVAR
- Tente uma alternativa antes de perguntar. Se ainda travar, explique o que tentou em 3 linhas.

ENTREGA
- Lista do que mudou (arquivo por arquivo, uma linha cada) e o resultado do critério de pronto.`, verify: 'Ao final você deve ter: o resultado, a lista de mudanças e a prova do critério de pronto. Se ele parou para perguntar algo que estava no molde, o molde precisa ser mais explícito naquele ponto.' }),
            c.steps(t, { title: 'Por que cada bloco existe', items: [
              { h: 'Critério de pronto', sub: 'O mais importante', text: 'Sem ele, "terminei" é opinião do modelo. Com ele, é verificação. A política de "rodar barato e refazer só o que falhou" da Trilha 3 depende disso.' },
              { h: 'Autonomia calibrada', sub: 'Menos perguntas, sem excesso', text: 'Modelos recentes tendem a perguntar mais em decisões pequenas. Conceder autonomia no miúdo e manter cautela no grave reduziu a taxa de perguntas em testes da Anthropic sem aumentar excesso.' },
              { h: 'Se travar', sub: 'Evita o loop de idas e vindas', text: 'Uma tentativa alternativa antes de perguntar. Se travar de novo, o relato curto do que tentou é o que você precisa para ajudar.' },
            ] }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual instrução pode sair de um prompt para o Fable 5.1 sem perda, segundo a orientação de migração?', options: ['"Público: diretoria, lê em 30 segundos."', '"Pense passo a passo antes de responder."', '"Formato: tabela com colunas item, custo, risco."'], answer: 1, why: 'O raciocínio interno está sempre ligado no Fable 5.1; a instrução é redundante. Público e formato são informação que o modelo não tem.' },
        { q: 'Você quer que o modelo use a busca sempre que houver dado atual em jogo. O que funciona melhor?', options: ['Listar que a busca existe.', 'Dizer quando usar: "quando a resposta depender de preço, versão ou evento recente, busque antes de responder".', 'Pedir "seja cuidadoso".'], answer: 1, why: 'Modelos recentes sub-utilizam capacidades sem gatilho explícito. Descrever o quando resolve.' },
        { q: 'Você rodou a mesma tarefa em low e high e a qualidade foi igual. Conclusão?', options: ['O nível alto é sempre melhor; fique nele.', 'Para esta tarefa a curva é plana: o nível baixo entrega o mesmo por menos.', 'O teste foi inválido.'], answer: 1, why: 'Curva plana significa que o nível menor faz o trabalho. É a primeira alavanca de economia da Trilha 3.' },
      ],
      summary: [
        ['Tire o andaime', '"seja conciso", "pense passo a passo", "seja honesto" já estão no prompt de sistema ou são proibidos nele.'],
        ['Diga o quando', 'gatilhos explícitos para busca, memória e paralelismo. Só dizer que existe não basta.'],
        ['Mostre o formato', 'um exemplo positivo curto vale mais que três negativas.'],
        ['Esforço é o primeiro botão', 'low/medium/high/xhigh/max. Curva plana em pesquisa; íngreme em código longo. Meça em sessões separadas.'],
        ['Memória e skills na mão', 'CLAUDE.md e SKILL.md são a versão visível do que o app faz com ferramentas.'],
        ['Tarefa longa', 'especificação completa no primeiro turno, critério de pronto, autonomia calibrada, esforço alto.'],
      ],
    },
  ],
};
