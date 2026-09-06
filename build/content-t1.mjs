// Trilha 1 — O que mudou (emerald)
import { c, svg, SOURCE_OFFICIAL, SOURCE_INDEX, SOURCE_DUMP, SOURCE_PRODUCT } from './lib.mjs';

const link = (href, txt) => `<a href="${href}" target="_blank" class="text-sky-400 hover:text-sky-300 underline decoration-dotted">${txt}</a>`;

export const T1 = {
  modules: [
    // ================= 1.1 =================
    {
      id: '1-1', emoji: '📜', title: 'Duas coisas chamadas "prompt de sistema"', punch: 'Oficial × extraído: saber a diferença', minutes: 35, level: 'Básico', kind: 'Fundamento',
      lead: 'Antes de discutir o que mudou no Fable 5.1, é preciso saber de que arquivo estamos falando. Existem dois, com pesos de confiança bem diferentes.',
      topics: [
        {
          emoji: '🧩', title: 'O que é um prompt de sistema', sub: 'O manual de instruções que o modelo lê antes de você',
          what: 'Texto invisível ao usuário que a empresa coloca antes da conversa, dizendo ao modelo quem ele é, o que pode fazer e como se comportar.',
          why: 'Boa parte do que você percebe como "personalidade" ou "capacidade" do Claude vem desse texto, não só do modelo treinado.',
          keys: 'Modelo, prompt de sistema, ferramenta, runtime, camada de produto.',
          body: (t) => [
            c.p('Quando você abre o Claude e escreve uma pergunta, sua mensagem não é a primeira coisa que o modelo lê. Antes dela existe um texto longo, escrito pela empresa, chamado <strong class="text-emerald-400">prompt de sistema</strong>. Ele diz ao modelo quem ele é, qual a data, quais ferramentas existem, como deve formatar respostas e o que nunca deve fazer.'),
            c.glossary(t, [
              ['Modelo', 'A rede neural treinada (Fable 5.1, Opus 5, Sonnet 5). É o "cérebro". Sozinho, ele só completa texto.'],
              ['Prompt de sistema', 'O texto de instruções colocado antes da conversa. Define comportamento, ferramentas e limites.'],
              ['Ferramenta', 'Uma ação que o modelo pode acionar sozinho: buscar na web, ler um arquivo, gerar um gráfico, escrever na memória.'],
              ['Runtime', 'O pacote completo que roda no produto: prompt central + regras de memória + busca + artefatos + definições de todas as ferramentas.'],
            ]),
            c.concept(t, { title: 'Por que isso importa para você', emoji: '🎯', paras: [
              'Quando alguém diz "o Claude ficou melhor em lembrar das coisas", pode estar falando de duas mudanças diferentes: o modelo ficou mais capaz, ou o prompt ganhou instruções e ferramentas novas de memória. As duas coisas aconteceram no Fable 5.1, e este curso vai ensinar você a separá-las.',
            ] }),
            c.figure(t, svg.stack(t, { label: 'Camadas entre você e o modelo: sua mensagem chega por último, depois do prompt de sistema e das definições de ferramentas', layers: [
              { title: 'Sua mensagem', sub: 'o que você digita' },
              { title: 'Prompt de sistema', sub: 'instruções, regras, formato' },
              { title: 'Definições de ferramentas', sub: 'memória, busca, visuais, skills' },
              { title: 'Modelo', sub: 'Fable 5.1' },
            ] }), 'Sua mensagem é a camada de fora. Tudo abaixo dela já estava lá quando você começou a digitar. Mudar qualquer camada muda o que você recebe.'),
          ],
        },
        {
          emoji: '🏛️', title: 'O prompt central oficial', sub: 'O que a Anthropic publica e assina',
          what: 'A Anthropic publica os prompts centrais dos aplicativos web e móveis do Claude, com data e histórico de versões.',
          why: 'É a única fonte autenticada. Tudo que você afirmar sobre "o que o Claude foi instruído a fazer" deve começar aqui.',
          keys: 'Índice oficial, prompt central, escopo de aplicativo, não vale para API.',
          body: (t) => [
            c.p(`A Anthropic mantém uma página pública com o prompt de sistema de cada modelo usado nos aplicativos Claude. O do Fable 5.1 está em ${link(SOURCE_OFFICIAL, 'platform.claude.com / release-notes / system-prompts')}. Existe um ${link(SOURCE_INDEX, 'índice geral')} com todas as versões.`),
            c.data({ title: 'O que a página oficial diz sobre si mesma', items: [
              'Vale para os aplicativos <strong>web e móveis</strong> do Claude.',
              'Fornece informações atuais (data, produtos) e incentiva comportamentos do produto.',
              '<strong>Não se aplica à API.</strong> Quem constrói com a API escreve o próprio prompt de sistema.',
            ] }),
            c.grid2(t, { okTitle: 'O que dá para afirmar com a fonte oficial', ok: ['"O prompt oficial do Fable 5.1 instrui o modelo a fazer X."', '"A Anthropic publicou a versão de tal data."', '"Comparando as versões oficiais, a instrução Y foi adicionada."'], badTitle: 'O que a fonte oficial não cobre', bad: ['Definições das 46 ferramentas (não estão na página oficial).', 'Regras completas de memória e busca do produto.', 'Qualquer coisa sobre a API ou sobre o Claude Code.'] }),
            c.tip({ title: 'Hábito que evita confusão', text: 'Sempre que ler uma afirmação forte sobre "o prompt do Claude", pergunte: isso está na página oficial ou veio de uma extração? A resposta muda o peso que você dá ao que leu.' }),
          ],
        },
        {
          emoji: '📦', title: 'O runtime montado', sub: '275.723 caracteres capturados fora da página oficial',
          what: 'Uma extração pública, não autenticada pela Anthropic, do pacote completo que roda no produto: prompt central + memória + busca + artefatos + roteamento + 46 ferramentas.',
          why: 'É onde estão os detalhes de memória, ferramentas visuais e skills que explicam o comportamento novo. Mas é uma cópia não oficial.',
          keys: 'Extração, dump, runtime montado, 275.723 caracteres, 46 definições de ferramentas.',
          body: (t) => [
            c.p(`Existe um segundo arquivo, muito maior, publicado num ${link(SOURCE_DUMP, 'repositório público de prompts capturados')}. Ele tem <strong class="text-emerald-400">275.723 caracteres</strong> e contém o prompt central mais tudo o que a página oficial não mostra: regras de memória, instruções de busca, orientações de artefatos, roteamento de visuais e as definições de <strong class="text-emerald-400">46 ferramentas</strong>.`),
            c.alert({ title: 'Limite de confiança', text: 'A Anthropic não autenticou esse arquivo. Ele é coerente com o comportamento observado e com a página oficial, mas continua sendo uma extração feita por terceiros. Neste curso ele é chamado de "prompt capturado" ou "extração", nunca de "o prompt do Claude".' }),
            c.concept(t, { title: 'O que só existe no arquivo capturado', emoji: '🔍', bullets: [
              'Bloco <code>memory_filesystem</code>: como listar, ler, escrever, editar e apagar arquivos de memória.',
              'Bloco <code>past_chats_tools</code>: quando e como buscar conversas anteriores.',
              'Checklist de 4 passos para decidir se uma resposta vira visual.',
              'Regras de tom: sem "genuinamente", formatação mínima, sem bullets ao recusar.',
              'Schemas completos das 46 ferramentas, com parâmetros e descrições.',
            ] }),
            c.figure(t, svg.split(t, { label: 'Duas fontes lado a lado: o prompt central oficial e o runtime capturado', bridge: 'o central está dentro do capturado', left: { title: 'Oficial (Anthropic)', items: ['Publicado e datado', 'Prompt central', 'Vale p/ web e mobile', 'Não vale p/ API'] }, right: { title: 'Capturado (terceiros)', items: ['275.723 caracteres', 'Central + memória + busca', 'Artefatos + roteamento', '46 ferramentas', 'Não autenticado'] } }), 'A coluna da direita contém a da esquerda. O que sobra é a camada de produto que este curso estuda, sempre com a etiqueta "não autenticado".'),
          ],
        },
        {
          emoji: '🏷️', title: 'Como se referir a isso sem errar', sub: 'Vocabulário seguro para falar do assunto',
          what: 'Um conjunto de termos que deixam claro o grau de confiança de cada afirmação.',
          why: 'Quem mistura "oficial" e "extraído" perde credibilidade rápido. O vocabulário certo protege você.',
          keys: 'Prompt oficial, prompt capturado, extração não oficial, coexistência, causalidade.',
          body: (t) => [
            c.p('A forma de falar carrega o grau de certeza. Estes são os termos que este curso usa, e que você pode adotar:'),
            c.table(t, { headers: ['Termo', 'Use quando', 'Evite dizer'], rows: [
              ['Prompt oficial', 'A afirmação está na página da Anthropic.', '"o prompt secreto"'],
              ['Prompt capturado / extração', 'A afirmação vem do arquivo de 275 mil caracteres.', '"o prompt real do Claude"'],
              ['Definição de ferramenta', 'Você está falando de uma função declarada no arquivo capturado.', '"recurso confirmado pela Anthropic"'],
              ['Disponível na minha conta', 'Você testou e viu o recurso funcionando.', '"todo mundo tem isso"'],
            ] }),
            c.grid2(t, { okTitle: 'Frases seguras', ok: ['"O prompt capturado do Fable 5.1 declara seis ferramentas de memória."', '"Na página oficial, a instrução sobre X aparece a partir de tal versão."', '"Testei na minha conta web em setembro de 2026 e o recurso apareceu."'], badTitle: 'Frases que queimam credibilidade', bad: ['"Vazou o prompt real e agora sabemos tudo."', '"A Anthropic confirmou as 46 ferramentas."', '"O Fable 5.1 é melhor porque tem mais ferramentas." (mistura modelo e produto)'] }),
            c.tip({ title: 'Regra de bolso', text: 'Se você não consegue apontar a página ou o arquivo de onde veio a afirmação, ela ainda não está pronta para ser dita em público.' }),
          ],
        },
        {
          emoji: '🔢', title: 'Os três números', sub: '2,3x · +28 · 75%',
          what: 'Três medidas que resumem a mudança entre os arquivos capturados do Fable 5 e do Fable 5.1.',
          why: 'São o jeito mais rápido de explicar a alguém o tamanho da mudança sem entrar em detalhe técnico.',
          keys: 'Palavras contadas, ferramentas adicionadas, concentração do crescimento.',
          body: (t) => [
            c.p('Comparando os dois arquivos capturados (Fable 5 e Fable 5.1) com o mesmo método de contagem, três números aparecem:'),
            c.cards(t, [
              { emoji: '📏', h: '2,3x', text: 'Palavras no prompt capturado: de <strong>17.501</strong> para <strong>40.046</strong>. O texto que o modelo lê antes de você mais que dobrou.' },
              { emoji: '🧰', h: '+28', text: 'Definições únicas de ferramentas adicionadas. As 18 anteriores continuam; o total vai a <strong>46</strong>. Nenhuma foi removida.' },
              { emoji: '🎯', h: '75%', text: 'Do crescimento medido (22.545 palavras), <strong>16.967</strong> são memória (+8.639) e schemas de ferramentas (+8.328).' },
            ]),
            c.figure(t, svg.bars(t, { label: 'Palavras no prompt capturado: Fable 5 contra Fable 5.1', aLabel: 'Fable 5', bLabel: 'Fable 5.1', items: [
              { label: 'Palavras totais', a: 17501, b: 40046, aText: '17.501', bText: '40.046' },
              { label: 'Ferramentas', a: 18, b: 46, aText: '18', bText: '46' },
            ], max: 44000 }), 'A barra de ferramentas está na mesma escala das palavras só para caber no gráfico. O que interessa é a proporção: o texto dobrou e as ferramentas mais que dobraram.'),
            c.figure(t, svg.donut(t, { label: 'Para onde foram as 22.545 palavras adicionadas', center: '75%|memória + schemas', parts: [
              { title: 'Memória: +8.639', sub: 'como lembrar, o que guardar, o que nunca guardar', value: 8639 },
              { title: 'Schemas de ferramentas: +8.328', sub: 'como chamar, validar entradas, apresentar resultados', value: 8328 },
              { title: 'Todo o resto: +5.578', sub: 'tom, busca, artefatos, roteamento', value: 5578 },
            ] }), 'Três quartos do que foi adicionado tem função concreta: fazer o modelo lembrar e usar ferramentas. Não é texto de personalidade.'),
          ],
        },
        {
          emoji: '🧪', title: 'Como a comparação foi congelada', sub: 'Método e limites de verdade',
          what: 'O procedimento usado para comparar os dois arquivos, com data de corte e unidades de contagem.',
          why: 'Números sem método são opinião. Saber o método permite reproduzir e permite saber o que os números não provam.',
          keys: 'wc -w, commit único, unidade de ferramenta, corte em 02/09/2026, limites.',
          body: (t) => [
            c.table(t, { headers: ['Item', 'Como foi feito'], rows: [
              ['Par de fontes', 'Os arquivos do Fable 5 e do Fable 5.1 no <strong>mesmo commit</strong> do repositório público, congelado em 02/09/2026.'],
              ['Unidade de palavra', 'Palavras separadas por espaço, contadas com <code>wc -w</code>.'],
              ['Unidade de ferramenta', 'Nomes únicos de funções declaradas em cada bloco de definições de ferramentas.'],
              ['Reconciliação', '18 compartilhadas + 28 adicionadas = 46. Zero removidas. Zero nomes duplicados.'],
              ['Contagem por seção', 'Blocos nomeados de memória e definições de ferramentas, incluindo descrições e schemas de parâmetros.'],
            ], caption: 'Reproduzível por qualquer pessoa com os dois arquivos e um terminal.' }),
            c.code(t, { objective: 'Reproduzir a contagem de palavras nos dois arquivos capturados', lang: 'bash', code: `# baixe os dois arquivos do repositório público (link no rodapé) e rode:
wc -w CLAUDE-FABLE-5.md Claude-Fable-5.1.md

# contar nomes únicos de ferramentas declaradas no 5.1
grep -oE '"name": *"[a-z_:0-9]+"' Claude-Fable-5.1.md | sort -u | wc -l`, verify: 'Os totais devem ficar perto de 17.501 e 40.046 palavras. O número de ferramentas deve dar 46 (pequenas diferenças aparecem se o repositório tiver mudado depois do corte).' }),
            c.alert({ title: 'Quatro limites de verdade', text: 'Os arquivos não são prompts de runtime autenticados pela Anthropic. As contagens descrevem só estes dois arquivos. Definição de ferramenta não prova disponibilidade universal (varia por superfície, plano e conta). E coexistência de mudanças não estabelece causalidade.' }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual afirmação está correta sobre a página oficial de prompts da Anthropic?', options: ['Vale para os aplicativos web e móveis, não para a API.', 'Contém as definições completas das 46 ferramentas.', 'É a mesma coisa que o arquivo de 275 mil caracteres.'], answer: 0, why: 'A página oficial cobre o prompt central dos aplicativos. Ferramentas, memória e busca só aparecem no arquivo capturado, que não é autenticado.' },
        { q: 'Onde se concentra o crescimento do prompt capturado entre Fable 5 e 5.1?', options: ['Em texto de personalidade e tom.', 'Em memória e schemas de ferramentas (75%).', 'Em regras de segurança.'], answer: 1, why: 'Memória (+8.639) e schemas (+8.328) somam 16.967 das 22.545 palavras adicionadas.' },
        { q: 'A frase "vazou o prompt real do Claude" é problemática porque:', options: ['O arquivo é falso.', 'O arquivo é uma extração não autenticada; "real" promete mais do que a fonte sustenta.', 'A Anthropic proíbe falar disso.'], answer: 1, why: 'O arquivo pode ser coerente com o comportamento observado, mas sem autenticação você não pode chamá-lo de "real". Use "prompt capturado".' },
      ],
      summary: [
        ['Dois arquivos, dois pesos', 'o prompt central oficial (Anthropic, web e mobile) e o runtime capturado (275.723 caracteres, 46 ferramentas, não autenticado).'],
        ['Três números', '2,3x nas palavras, +28 ferramentas, 75% do crescimento em memória e schemas.'],
        ['Vocabulário seguro', '"prompt oficial", "prompt capturado", "definição de ferramenta", "disponível na minha conta".'],
        ['Método reproduzível', 'mesmo commit, wc -w, nomes únicos de função, corte em 02/09/2026.'],
        ['Quatro limites', 'não autenticado, só estes arquivos, definição não é disponibilidade, coexistência não é causalidade.'],
      ],
    },

    // ================= 1.2 =================
    {
      id: '1-2', emoji: '🧱', title: 'Claude é mais do que o modelo', punch: 'Quatro camadas e 28 ferramentas novas', minutes: 45, level: 'Básico', kind: 'Fundamento',
      lead: 'Pense no Claude como um modelo de raciocínio dentro de quatro camadas de produto: memória, ferramentas, interface e política. As 28 adições do 5.1 caem nessas camadas.',
      topics: [
        {
          emoji: '🏗️', title: 'As quatro camadas do produto', sub: 'Memória, ferramentas, interface, política',
          what: 'Um jeito de organizar tudo que fica ao redor do modelo: o que ele lembra, o que ele faz, como ele mostra e o que ele não pode.',
          why: 'Quando algo muda no Claude, a primeira pergunta útil é: em qual camada? Isso evita atribuir tudo ao "modelo ficou mais inteligente".',
          keys: 'Camada de memória, camada de ferramentas, camada de interface, camada de política.',
          body: (t) => [
            c.p('O arquivo capturado mostra que a qualidade cotidiana do Claude depende cada vez mais de como o produto <strong class="text-emerald-400">lembra contexto, chama ferramentas e transforma raciocínio em algo utilizável</strong>. Uma forma simples de enxergar isso é em quatro camadas ao redor do modelo.'),
            c.figure(t, svg.stack(t, { label: 'As quatro camadas de produto ao redor do modelo: política por fora, depois interface, ferramentas e memória, com o modelo no centro', layers: [
              { title: 'POLÍTICA', sub: 'regras e limites: o que nunca guardar, quando recusar, quanto citar' },
              { title: 'INTERFACE', sub: 'gráficos, cartões, quizzes, widgets: como a resposta aparece' },
              { title: 'FERRAMENTAS', sub: 'buscar, criar, agir: web, arquivos, skills, plugins' },
              { title: 'MEMÓRIA', sub: 'contexto ao longo do tempo: arquivos e conversas passadas' },
              { title: 'O MODELO', sub: 'Fable 5.1: raciocínio' },
            ] }), 'De fora para dentro. A política envolve tudo. O modelo está no centro e é o único elemento que os benchmarks medem diretamente.'),
            c.cards(t, [
              { emoji: '🧠', h: 'Memória', text: 'Perfil, preferências, projetos, pessoas. No 5.1 virou um sistema de arquivos com 6 ferramentas e 3 ferramentas de busca em conversas passadas.' },
              { emoji: '🧰', h: 'Ferramentas', text: 'Buscar na web, ler arquivos, procurar skills e plugins, sugerir pesquisa profunda. 46 no total no arquivo capturado.' },
              { emoji: '🖼️', h: 'Interface', text: '13 ferramentas visuais novas: gráfico, comparação, quiz, roteiro de viagem, tradução, widget personalizado.' },
              { emoji: '⚖️', h: 'Política', text: 'Categorias que a memória nunca guarda, limite de citação, checklist antes de gerar visual, regras de tom.' },
            ], 4),
            c.tip({ title: 'Exercício mental', text: 'Da próxima vez que o Claude fizer algo que surpreenda você, tente localizar em qual camada aconteceu. "Ele lembrou do meu projeto" é memória. "Ele me devolveu um gráfico" é interface. "Ele se recusou a guardar meu dado de saúde" é política.' }),
          ],
        },
        {
          emoji: '🗂️', title: 'A memória virou um sistema de arquivos', sub: 'Seis ferramentas para contexto persistente',
          what: 'Em vez de um resumo único, o Claude agora mantém documentos de memória: lista, lê, escreve, acrescenta, edita pontualmente e apaga.',
          why: 'Memória em arquivos é compacta, corrigível e reutilizável. Você passa a poder pedir "corrija isso" ou "apague aquilo".',
          keys: 'memory_list, memory_read, memory_write, memory_append, memory_str_replace, memory_delete.',
          body: (t) => [
            c.p('A maior parte das palavras adicionadas explica como o Claude lembra. O arquivo capturado declara <strong class="text-emerald-400">seis ferramentas de memória</strong> que funcionam como um pequeno fluxo de documentos:'),
            c.table(t, { headers: ['Ferramenta', 'O que faz', 'Analogia'], rows: [
              ['memory_list', 'Lista os documentos de memória e seus metadados.', 'Ver a pasta.'],
              ['memory_read', 'Lê um ou mais documentos.', 'Abrir o arquivo.'],
              ['memory_write', 'Cria ou substitui totalmente um documento.', 'Salvar como.'],
              ['memory_append', 'Acrescenta material sem reenviar o documento inteiro.', 'Escrever no fim da página.'],
              ['memory_str_replace', 'Faz uma edição exata e direcionada dentro de um documento.', 'Localizar e substituir.'],
              ['memory_delete', 'Exclui um documento após verificar sua versão atual.', 'Apagar, com confirmação.'],
            ] }),
            c.concept(t, { title: 'Por que arquivos importam', emoji: '📁', paras: [
              'Memória curada é contexto compacto. Perfil, preferências, pessoas, áreas e notas de projeto podem ficar como arquivos reutilizáveis (por exemplo <code>profile.md</code>, <code>preferences.md</code>, <code>projects/...</code>, <code>people/...</code>). O prompt capturado também define o comportamento de <strong>ler antes de escrever</strong>, fazer edições exatas e checar a versão antes de apagar.',
            ] }),
            c.figure(t, svg.flow(t, { label: 'Ciclo de vida de um documento de memória, como o prompt capturado descreve', steps: [
              { title: 'Listar', sub: 'o que já existe' }, { title: 'Ler', sub: 'antes de escrever' }, { title: 'Escrever / acrescentar', sub: 'só a verdade mínima' }, { title: 'Editar pontual', sub: 'sem reescrever tudo' }, { title: 'Apagar', sub: 'checando a versão' },
            ] }), 'Persistência exige edição e exclusão. Uma memória que só cresce e nunca corrige vira ruído.'),
            c.alert({ title: 'Atenção: fato guardado precisa "ganhar o lugar"', text: 'O prompt capturado diz que um fato armazenado só entra na resposta se mudar a substância do que o Claude conclui ou recomenda. Usar memória só para mostrar que lembra é tratado como vigilância, não como atenção. Isso muda como você deve testar a memória (Trilha 2).' }),
          ],
        },
        {
          emoji: '⏪', title: 'Voltar no tempo de duas maneiras', sub: 'Memória curada × recuperação da conversa original',
          what: 'Além dos arquivos de memória, três ferramentas buscam conversas passadas: por tema, por tempo, e abrindo a conversa no ponto certo.',
          why: 'Um resumo guarda a manchete e perde a formulação. Quando a precisão importa, o Claude pode reabrir a fonte.',
          keys: 'conversation_search, recent_chats, read_conversation, pistas linguísticas.',
          body: (t) => [
            c.p('Arquivos de memória guardam um resumo compacto. As três ferramentas de conversas passadas recuperam o <strong class="text-emerald-400">registro original</strong>. Cada uma resolve um problema diferente.'),
            c.figure(t, svg.split(t, { label: 'Memória curada à esquerda, recuperação de conversas à direita', bridge: 'orientar × reabrir a fonte', left: { title: 'Memória curada', items: ['Fatos reutilizáveis', 'profile.md, preferences.md', 'projects/..., people/...', 'Contexto curto e mantido'] }, right: { title: 'Conversas passadas', items: ['1. conversation_search: por tema', '2. recent_chats: por tempo', '3. read_conversation: abre o trecho', 'Contexto original, com evidência'] } }), 'A memória ajuda o Claude a se orientar. A recuperação de chats reabre a conversa-fonte quando a precisão importa.'),
            c.concept(t, { title: 'Como o Claude decide buscar', emoji: '👂', paras: [
              'O prompt capturado ensina a reconhecer pistas linguísticas: possessivos sem contexto ("minha dissertação"), artigos definidos que assumem referência compartilhada ("o script", "aquela estratégia"), verbos no passado sobre trocas anteriores ("você recomendou", "decidimos") e pedidos diretos ("continua de onde paramos"). Quando a pessoa escreve como se o Claude já soubesse algo que não está na conversa, ele deve buscar antes de responder.',
            ], bullets: [
              'Regra explícita: nunca dizer "não vejo conversa anterior sobre isso" sem ter buscado.',
              'A busca é por palavras de conteúdo ("robôs chineses"), não por meta-palavras ("discutimos ontem").',
              'Se você está dentro de um projeto, só as conversas daquele projeto são pesquisáveis; fora, só as conversas fora de projeto.',
            ] }),
            c.tip({ title: 'O que isso muda no seu uso', text: 'Você pode parar de colar o contexto inteiro toda vez. Escreva como escreveria para um colega que estava na reunião: "aquela decisão sobre o fornecedor" já é pista suficiente para a busca. Se ele não achar, pede que você especifique.' }),
          ],
        },
        {
          emoji: '🖼️', title: 'As respostas viraram interfaces', sub: 'Treze ferramentas visuais novas',
          what: 'Em vez de oito parágrafos, uma resposta pode chegar como gráfico, comparação, quiz, roteiro, tradução ou widget.',
          why: 'Muita informação é melhor vista do que lida. E o prompt define uma rotina para decidir quando um visual vale a pena.',
          keys: 'chart_display, comparison_card, quiz_display, step_card, visualize:show_widget, checklist de 4 passos.',
          body: (t) => [
            c.p('Treze adições permitem que o Claude devolva uma <strong class="text-emerald-400">interface estruturada</strong> como resposta. Os nomes terminam em <code>_display_v0</code> e cada um cobre um tipo de conteúdo:'),
            c.figure(t, svg.chips(t, { title: 'As 13 ferramentas visuais declaradas no prompt capturado', label: 'Grade com os nomes das treze ferramentas de resposta visual', cols: 3, items: ['chart_display_v0', 'comparison_card_display_v0', 'featured_card_display_v0', 'itinerary_display_v0', 'link_preview_display_v0', 'options_card_display_v0', 'places_list_display_v0', 'product_carousel_display_v0', 'quiz_display_v0', 'step_card_display_v0', 'translation_display_v0', 'visualize:read_me', 'visualize:show_widget'] }), 'Doze são cartões prontos para um tipo de conteúdo. A última, show_widget, renderiza um SVG ou HTML personalizado quando nenhum cartão serve.'),
            c.table(t, { headers: ['Se você pede...', 'Pode receber...'], rows: [
              ['Comparar dois ou três produtos', 'comparison_card: linhas alinhadas, sem prosa.'],
              ['Um passo a passo de configuração', 'step_card: guia ordenado.'],
              ['Estudar um assunto', 'quiz_display: quiz interativo ou flashcards.'],
              ['Uma viagem de 5 dias', 'itinerary_display: linha do tempo dia a dia.'],
              ['Uma tabela pequena de dados', 'chart_display: gráfico de linha, barra ou dispersão.'],
              ['Um conceito espacial ou de sistema', 'visualize:show_widget: SVG ou HTML interativo.'],
            ] }),
            c.figure(t, svg.flow(t, { label: 'A rotina de 4 passos que o prompt capturado impõe antes de qualquer visual', steps: [
              { title: '0. Precisa de visual?', sub: 'texto resolve? então texto' }, { title: '1. Há ferramenta conectada?', sub: 'MCP que cobre a categoria' }, { title: '2. Pediu arquivo?', sub: '"salvar como", ".html"' }, { title: '3. Visualizer', sub: 'visual inline por padrão' },
            ] }), 'Para no primeiro passo que casa. Se você não usou palavras de intenção visual ("mostra", "gráfico", "desenha") e a resposta cabe em prosa, o Claude responde em prosa.'),
          ],
        },
        {
          emoji: '🔌', title: 'Descoberta de capacidades, pesquisa e controle', sub: 'Skills, plugins, pesquisa profunda e o botão de parada',
          what: 'Quatro ferramentas procuram uma capacidade faltante e oferecem um próximo passo. Uma sugere pesquisa profunda. Uma encerra conversas em casos restritos.',
          why: 'O produto passou a se autocompletar: quando trava, procura uma skill; quando a pergunta é grande, oferece pesquisa; e tem um freio estreito.',
          keys: 'search_plugins, search_skills, suggest_plugin_install, suggest_skills, suggest_research, end_conversation.',
          body: (t) => [
            c.p('Seis ferramentas restantes revelam escolhas de produto. Quatro cuidam de <strong class="text-emerald-400">descoberta de capacidades</strong>: quando uma tarefa trava, o Claude pesquisa o catálogo de plugins ou de skills do usuário e oferece uma opção.'),
            c.figure(t, svg.flow(t, { label: 'Fluxo ilustrativo de descoberta de capacidade: tarefa trava, catálogo é pesquisado, uma opção é oferecida, o usuário decide', steps: [
              { title: 'Tarefa trava', sub: 'ex.: revisar contrato' }, { title: 'Pesquisa o catálogo', sub: 'search_skills / plugins' }, { title: 'Oferece 1 opção', sub: 'máx. 1 cartão por conversa' }, { title: 'Você decide', sub: 'adicionar ou não' },
            ] }), 'A contenção é parte da regra: no máximo um cartão de sugestão por conversa, para o produto não virar insistente.'),
            c.cards(t, [
              { emoji: '🔎', h: 'suggest_research', text: 'Quando uma investigação com várias fontes ajudaria, o Claude explica o valor em uma linha e mostra uma ação opcional. Você decide se a pesquisa roda.' },
              { emoji: '🛑', h: 'end_conversation', text: 'Um botão de parada estreito, restrito a situações específicas de segurança, com aviso prévio e segunda chamada para confirmar. Não é saída para perguntas difíceis.' },
              { emoji: '🧩', h: 'Skills obrigatórias', text: 'O prompt capturado exige ler o arquivo de instruções da skill antes de gerar qualquer arquivo (documento, planilha, PDF). Pular isso baixa a qualidade.' },
            ]),
            c.glossary(t, [
              ['Skill', 'Uma pasta de instruções e boas práticas para um tipo de tarefa (fazer um .docx, ler um PDF). O modelo lê antes de agir.'],
              ['Plugin', 'Um pacote instalável que adiciona ferramentas ou skills ao seu Claude.'],
              ['MCP', 'Protocolo que conecta o Claude a serviços externos (seu calendário, seu Drive, uma ferramenta de diagramas). Cada conexão traz ferramentas novas.'],
            ]),
          ],
        },
        {
          emoji: '🗺️', title: 'Atlas: 18 ficaram, 28 chegaram, 46 no total', sub: 'Todas as ferramentas, agrupadas pelo trabalho que fazem',
          what: 'O índice completo das 46 definições capturadas, separando as mantidas das adicionadas.',
          why: 'Ter o mapa inteiro evita duas ilusões: "tudo mudou" e "nada mudou". Dezoito ferramentas são as mesmas.',
          keys: 'Mantidas, adicionadas, 6 grupos funcionais, disponibilidade varia.',
          body: (t) => [
            c.p('Todas as 18 definições do Fable 5 continuam presentes no arquivo capturado do Fable 5.1. As <strong class="text-emerald-400">28 adições</strong> se organizam em seis grupos, pelo trabalho que fazem:'),
            c.figure(t, svg.fanout(t, { label: 'As 28 ferramentas adicionadas, agrupadas em seis funções', center: '+28|ferramentas|adicionadas', groups: [
              { n: 6, title: 'Memória', sub: 'criar e manter contexto persistente do usuário' },
              { n: 3, title: 'Conversas passadas', sub: 'recuperar o registro da conversa original' },
              { n: 13, title: 'Respostas visuais', sub: 'transformar prosa em interface útil' },
              { n: 4, title: 'Plugins + skills', sub: 'encontrar e oferecer uma capacidade ausente' },
              { n: 1, title: 'Pesquisa', sub: 'oferecer investigação com várias fontes' },
              { n: 1, title: 'Controle', sub: 'encerrar uma conversa restrita e insegura' },
            ] }), '6 + 3 + 13 + 4 + 1 + 1 = 28. Quase metade das adições é interface visual; a segunda maior fatia é memória.'),
            c.figure(t, svg.chips(t, { title: 'As 18 ferramentas MANTIDAS (presentes nos dois arquivos)', label: 'Grade com os nomes das dezoito ferramentas mantidas', cols: 3, items: ['ask_user_input_v0', 'bash_tool', 'create_file', 'fetch_sports_data', 'image_search', 'message_compose_v1', 'places_map_display_v0', 'places_search', 'present_files', 'recipe_display_v0', 'recommend_claude_apps', 'search_mcp_registry', 'str_replace', 'suggest_connectors', 'view', 'weather_fetch', 'web_fetch', 'web_search'] }), 'Busca na web, arquivos, clima, lugares, receitas e composição de mensagens já existiam. O 5.1 não removeu nada.'),
            c.alert({ title: 'Unidade contada e disponibilidade', text: 'A unidade é "função declarada única nos blocos de definições capturadas". A disponibilidade real varia por superfície do Claude (web, mobile, Claude Code), configurações e conta. Ver uma definição no arquivo não garante que ela apareça no seu plano.' }),
          ],
        },
      ],
      quiz: [
        { q: 'O Claude devolveu um gráfico em vez de texto. Em qual camada de produto isso aconteceu?', options: ['Memória', 'Interface', 'Política'], answer: 1, why: 'Gráficos, cartões e widgets são a camada de interface. A camada de política decide o que não pode; a de memória, o que se lembra.' },
        { q: 'Qual a diferença entre memória curada e recuperação de conversas?', options: ['São a mesma coisa com nomes diferentes.', 'A memória guarda resumo compacto; a recuperação reabre a conversa original quando a precisão importa.', 'A recuperação só funciona na API.'], answer: 1, why: 'Um resumo pode manter a manchete e perder a evidência. Por isso existem os dois mecanismos.' },
        { q: 'Quantas ferramentas foram removidas entre Fable 5 e Fable 5.1 no arquivo capturado?', options: ['Zero', 'Cinco', 'Dezoito'], answer: 0, why: '18 mantidas + 28 adicionadas = 46. Nenhuma foi removida.' },
      ],
      summary: [
        ['Quatro camadas', 'memória, ferramentas, interface e política envolvem o modelo. Localize a mudança na camada certa.'],
        ['Memória em arquivos', 'seis ferramentas: listar, ler, escrever, acrescentar, editar pontual, apagar com checagem de versão.'],
        ['Duas formas de voltar no tempo', 'memória curada para orientar; três ferramentas de conversas passadas para reabrir a fonte.'],
        ['Treze visuais', 'resposta pode ser gráfico, comparação, quiz, roteiro ou widget. Rotina de 4 passos decide.'],
        ['Descoberta e contenção', 'skills e plugins são sugeridos, mas no máximo um cartão por conversa. end_conversation é estreito.'],
        ['Atlas', '18 ficaram, 28 chegaram, 46 no total. Disponibilidade varia por conta.'],
      ],
    },

    // ================= 1.3 =================
    {
      id: '1-3', emoji: '⚖️', title: 'O paradoxo e as regras que vieram junto', punch: 'Modelo melhorou E o sistema cresceu', minutes: 40, level: 'Básico', kind: 'Fundamento',
      lead: 'O Fable 5.1 pontua mais alto. O sistema ao redor dele ficou muito maior. Nenhuma fonte prova que uma coisa causou a outra. Este módulo ensina a manter as duas afirmações separadas, e mostra as regras novas que vieram com a memória.',
      topics: [
        {
          emoji: '📈', title: 'Três números que subiram', sub: 'Os benchmarks que a Anthropic escolheu mostrar',
          what: 'A Anthropic relata pontuações maiores em três testes com agentes: ciência, fluxos de negócios e programação.',
          why: 'São a evidência oficial de melhora do modelo. Mas são testes escolhidos pela empresa, e medem o modelo, não o produto.',
          keys: 'Ciência com agentes, fluxos de trabalho de negócios, programação com agentes.',
          body: (t) => [
            c.p(`Na ${link(SOURCE_PRODUCT, 'página do produto')}, a Anthropic relata pontuações maiores do Fable 5.1 em relação ao Fable 5 em três testes com agentes:`),
            c.figure(t, svg.bars(t, { label: 'Benchmarks relatados pela Anthropic: Fable 5 contra Fable 5.1', aLabel: 'Fable 5', bLabel: 'Fable 5.1', max: 100, items: [
              { label: 'Ciência com agentes', a: 24.7, b: 52.6, aText: '24,7', bText: '52,6' },
              { label: 'Fluxos de negócios', a: 17.1, b: 31.4, aText: '17,1', bText: '31,4' },
              { label: 'Programação com agentes', a: 70.5, b: 73.4, aText: '70,5', bText: '73,4' },
            ] }), 'Os dois primeiros mais que dobraram ou quase. O terceiro subiu pouco, porque já estava alto. Onde a barra cinza é curta, o salto é maior.'),
            c.glossary(t, [
              ['Benchmark', 'Um conjunto fixo de tarefas com resposta verificável, usado para comparar modelos com a mesma régua.'],
              ['Agente', 'Uso do modelo em que ele executa várias etapas sozinho, chamando ferramentas, até terminar uma tarefa.'],
            ]),
            c.data({ title: 'Como ler esses números', items: [
              'São <strong>selecionados pela Anthropic</strong>. Empresas mostram os testes em que melhoraram.',
              'Medem o <strong>modelo</strong> em condições controladas, não o produto com memória e 46 ferramentas.',
              'Sustentam a afirmação "o modelo melhorou". Não sustentam "porque ganhou ferramentas".',
            ] }),
          ],
        },
        {
          emoji: '🔗', title: 'Coexistência não é causalidade', sub: 'Duas coisas mudaram ao mesmo tempo',
          what: 'O benchmark sustenta melhora do modelo. A diferença do prompt mostra expansão do produto. Nenhuma fonte liga uma à outra.',
          why: 'É o erro de raciocínio mais comum ao falar de IA: ver duas mudanças juntas e inventar a seta entre elas.',
          keys: 'Correlação, causalidade, afirmações separadas.',
          body: (t) => [
            c.p('Duas coisas são verdadeiras ao mesmo tempo: o modelo pontuou mais alto, e o prompt capturado ficou 2,3 vezes maior. A tentação é dizer "o Fable 5.1 é melhor <em>porque</em> ganhou memória e 28 ferramentas". <strong class="text-emerald-400">Nenhuma das fontes prova isso.</strong>'),
            c.grid2(t, { okTitle: 'Afirmações que as fontes sustentam', ok: ['O modelo Fable 5.1 pontua mais alto que o Fable 5 nos três benchmarks relatados.', 'O prompt capturado do 5.1 tem 28 definições de ferramentas a mais.', 'As duas mudanças aconteceram na mesma versão.'], badTitle: 'Afirmações que as fontes NÃO sustentam', bad: ['As ferramentas novas causaram as pontuações maiores.', 'Sem as ferramentas, o modelo não teria melhorado.', 'Quem usa o Claude no app recebe a melhora medida no benchmark, na mesma proporção.'] }),
            c.concept(t, { title: 'Por que a separação importa na prática', emoji: '🧭', paras: [
              'Se você acredita que a melhora veio das ferramentas, vai avaliar o Claude testando ferramentas. Se acredita que veio do modelo, vai testar raciocínio. As duas avaliações são úteis, mas respondem perguntas diferentes. Misturá-las produz conclusões que não se sustentam quando alguém pergunta "como você sabe?".',
            ] }),
            c.tip({ title: 'Frase-modelo para usar', text: '"Os benchmarks mostram melhora do modelo. O prompt capturado mostra expansão do produto. As duas coisas aconteceram juntas; não sei qual causou o quê, e as fontes também não dizem."' }),
          ],
        },
        {
          emoji: '🔬', title: 'Julgue o modelo e o produto separadamente', sub: 'Duas réguas para duas coisas',
          what: 'Uma disciplina de avaliação: para cada observação, perguntar se está medindo raciocínio (modelo) ou memória, ferramentas, interface e política (produto).',
          why: 'É o veredito do próprio material-fonte e a base dos cinco testes práticos da Trilha 2.',
          keys: 'Camada do modelo, camada do produto, testes de produto, benchmarks de modelo.',
          body: (t) => [
            c.figure(t, svg.split(t, { label: 'Camada do modelo à esquerda, camada do produto à direita, com o que cada uma evidencia', bridge: 'julgar em separado', left: { title: 'Camada do modelo', items: ['O raciocínio melhorou', 'Benchmarks com agentes subiram', 'Medido em teste controlado', 'Independe do seu plano'] }, right: { title: 'Camada do produto', items: ['O sistema se expandiu', 'Memória, recuperação, visuais', 'Descoberta, pesquisa, controle', 'Varia por superfície e conta'] } }), 'A coluna da esquerda é medida por quem tem acesso ao modelo cru. A da direita você mesmo pode testar na sua conta, e é o que a Trilha 2 faz.'),
            c.steps(t, { title: 'Como aplicar as duas réguas', items: [
              { h: 'Anote a observação', sub: 'O que exatamente aconteceu?', text: '"Pedi uma comparação de três notebooks e recebi um cartão comparativo em vez de texto."' },
              { h: 'Classifique a camada', sub: 'Modelo ou produto?', text: 'Um cartão comparativo é interface. Camada de produto. O raciocínio que escolheu os três notebooks é modelo.' },
              { h: 'Escolha a régua', sub: 'Como isso se mede?', text: 'Interface se mede por utilidade e disponibilidade na sua conta. Raciocínio se mede por acerto e consistência.' },
              { h: 'Registre o contexto', sub: 'Superfície, plano, data', text: 'Testes de produto não são benchmarks universais. Sem o contexto, o resultado não serve para mais ninguém.' },
            ] }),
            c.tip({ title: 'O veredito do material-fonte', text: 'Fable 5.1 melhorou o modelo e o sistema ao redor dele. A qualidade cotidiana do Claude depende cada vez mais de como o produto lembra contexto, chama ferramentas e transforma raciocínio em resultado utilizável. Julgue os dois separadamente.' }),
          ],
        },
        {
          emoji: '🔒', title: 'Mais memória significa mais regras', sub: 'Normal, dependente de configuração, nunca armazenar',
          what: 'O prompt capturado define três faixas de contexto pessoal: o que se guarda normalmente, o que depende de configuração e o que nunca é guardado.',
          why: 'Memória melhor precisa ser compreensível e corrigível. E existem limites rígidos que nem seu pedido explícito desbloqueia.',
          keys: 'Estilo e preferências, tópicos sensíveis, categorias proibidas, omissão.',
          body: (t) => [
            c.p('Com mais capacidade de lembrar, o prompt ganhou regras sobre <strong class="text-emerald-400">o que pode ser mantido, aplicado, editado ou simplesmente deixado de lado</strong>. Três faixas:'),
            c.figure(t, svg.stack(t, { label: 'Três faixas de memória: normal por fora, dependente de configuração no meio, nunca armazenar no centro', layers: [
              { title: 'MEMÓRIA NORMAL', sub: 'estilo de escrita, preferências estáveis, pessoas, projetos ativos. Compacta e corrigível.' },
              { title: 'DEPENDENTE DE CONFIGURAÇÃO', sub: 'tópicos sensíveis (saúde, religião) só quando configuração e conversa tornam relevante' },
              { title: 'NUNCA ARMAZENAR', sub: 'dados de pagamento e categorias proibidas de histórico pessoal. Limite rígido.' },
            ] }), 'Quanto mais para dentro, mais rígida a regra. A faixa central não se abre nem com pedido explícito.'),
            c.table(t, { headers: ['Você diz...', 'O que o prompt capturado manda guardar'], rows: [
              ['"Tenho 52 anos e pulei a corrida por causa da diabetes; sugere um treino mais leve?"', 'Idade 52 e interesse em rotinas de exercício. Nada sobre saúde, nem "gerencia uma condição".'],
              ['"Sou enfermeira."', 'Guarda a profissão como dita.'],
              ['"Tenho TDAH, então preciso disso em blocos de 15 minutos."', 'Guarda a preferência de blocos de 15 minutos. O diagnóstico fica fora.'],
              ['"Nasci na Coreia."', 'Guarda a origem como dita. Nunca converte origem em categoria racial.'],
            ], caption: 'Exemplos do próprio bloco de omissão do prompt capturado, parafraseados.' }),
            c.alert({ title: 'Pedir não desbloqueia', text: 'O prompt capturado é explícito: quando você pede para o Claude lembrar algo que cai numa categoria bloqueada, ele não guarda. Inferência também é proibida: um sintoma mencionado nunca vira uma condição armazenada. E o que é permitido continua sendo guardado com normalidade; omitir um fato permitido é tratado como erro igual a guardar um proibido.' }),
          ],
        },
        {
          emoji: '✍️', title: 'O que muda no jeito de responder', sub: 'Tom, formatação mínima e a rotina do visual',
          what: 'Regras de estilo que estão no prompt capturado: tom caloroso, brevidade, formatação só quando ajuda, palavras banidas, e quando não usar bullets.',
          why: 'Explica por que respostas do Fable 5.1 parecem mais curtas e mais diretas. E dá pistas de como pedir melhor.',
          keys: 'Formatação mínima, sem "genuinamente", sem bullets ao recusar, resposta em vários turnos.',
          body: (t) => [
            c.p('Além das ferramentas, o prompt capturado carrega regras de <strong class="text-emerald-400">tom e formatação</strong>. Elas explicam boa parte da "sensação" de conversar com o Fable 5.1:'),
            c.cards(t, [
              { emoji: '🎚️', h: 'Formatação mínima', text: 'Listas e bullets só quando pedidos ou quando o conteúdo é multifacetado o bastante para ajudar. Em conversa pessoal ou emocional, nenhuma formatação.' },
              { emoji: '🚫', h: 'Palavras evitadas', text: '"Genuinamente", "honestamente", "direto ao ponto". O prompt diz que o modelo é honesto por padrão e que esses modificadores soam falsos.' },
              { emoji: '🤝', h: 'Recusa sem bullets', text: 'Ao declinar uma tarefa, nunca usar lista. O cuidado extra suaviza.' },
              { emoji: '⏱️', h: 'Curto, em turnos', text: 'Resposta focada e breve. Pode responder em vários turnos e avisar que tem mais a acrescentar, em vez de despejar tudo de uma vez.' },
              { emoji: '📎', h: 'Citação limitada', text: 'De resultados de busca: no máximo uma citação curta (menos de 15 palavras) por fonte. Nunca letras de música ou poemas.' },
              { emoji: '🔁', h: 'Atualizações durante ferramentas', text: 'Quando faz muitas chamadas de ferramenta, uma frase curta a cada duas ou três mantém você informado.' },
            ]),
            c.grid2(t, { okTitle: 'O que isso pede de você', ok: ['Peça o formato quando quiser um específico ("em tabela", "em três bullets").', 'Se quiser profundidade, diga "explicação completa"; o padrão é resumo de alto nível.', 'Aceite respostas em partes; peça "continua" quando ele oferecer mais.'], badTitle: 'O que não adianta mais', bad: ['Empilhar "seja conciso" três vezes: já é o padrão.', 'Pedir "seja honesto": o prompt já proíbe o modelo de se vender assim.', 'Esperar bullets numa conversa pessoal: ele vai responder em prosa de propósito.'] }),
          ],
        },
        {
          emoji: '🕳️', title: 'Onde o material é fraco (e o que fazer)', sub: 'Disponibilidade, congelamento, preço',
          what: 'Três lacunas do material-fonte que o curso precisa tratar: ferramentas variam por conta, o arquivo está congelado numa data, e nada fala de preço.',
          why: 'Reconhecer os buracos é o que torna o resto confiável. E é a ponte para as Trilhas 2 e 3.',
          keys: 'Superfície, plano, data de corte, preço e API.',
          body: (t) => [
            c.p('Um curso que só repete o material herda os buracos dele. Três lacunas precisam ficar explícitas:'),
            c.steps(t, { title: 'As três lacunas', items: [
              { h: 'Disponibilidade varia', sub: 'Superfície, plano, conta', text: 'As 46 ferramentas são definições no arquivo capturado. Você pode não ver as 13 visuais no seu plano, ou ver ferramentas que não estão lá (as do Claude Code, por exemplo). Por isso a Trilha 2 pede para você registrar superfície, plano e data em cada teste.' },
              { h: 'O arquivo está congelado', sub: '02/09/2026', text: 'O repositório e o produto podem mudar depois do corte. Uma afirmação deste curso tem validade "em setembro de 2026". Se algo não bater no seu teste, isso é dado, não falha.' },
              { h: 'Nada sobre preço nem API', sub: 'A maior lacuna', text: 'O material-fonte fala de aplicativo e produto. Não diz quanto custa, nem como o Fable 5.1 se comporta na API. A Trilha 3 usa a tabela oficial de preços e as medições de custo publicadas para fechar esse buraco.' },
            ] }),
            c.figure(t, svg.flow(t, { label: 'Ponte entre as três trilhas do curso', steps: [
              { title: 'Trilha 1', sub: 'entender|o que mudou' }, { title: 'Trilha 2', sub: 'testar|na sua conta' }, { title: 'Trilha 3', sub: 'medir|custo por tarefa' },
            ] }), 'Cada lacuna vira uma trilha: disponibilidade e congelamento pedem teste próprio (Trilha 2); preço pede medição (Trilha 3).'),
            c.tip({ title: 'Antes de seguir', text: 'Anote agora, num papel ou arquivo: qual superfície do Claude você usa (web, celular, Claude Code), qual plano, e a data de hoje. Você vai precisar disso em todos os testes da próxima trilha.' }),
          ],
        },
      ],
      quiz: [
        { q: '"O Fable 5.1 é melhor porque ganhou 28 ferramentas." Qual o problema?', options: ['As ferramentas não existem.', 'Benchmark mostra melhora do modelo; prompt mostra expansão do produto. Nenhuma fonte liga um ao outro.', 'O número correto é 46.'], answer: 1, why: 'Coexistência não estabelece causalidade. As duas afirmações são verdadeiras separadamente e devem ser ditas separadamente.' },
        { q: 'Você diz "tenho diabetes, quero um treino leve". O que o prompt capturado manda guardar na memória?', options: ['A diabetes e o interesse em treino.', 'Só o interesse em rotinas de exercício; nada sobre saúde.', 'Nada, porque a mensagem tem tema de saúde.'], answer: 1, why: 'O fato permitido (exercício) é guardado com normalidade. O de saúde fica fora inteiro, nem como "gerencia uma condição".' },
        { q: 'Um teste que você faz na sua conta do Claude é:', options: ['Um benchmark universal do modelo.', 'Um teste de produto, válido para sua superfície, plano e data.', 'Inválido, porque só a Anthropic pode testar.'], answer: 1, why: 'Por isso o registro de contexto é obrigatório. O resultado vale para as condições em que foi obtido.' },
      ],
      summary: [
        ['Três benchmarks subiram', 'ciência 24,7→52,6; negócios 17,1→31,4; programação 70,5→73,4. Selecionados pela Anthropic; medem o modelo.'],
        ['Coexistência não é causalidade', 'modelo melhorou E produto cresceu. Nenhuma fonte liga um ao outro.'],
        ['Duas réguas', 'raciocínio se mede em benchmark; memória, ferramentas, interface e política se testam na sua conta.'],
        ['Três faixas de memória', 'normal, dependente de configuração, nunca armazenar. Pedir não desbloqueia; inferir é proibido.'],
        ['Tom e formatação', 'curto, formatação mínima, sem palavras de autoconvencimento, sem bullets ao recusar, citação limitada.'],
        ['Três lacunas', 'disponibilidade varia, arquivo congelado em 02/09/2026, nada sobre preço. Viram as Trilhas 2 e 3.'],
      ],
    },
  ],
};
