// Configuração
const CONFIG = {
  // Vídeo da abertura gerado no Higgsfield. Para hospedar junto com o site, rode ./baixar-midia.sh.
  aberturaVideoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3K2leFyP9UFWbuiqKIKWrHzt4GF/hf_20261016_222610_04c219c7-4451-4959-aafe-6844e6c1c9ff.mp4',
};

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Abertura: a posição da rolagem escolhe o quadro do vídeo e qual frase aparece.
const abertura = document.querySelector('[data-abertura]');
const video = document.querySelector('[data-abertura-video]');
const dica = document.querySelector('[data-dica]');
const batidas = [...document.querySelectorAll('[data-batida]')].map((el) => {
  const [inicio, fim] = el.dataset.batida.split(' ').map(Number);
  return { el, inicio, fim };
});

if (abertura && video && CONFIG.aberturaVideoUrl && !reduzMovimento) {
  abertura.classList.add('abertura--ativa');
  video.src = CONFIG.aberturaVideoUrl;

  // Safari no iPhone só aceita trocar o quadro depois que o vídeo tocou uma vez.
  const destravar = () => {
    video.play().then(() => video.pause()).catch(() => {});
    window.removeEventListener('touchstart', destravar);
  };
  window.addEventListener('touchstart', destravar, { passive: true });

  const FADE = 0.06;
  const suave = (x) => {
    const t = Math.min(1, Math.max(0, x));
    return t * t * (3 - 2 * t);
  };

  let alvo = 0;
  let atual = 0;

  const progresso = () => {
    const caixa = abertura.getBoundingClientRect();
    const percurso = caixa.height - window.innerHeight;
    return percurso > 0 ? Math.min(1, Math.max(0, -caixa.top / percurso)) : 0;
  };

  const desenhar = () => {
    alvo = progresso();
    // Aproxima aos poucos para a imagem não pular quando a rolagem é brusca.
    atual += (alvo - atual) * 0.14;
    if (Math.abs(alvo - atual) < 0.0005) atual = alvo;

    if (video.duration && !video.seeking) {
      const t = atual * (video.duration - 0.05);
      if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
    }

    for (const { el, inicio, fim } of batidas) {
      const entra = inicio === 0 ? 1 : suave((atual - inicio) / FADE);
      const sai = fim === 1 ? 1 : suave((fim - atual) / FADE);
      // Quem navega pelo teclado e foca o botão vê a frase mesmo fora do momento dela.
      const opacidade = el.matches(':focus-within') ? 1 : Math.min(entra, sai);
      el.style.opacity = opacidade;
      el.style.setProperty('--sobe', `${(1 - opacidade) * 24}px`);
    }
    if (dica) dica.style.opacity = atual > 0.02 ? 0 : 1;

    requestAnimationFrame(desenhar);
  };
  requestAnimationFrame(desenhar);
}

// Topo: ganha fundo sólido quando a abertura sai da tela
const topo = document.querySelector('.topo');
if (topo && abertura) {
  new IntersectionObserver(([e]) => topo.classList.toggle('topo--solido', !e.isIntersecting), {
    rootMargin: '-80px 0px 0px 0px',
  }).observe(abertura);
}

// Coleção: filtros por tema
const filtros = [...document.querySelectorAll('[data-filtro]')];
const livros = [...document.querySelectorAll('[data-livros] .livro')];
const filtrar = (tema) => {
  filtros.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === tema)));
  livros.forEach((l) => { l.hidden = tema !== 'todos' && l.dataset.categoria !== tema; });
};
filtros.forEach((b) => b.addEventListener('click', () => filtrar(b.dataset.filtro)));
document.querySelectorAll('[data-filtro-ir]').forEach((a) => {
  a.addEventListener('click', () => filtrar(a.dataset.filtroIr));
});

// Entrada suave das seções
if (!reduzMovimento && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('revela-pronto');
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (e.isIntersecting) { e.target.classList.add('visivel'); observador.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-revela]').forEach((el) => observador.observe(el));
}
