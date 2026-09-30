// Configuração: preencha com os endereços reais antes de publicar.
const CONFIG = {
  // Link do checkout da Hotmart. Enquanto estiver vazio, os botões levam à seção de preço.
  checkoutUrl: '',
  // Endereço de incorporação do vídeo de 5 minutos (ex.: https://www.youtube-nocookie.com/embed/ID).
  // Enquanto estiver vazio, o botão "Assistir" fica escondido e só a prévia aparece.
  videoEmbedUrl: '',
  // Prévia sem som gerada no Higgsfield (roda em loop atrás do botão).
  previaUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3K2leFyP9UFWbuiqKIKWrHzt4GF/hf_20260930_130851_260adce4-64a8-4c34-b014-2dbe400634c0.mp4',
};

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Botões de compra
if (CONFIG.checkoutUrl) {
  document.querySelectorAll('[data-checkout]').forEach((a) => {
    a.href = CONFIG.checkoutUrl;
    a.rel = 'noopener';
  });
}

// Prévia do vídeo: só toca quando está na tela e sem pedido de movimento reduzido
const previa = document.getElementById('video-previa');
if (previa && CONFIG.previaUrl && !reduzMovimento) {
  previa.src = CONFIG.previaUrl;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) previa.play().catch(() => {});
    else previa.pause();
  }, { threshold: 0.4 }).observe(previa);
}

// Vídeo completo em janela
const botaoVideo = document.querySelector('[data-video-abrir]');
const modal = document.querySelector('[data-video-modal]');
const quadro = document.querySelector('[data-video-quadro]');
if (botaoVideo && modal && CONFIG.videoEmbedUrl) {
  botaoVideo.hidden = false;
  botaoVideo.addEventListener('click', () => {
    const sep = CONFIG.videoEmbedUrl.includes('?') ? '&' : '?';
    quadro.innerHTML = `<iframe src="${CONFIG.videoEmbedUrl}${sep}autoplay=1" title="Vídeo: os quatro passos do Método CASA" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    previa.pause();
    modal.showModal();
  });
  const fechar = () => { quadro.innerHTML = ''; if (modal.open) modal.close(); };
  modal.querySelector('[data-video-fechar]').addEventListener('click', fechar);
  modal.addEventListener('close', () => { quadro.innerHTML = ''; });
  modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); });
}

// Abas "de qual lado você está"
document.querySelectorAll('[data-abas]').forEach((grupo) => {
  const abas = [...grupo.querySelectorAll('[role="tab"]')];
  const ativar = (aba, focar) => {
    abas.forEach((a) => {
      const sel = a === aba;
      a.setAttribute('aria-selected', String(sel));
      a.tabIndex = sel ? 0 : -1;
      document.getElementById(a.getAttribute('aria-controls')).hidden = !sel;
    });
    if (focar) aba.focus();
  };
  abas.forEach((aba, i) => {
    aba.addEventListener('click', () => ativar(aba, false));
    aba.addEventListener('keydown', (e) => {
      const mapa = { ArrowRight: 1, ArrowLeft: -1 };
      if (e.key in mapa) {
        e.preventDefault();
        ativar(abas[(i + mapa[e.key] + abas.length) % abas.length], true);
      } else if (e.key === 'Home') { e.preventDefault(); ativar(abas[0], true); }
      else if (e.key === 'End') { e.preventDefault(); ativar(abas[abas.length - 1], true); }
    });
  });
});

// Barra fixa no celular: aparece depois da abertura e some na seção de preço
const barra = document.querySelector('[data-barra]');
const abertura = document.getElementById('inicio');
const oferta = document.getElementById('oferta');
if (barra && abertura && oferta) {
  let passouAbertura = false;
  let vendoOferta = false;
  const atualizar = () => barra.classList.toggle('visivel', passouAbertura && !vendoOferta);
  new IntersectionObserver(([e]) => { passouAbertura = !e.isIntersecting; atualizar(); }).observe(abertura);
  new IntersectionObserver(([e]) => { vendoOferta = e.isIntersecting; atualizar(); }).observe(oferta);
}
