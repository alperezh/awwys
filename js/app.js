/* ============================================================
   Awwy's — maqueta estática
   Todo el arte es SVG generado en el cliente: no hay imágenes,
   así la maqueta sirve para iterar el diseño sin depender de assets.
   ============================================================ */
(() => {
  'use strict';

  /* ── Los diez Awwy's de la serie 01 ─────────────────── */
  const AWWYS = [
    { id:'01', name:'Drizzle',    tag:'Finds beauty<br>in quiet rains.',      coat:'#a8c6ef', hood:'plain',    eyes:'open',  extra:'drops' },
    { id:'02', name:'Umbrella',   tag:'Brings a little<br>sunshine anyway.',  coat:'#f7d982', hood:'plain',    eyes:'open',  extra:'umbrella' },
    { id:'03', name:'Puddle',     tag:'Small moments,<br>big joy.',           coat:'#9ed49b', hood:'frog',     eyes:'open',  extra:'' },
    { id:'04', name:'Cloudy',     tag:'Soft days<br>are still bright.',       coat:'#f4f2ee', hood:'cloud',    eyes:'happy', extra:'' },
    { id:'05', name:'Paper Boat', tag:'Big dreams<br>in little boats.',       coat:'#f7c8d8', hood:'plain',    eyes:'open',  extra:'boat' },
    { id:'06', name:'Waiting',    tag:'Good things<br>take time.',            coat:'#f6f4f1', hood:'panda',    eyes:'open',  extra:'' },
    { id:'07', name:'Joy',        tag:'Dances in<br>the little things.',      coat:'#bcd8f5', hood:'plain',    eyes:'happy', extra:'drops' },
    { id:'08', name:'Leaf',       tag:'Nature<br>always protects.',           coat:'#f7c3cf', hood:'plain',    eyes:'open',  extra:'leaf' },
    { id:'09', name:'Cozy',       tag:'Rainy days<br>feel safer.',            coat:'#33302e', hood:'plain',    eyes:'sleep', extra:'' },
    { id:'10', name:'Rainbow',    tag:"After rain,<br>there's always color.", coat:'rainbow', hood:'plain',    eyes:'open',  extra:'' }
  ];

  /* ── Utilidades de color ────────────────────────────── */
  let uid = 0;

  /** Oscurece un hex un `amount` (0-1) para sombras y botas. */
  function shade(hex, amount = .12){
    if (hex === 'rainbow') return '#d9cbe8';
    const n = parseInt(hex.slice(1), 16);
    const mix = c => Math.max(0, Math.round(c * (1 - amount)));
    return '#' + [ (n >> 16) & 255, (n >> 8) & 255, n & 255 ]
      .map(c => mix(c).toString(16).padStart(2, '0')).join('');
  }

  /* ── Piezas del personaje ───────────────────────────── */
  function eyesFor(kind){
    if (kind === 'happy') return `
      <path class="ln nf" d="M55 79q7-8 14 0"/>
      <path class="ln nf" d="M71 79q7-8 14 0"/>`;
    if (kind === 'sleep') return `
      <path class="ln nf" d="M55 76q7 8 14 0"/>
      <path class="ln nf" d="M71 76q7 8 14 0"/>`;
    return `
      <ellipse class="ln" fill="#211f1d" cx="60" cy="79" rx="4.8" ry="5.8"/>
      <ellipse class="ln" fill="#211f1d" cx="80" cy="79" rx="4.8" ry="5.8"/>
      <circle fill="#fff" cx="58.2" cy="76.8" r="1.5"/>
      <circle fill="#fff" cx="78.2" cy="76.8" r="1.5"/>`;
  }

  function hoodFor(kind, coat){
    const base = `<path class="ln" fill="${coat}" d="M70 12c-25 0-44 21-44 47 0 24 18 41 44 41s44-17 44-41c0-26-19-47-44-47z"/>`;
    const gloss = `<path class="ln nf" d="M44 34c6-8 15-13 25-14" opacity=".3"/>`;
    if (kind === 'frog') return base + gloss + `
      <circle class="ln" fill="${coat}" cx="47" cy="26" r="15"/>
      <circle class="ln" fill="${coat}" cx="93" cy="26" r="15"/>
      <circle class="ln" fill="#fff" cx="47" cy="26" r="8.5"/>
      <circle class="ln" fill="#fff" cx="93" cy="26" r="8.5"/>
      <circle fill="#211f1d" cx="47" cy="27" r="4.4"/>
      <circle fill="#211f1d" cx="93" cy="27" r="4.4"/>`;
    if (kind === 'panda') return `
      <circle class="ln" fill="#211f1d" cx="35" cy="33" r="14"/>
      <circle class="ln" fill="#211f1d" cx="105" cy="33" r="14"/>` + base + gloss;
    if (kind === 'cloud') return `
      <circle class="ln" fill="${coat}" cx="42" cy="32" r="17"/>
      <circle class="ln" fill="${coat}" cx="70" cy="18" r="19"/>
      <circle class="ln" fill="${coat}" cx="98" cy="32" r="17"/>` + base;
    return base + gloss;
  }

  function extraFor(kind){
    if (kind === 'drops') return `
      <g fill="#a9cdf2" stroke="none" opacity=".9">
        <path class="drop" transform="translate(14,22)" d="M0 0c3.5 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6 6-11z"/>
        <path class="drop" transform="translate(126,16)" d="M0 0c3.5 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6 6-11z"/>
        <path class="drop" transform="translate(6,72)" d="M0 0c3.5 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6 6-11z"/>
      </g>`;
    if (kind === 'umbrella') return `
      <g transform="translate(0,-14)">
        <path class="ln nf" d="M70 16V2"/>
        <path class="ln" fill="rgba(255,255,255,.72)" d="M8 16a62 30 0 0 1 124 0q-15.5 8-31 0-15.5 8-31 0-15.5 8-31 0-15.5 8-31 0z"/>
        <path class="ln nf" d="M130 24v20a9 9 0 0 1-18 0"/>
      </g>`;
    if (kind === 'leaf') return `
      <g>
        <path class="ln nf" d="M70 20c1-8 4-12 7-15"/>
        <path class="ln" fill="#9ed49b" d="M78 5c16-9 38-1 38-1s-8 23-27 25c-12 1-18-16-11-24z"/>
        <path class="ln" fill="#86c485" d="M64 9C48 0 26 8 26 8s8 23 27 25c12 1 18-16 11-24z"/>
      </g>`;
    if (kind === 'boat') return `
      <g transform="translate(112,146)">
        <path class="ln" fill="#fff" d="M-16 0h32l-7 13h-18z"/>
        <path class="ln" fill="#fff" d="M-11-2 0-15l11 13z"/>
      </g>`;
    return '';
  }

  /** Devuelve el SVG completo de un Awwy. */
  function awwySVG(a){
    const gid = `awwy-grad-${++uid}`;
    const isRainbow = a.coat === 'rainbow';
    const coat = isRainbow ? `url(#${gid})` : a.coat;
    const boots = isRainbow ? '#cbb9e2' : shade(a.coat, .16);

    return `
<svg class="awwy" viewBox="-8 -26 156 212" role="img" aria-label="Awwy ${a.name}">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd7e6"/><stop offset=".35" stop-color="#d9dbf6"/>
      <stop offset=".7" stop-color="#c9ecdf"/><stop offset="1" stop-color="#ffeec2"/>
    </linearGradient>
  </defs>

  <ellipse fill="rgba(33,31,29,.13)" cx="70" cy="171" rx="38" ry="7"/>

  <!-- botas -->
  <rect class="ln" fill="${boots}" x="45" y="141" width="23" height="19" rx="9.5"/>
  <rect class="ln" fill="${boots}" x="72" y="141" width="23" height="19" rx="9.5"/>

  <!-- cuerpo y brazos -->
  <ellipse class="ln" fill="${coat}" cx="33" cy="126" rx="9.5" ry="16"/>
  <ellipse class="ln" fill="${coat}" cx="107" cy="126" rx="9.5" ry="16"/>
  <path class="ln" fill="${coat}" d="M70 92c-17 0-29 9-33 24-3 10-4 19-4 26 0 5 4 9 9 9h56c5 0 9-4 9-9 0-7-1-16-4-26-4-15-16-24-33-24z"/>
  <path class="ln nf" d="M70 108v38" opacity=".28"/>

  <!-- capucha -->
  ${hoodFor(a.hood, coat)}

  <!-- cara -->
  <ellipse class="ln" fill="#fae3d3" cx="70" cy="80" rx="24" ry="23.5"/>
  ${eyesFor(a.eyes)}
  <ellipse fill="#ffb9cf" opacity=".5" cx="52" cy="89" rx="6" ry="3.6"/>
  <ellipse fill="#ffb9cf" opacity=".5" cx="88" cy="89" rx="6" ry="3.6"/>

  ${extraFor(a.extra)}
</svg>`;
  }

  /* ── Pintar personajes ──────────────────────────────── */
  const byId = id => AWWYS.find(a => a.id === id) || AWWYS[0];

  document.querySelectorAll('[data-awwy]').forEach(el => {
    el.innerHTML = awwySVG(byId(el.dataset.awwy));
  });

  const grid = document.querySelector('[data-char-grid]');
  if (grid){
    grid.innerHTML = AWWYS.map(a => `
      <li class="char">
        <a class="char__art" href="#collection" aria-label="${a.name}">${awwySVG(a)}</a>
        <p class="char__name">${a.id} ${a.name}</p>
        <p class="char__tag">${a.tag}</p>
      </li>`).join('');
  }

  /* ── Carrusel del hero ──────────────────────────────── */
  const slides = [...document.querySelectorAll('.hero__slide')];
  const dotsBox = document.querySelector('.hero__dots');

  if (slides.length && dotsBox){
    let index = 0;
    let timer;

    dotsBox.innerHTML = slides.map((_, i) =>
      `<button role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}"></button>`).join('');
    const dots = [...dotsBox.children];

    function go(next){
      index = (next + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle('is-active', i === index);
        s.setAttribute('aria-hidden', String(i !== index));
      });
      dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
    }

    function autoplay(){
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 6500);
    }

    document.querySelector('.hero__arrow--prev').addEventListener('click', () => { go(index - 1); autoplay(); });
    document.querySelector('.hero__arrow--next').addEventListener('click', () => { go(index + 1); autoplay(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); autoplay(); }));

    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', autoplay);
    autoplay();
  }

  /* ── Menú móvil ─────────────────────────────────────── */
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  if (burger && nav){
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')){
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Newsletter (maqueta: sin backend) ──────────────── */
  const form = document.querySelector('[data-news]');
  if (form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.reset();
      document.querySelector('[data-news-note]').textContent = "You're in! Welcome to the Awwy club ♡";
    });
  }

  /* ── Detalles ───────────────────────────────────────── */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
