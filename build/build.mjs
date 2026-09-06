// Gera o curso v2 (landing + 3 trilhas + 9 módulos) em ../ (raiz) e ../curso/trilhaN/
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TRACKS, COURSE_TITLE, COURSE_SUB, LOGO, manifest, head, nav, footer, scripts, modulePage, trackIndex, svg, SOURCE_OFFICIAL, SOURCE_INDEX, SOURCE_DUMP, SOURCE_PRODUCT } from './lib.mjs';
import { T1 } from './content-t1.mjs';
import { T2 } from './content-t2.mjs';
import { T3 } from './content-t3.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..');
const out = (p) => join(ROOT, p);

const tracks = [T1, T2, T3].map((tc, i) => ({ ...TRACKS[i], modules: tc.modules }));
const manifestJson = manifest(tracks);

// assets
mkdirSync(out('assets'), { recursive: true });
const SK = process.env.HOME + '/.claude/skills/formato-curso-v2/assets';
copyFileSync(join(SK, 'learn.css'), out('assets/learn.css'));
copyFileSync(join(SK, 'learn.js'), out('assets/learn.js'));

// ---- módulos + índices de trilha ----
const heroFor = (t) => {
  const items = t.modules.map(m => `${m.id.replace('-', '.')} ${m.title}`);
  const total = t.modules.reduce((a, m) => a + m.topics.length, 0);
  return svg.fanout(t, { label: `Diagrama dos ${t.modules.length} módulos da trilha ${t.n}: ${t.title}`, center: `Trilha ${t.n}|${t.short}|${total} tópicos`, groups: t.modules.map(m => ({ n: m.topics.length, title: `${m.id.replace('-', '.')} ${m.title}`, sub: m.punch })) });
};

for (const t of tracks) {
  const dir = out(`curso/${t.slug}`);
  mkdirSync(dir, { recursive: true });
  t.modules.forEach((m, i) => {
    const html = modulePage({ t, m, prev: t.modules[i - 1], next: t.modules[i + 1], manifestJson });
    writeFileSync(join(dir, `modulo-${m.id}.html`), html);
  });
  writeFileSync(join(dir, 'index.html'), trackIndex({ t, manifestJson, heroSvg: heroFor(t) }));
}

// ---- landing ----
const totalModules = tracks.reduce((a, t) => a + t.modules.length, 0);
const totalTopics = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.topics.length, 0), 0);
const totalMin = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.minutes, 0), 0);
const t1 = tracks[0];

const heroSvg = svg.split(t1, { label: 'Diagrama do paradoxo do Fable 5.1: a camada do modelo melhorou e a camada do produto se expandiu; devem ser julgadas separadamente', bridge: 'julgar separado', left: { title: 'MODELO', items: ['Raciocínio melhorou', 'Ciência 24,7 → 52,6', 'Negócios 17,1 → 31,4', 'Código 70,5 → 73,4'] }, right: { title: 'PRODUTO', items: ['Prompt 2,3x maior', '+28 ferramentas (46)', 'Memória em arquivos', '13 respostas visuais', 'Custo: 2x Opus por token'] } });

const trackCard = (t) => {
  const topics = t.modules.reduce((a, m) => a + m.topics.length, 0);
  const min = t.modules.reduce((a, m) => a + m.minutes, 0);
  return `
      <a href="curso/${t.slug}/index.html" class="group block bg-dark-800 rounded-2xl border border-dark-600 hover:border-${t.color}-500/30 transition-all overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-${t.color}-900/30 to-dark-800 p-8">
          <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span class="inline-block px-3 py-1 bg-${t.color}-500/20 text-${t.color}-400 text-xs font-semibold rounded-full">TRILHA ${t.n}${t.n === 1 ? ' · COMECE AQUI' : ''}</span>
            <span class="text-sm text-neutral-500">${t.modules.length} módulos · ${topics} tópicos · ~${Math.round(min / 60 * 10) / 10}h</span>
          </div>
          <h3 class="text-2xl font-bold mb-3 group-hover:text-${t.color}-400 transition-colors">${t.emoji} ${t.title}</h3>
          <p class="text-neutral-400 mb-6 max-w-3xl">${t.desc}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${t.modules.map(m => `<span class="text-xs px-2.5 py-1 rounded-md bg-dark-900/60 border border-dark-600 text-neutral-300">${m.id.replace('-', '.')} ${m.title}</span>`).join('')}
          </div>
          <div data-inema-meter="trilha:${t.n}" class="inema-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso da trilha ${t.n}">
            <div class="flex justify-between text-xs text-neutral-500 mb-1"><span data-inema-meter-frac>0 de ${topics}</span><span data-inema-meter-pct>0%</span></div>
            <div class="inema-bar h-1.5 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-${t.color}-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
          </div>
          <span class="inline-flex items-center gap-1 text-${t.color}-400 font-semibold mt-5 group-hover:gap-2 transition-all">Entrar na trilha &#8594;</span>
        </div>
      </a>`;
};

const landing = head({ rel: '.', title: 'Início', desc: `${COURSE_TITLE}: ${COURSE_SUB}. Curso curto em 3 trilhas para entender o que mudou no Claude Fable 5.1, testar na própria conta e gastar menos.`, manifestJson }) + nav({ rel: '.', active: 0 }) + `
  <!-- HERO -->
  <header class="relative overflow-hidden bg-gradient-to-br from-emerald-900/30 via-dark-800 to-dark-800 border-b border-dark-600">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mb-6 tracking-wider">CURSO CURTO · ACESSO LIVRE · ~${Math.round(totalMin / 60 * 10) / 10}h</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">${LOGO} ${COURSE_TITLE}</h1>
        <p class="text-2xl text-emerald-400 font-semibold mb-4">${COURSE_SUB}</p>
        <p class="text-lg text-neutral-300 max-w-xl mb-8 leading-relaxed">
          O Fable 5.1 pontua mais alto. O sistema ao redor dele ficou <strong class="text-neutral-100">2,3 vezes maior</strong>, com 28 ferramentas novas. E por token ele custa <strong class="text-neutral-100">o dobro</strong> do Opus 5.
          Três trilhas curtas para <strong class="text-emerald-400">entender</strong> a mudança sem hype, <strong class="text-blue-400">testar</strong> na sua própria conta e <strong class="text-purple-400">gastar menos</strong> medindo custo por tarefa.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar agora &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Continuar de onde parei</button>
        </div>
        <div data-inema-meter="curso" class="inema-meter max-w-md" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do curso">
          <div class="flex justify-between text-sm text-neutral-400 mb-1"><span data-inema-meter-frac>0 de ${totalTopics} tópicos</span><span data-inema-meter-pct>0%</span></div>
          <div class="inema-bar h-2 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-emerald-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
        </div>
      </div>
      <div class="rounded-2xl border border-emerald-500/30 bg-dark-900/40 p-3 sm:p-4">${heroSvg}</div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${[['3', 'Trilhas'], [totalModules, 'Módulos'], [totalTopics, 'Tópicos'], [`~${Math.round(totalMin / 60 * 10) / 10}h`, 'Duração']].map(([v, l]) => `<div class="bg-dark-800/50 rounded-xl p-5 border border-dark-600 text-center"><div class="text-3xl font-extrabold text-emerald-400">${v}</div><div class="text-xs text-neutral-400 mt-1">${l}</div></div>`).join('')}
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- O PARADOXO -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Comece pelos três números</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">O modelo melhorou. O sistema cresceu. Ninguém provou que um causou o outro.</h2>
        <p class="text-lg text-neutral-400">Este curso não vende o Fable 5.1 nem o desmonta. Ensina a separar o que é oficial do que é extraído, o que é modelo do que é produto, e o que é preço por token do que é custo por tarefa.</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-emerald-400 mb-2">2,3x</div><p class="text-neutral-300 text-sm">Palavras no prompt capturado: 17.501 no Fable 5 para 40.046 no 5.1.</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-blue-400 mb-2">+28</div><p class="text-neutral-300 text-sm">Ferramentas adicionadas. 18 mantidas, 46 no total, zero removidas.</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-purple-400 mb-2">75%</div><p class="text-neutral-300 text-sm">Do crescimento é memória e schemas de ferramentas. Não é texto de personalidade.</p></div>
      </div>
    </section>

    <!-- A PROMESSA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A promessa</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">O que você sai sabendo fazer</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        ${[
          ['🗣️', 'Explicar a mudança em dois minutos', 'Sem usar a palavra "melhor". Separando prompt oficial de extração, modelo de produto.'],
          ['🧪', 'Rodar os cinco testes na sua conta', 'Continuidade, registro, interface, capacidade e controle. Com ficha datada e veredito de uma frase.'],
          ['✂️', 'Reescrever seus prompts', 'Tirar o andaime que o Fable 5.1 não precisa; acrescentar o que ele não adivinha: público, formato, gatilhos.'],
          ['🎚️', 'Usar o botão de esforço', 'Saber se sua tarefa tem curva plana ou íngreme, e quanto isso vale em tempo e custo.'],
          ['🧮', 'Calcular custo por tarefa', 'Não por token. Contando tentativas, retrabalho e a cauda das tarefas difíceis.'],
          ['🔧', 'Aplicar as alavancas da API (opcional)', 'Cache, esforço por mensagem, orçamento de tarefa, lote e fallbacks, na ordem certa.'],
        ].map(([e, h, p]) => `<div class="flex items-start gap-4 bg-dark-800 rounded-xl border border-dark-600 p-6"><span class="text-2xl mt-0.5">${e}</span><div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div></div>`).join('')}
      </div>
    </section>

    <!-- TRILHAS -->
    <section id="trilhas" class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A jornada</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Três trilhas: entender, testar, economizar</h2>
        <p class="text-lg text-neutral-400">Cada módulo tem uma ideia central, exercícios que você roda de verdade e um teste rápido de três perguntas. Cada trilha fecha com um teste de saída.</p>
      </div>
      ${tracks.map(trackCard).join('')}
    </section>

    <!-- PARA QUEM -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Para quem é</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Quem usa o Claude no dia a dia e quer decidir com dados</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${[['💬', 'Assinante do Claude', 'que quer saber o que a memória e as ferramentas novas fazem, e testar na própria conta.'], ['⌨️', 'Usuário do Claude Code', 'que quer usar o esforço e a memória em arquivo com critério.'], ['📣', 'Quem explica IA para outros', 'e precisa de vocabulário seguro para não vender hype nem desinformar.'], ['🧑‍💻', 'Quem programa contra a API', 'e quer cortar custo sem cortar qualidade (módulo opcional).']].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6 text-center"><div class="text-3xl mb-3">${e}</div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- EXPERIÊNCIA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Sua experiência</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Mais que ler: uma plataforma de aprendizado</h2>
        <p class="text-lg text-neutral-400">Tudo roda no seu navegador, sem login. O curso lembra onde você parou.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${[['✅', 'Progresso automático', 'Marque tópicos como lidos e veja a evolução por módulo, trilha e curso.'], ['✍️', 'Anotações e grifos', 'Selecione qualquer trecho para grifar ou anotar. Fica salvo no seu navegador.'], ['🧭', 'Minha jornada', 'Continue de onde parou e veja tudo que já estudou num painel.'], ['🌓', 'Temas e leitura', 'Escuro, claro, sépia, foco, alto contraste. Tamanho de fonte e entrelinha.'], ['🧪', 'Quiz por módulo', 'Três perguntas com resposta e explicação, para checar se entendeu.'], ['📋', 'Ficha dos cinco testes', 'O certificado prático: sua avaliação datada do produto na sua conta.']].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6"><div class="text-2xl mb-2">${e}</div><h3 class="font-semibold text-emerald-400 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- FONTES -->
    <section class="py-16 border-b border-dark-600">
      <div class="max-w-3xl mx-auto">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Fontes e limites</span>
        <h2 class="text-3xl font-bold mt-3 mb-6">De onde vem o que este curso afirma</h2>
        <div class="space-y-4 text-neutral-300">
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Prompt de sistema oficial</p><p class="text-sm">Publicado pela Anthropic para os aplicativos web e móveis. <a href="${SOURCE_OFFICIAL}" target="_blank" class="text-sky-400 hover:text-sky-300">Fable 5.1</a> · <a href="${SOURCE_INDEX}" target="_blank" class="text-sky-400 hover:text-sky-300">índice de todas as versões</a>.</p></div>
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Runtime capturado (não autenticado)</p><p class="text-sm">Extração pública do prompt completo com memória, busca, artefatos e 46 ferramentas, congelada em 02/09/2026. <a href="${SOURCE_DUMP}" target="_blank" class="text-sky-400 hover:text-sky-300">Repositório</a>. Este curso o chama sempre de "prompt capturado".</p></div>
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Benchmarks e preços</p><p class="text-sm"><a href="${SOURCE_PRODUCT}" target="_blank" class="text-sky-400 hover:text-sky-300">Página do produto</a> da Anthropic (pontuações) e tabela oficial de preços da API. As medições de custo por esforço são da guia oficial de otimização de custo, feitas com o Fable 5.</p></div>
          <div class="bg-red-900/20 rounded-xl border border-red-500/30 p-5"><p class="font-semibold text-red-400 mb-1">Limites</p><p class="text-sm">O arquivo capturado não é autenticado. Definição de ferramenta não é disponibilidade na sua conta. Coexistência não é causalidade. O produto pode ter mudado depois de setembro de 2026.</p></div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="py-20">
      <div class="bg-gradient-to-br from-emerald-900/40 via-dark-800 to-dark-800 rounded-3xl border border-emerald-500/30 p-10 sm:p-14 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Pronto para julgar o Fable 5.1 com as suas próprias medições?</h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">Comece pela Trilha 1. Em cerca de ${Math.round(totalMin / 60 * 10) / 10} horas você sai com vocabulário seguro, cinco testes feitos e um plano de custo por tarefa.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar pela Trilha 1 &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Minha jornada</button>
        </div>
      </div>
    </section>
  </main>
` + footer({}) + scripts({ rel: '.' });

writeFileSync(out('index.html'), landing);
console.log(`ok: ${totalModules} módulos, ${totalTopics} tópicos, ~${totalMin} min`);
