/* ===================================================
   SOLID DOORS & MOLDINGS — Door Story (Apple-style scroll film)
   128 real-footage frames drawn to a canvas as you scroll:
   frames 0–71  a solid wood pivot door opens (Pexels 39576517)
   push-in      the camera zooms into the open door and dissolves
   frames 72–127 walk through a doorway into a warm room (Pexels 29882731)
   =================================================== */

(function () {
  const section = document.getElementById('door-story');
  if (!section) return;

  const stage = section.querySelector('.ds-stage');
  const canvas = section.querySelector('.ds-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const caps = Array.from(section.querySelectorAll('.ds-cap'));
  const chapters = Array.from(section.querySelectorAll('.ds-chapters span'));
  const hint = section.querySelector('.ds-hint');
  const shade = section.querySelector('.ds-shade');
  const bar = section.querySelector('.ds-progress span');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const portraitMQ = window.matchMedia('(max-width: 860px), (orientation: portrait) and (max-width: 1100px)');

  const TOTAL = 128, A_END = 71, B_START = 72;
  // Where the open door sits in each frame set (fraction of the frame), used as the push-in focus.
  const FOCUS = { d: [0.555, 0.40], m: [0.64, 0.40] };

  /* ─── Helpers ─── */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => t * t * (3 - 2 * t);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));

  /* ─── Frames ─── */
  let set = null, frames = [], loaded = [], loadedCount = 0;
  let introResolve = null;
  const introReady = new Promise((res) => { introResolve = res; });
  function frameUrl(s, i) { return 'images/seq/' + s + '/' + String(i).padStart(3, '0') + '.webp'; }

  function loadSet(s) {
    if (s === set) return;
    set = s;
    frames = new Array(TOTAL);
    loaded = new Array(TOTAL).fill(false);
    loadedCount = 0;
    // Coarse-to-fine order: the film is scrubbable almost immediately, then fills in.
    const order = [], seen = new Set();
    [16, 8, 4, 2, 1].forEach((step) => {
      for (let i = 0; i < TOTAL; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
    });
    if (!seen.has(TOTAL - 1)) order.splice(1, 0, TOTAL - 1);
    let next = 0, active = 0;
    const pump = () => {
      while (active < 6 && next < order.length) {
        const i = order[next++], img = new Image(), mySet = s;
        active++;
        img.decoding = 'async';
        img.onload = () => {
          active--;
          if (mySet !== set) return;
          frames[i] = img; loaded[i] = true; loadedCount++;
          if (i === 0) { section.classList.add('ds-ready'); requestDraw(true); }
          else requestDraw(true);
          if (loaded[0] && loadedCount >= 10 && introResolve) { introResolve(); introResolve = null; }
          pump();
        };
        img.onerror = () => { active--; pump(); };
        img.src = frameUrl(s, i);
      }
    };
    pump();
  }

  function nearest(i) {
    if (loaded[i]) return frames[i];
    for (let d = 1; d < TOTAL; d++) {
      if (i - d >= 0 && loaded[i - d]) return frames[i - d];
      if (i + d < TOTAL && loaded[i + d]) return frames[i + d];
    }
    return null;
  }

  /* ─── Canvas ─── */
  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth; H = stage.clientHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    loadSet(portraitMQ.matches ? 'm' : 'd');
    requestDraw(true);
  }

  // Draw an image to cover the canvas, scaled by `zoom` around focus point (fx, fy).
  function drawCover(img, zoom, fx, fy, alpha) {
    if (!img) return;
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * zoom;
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    // Keep the focus point fixed on screen while zooming, then clamp to cover.
    const base = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const bx = (cw - img.naturalWidth * base) / 2, by = (ch - img.naturalHeight * base) / 2;
    const px = bx + fx * img.naturalWidth * base, py = by + fy * img.naturalHeight * base;
    let x = px - fx * dw, y = py - fy * dh;
    x = Math.min(0, Math.max(cw - dw, x));
    y = Math.min(0, Math.max(ch - dh, y));
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, x, y, dw, dh);
    ctx.globalAlpha = 1;
  }

  /* ─── Scroll → progress, smoothed ─── */
  let NAV = 72, target = 0, shown = 0, raf = 0, lastKey = '';
  const range = () => Math.max(1, section.offsetHeight - stage.offsetHeight);
  const readProgress = () => clamp(-section.getBoundingClientRect().top / range());

  function render(p) {
    const [fx, fy] = FOCUS[set] || FOCUS.d;
    // Door opens over the first 46% of the scroll.
    const fa = Math.round(clamp(p / 0.46) * A_END);
    // Push into the open door, then dissolve into the walk-in.
    const z = easeInOut(clamp((p - 0.38) / 0.18));
    const xf = seg(p, 0.47, 0.57);
    const fb = B_START + Math.round(clamp((p - 0.55) / 0.4) * (TOTAL - 1 - B_START));

    const key = fa + '|' + fb + '|' + z.toFixed(3) + '|' + xf.toFixed(3) + '|' + canvas.width;
    if (key !== lastKey) {
      lastKey = key;
      if (xf < 1) drawCover(nearest(fa), 1 + 0.75 * z, fx, fy, 1);
      if (xf > 0) drawCover(nearest(fb), 1 + 0.12 * (1 - xf), 0.5, 0.5, xf);
    }

    // Captions
    const win = [
      1 - seg(p, 0.035, 0.085),
      seg(p, 0.11, 0.15) * (1 - seg(p, 0.26, 0.30)),
      seg(p, 0.30, 0.34) * (1 - seg(p, 0.44, 0.48)),
      seg(p, 0.62, 0.66) * (1 - seg(p, 0.78, 0.82)),
      seg(p, 0.85, 0.9),
    ];
    caps.forEach((el, i) => {
      const v = win[i] || 0;
      el.style.opacity = v.toFixed(3);
      el.style.setProperty('--cy', ((1 - v) * (i === 0 ? -18 : 26)).toFixed(1) + 'px');
      const live = v > 0.5;
      if (el.classList.contains('is-live') !== live) {
        el.classList.toggle('is-live', live);
        el.setAttribute('aria-hidden', live ? 'false' : 'true');
      }
    });
    const ch = p < 0.1 ? -1 : p < 0.3 ? 0 : p < 0.5 ? 1 : p < 0.83 ? 2 : 3;
    chapters.forEach((c, i) => c.classList.toggle('on', i === ch));
    hint.style.opacity = (1 - seg(p, 0.01, 0.04)).toFixed(3);
    shade.style.setProperty('--shade', (0.75 + 0.25 * Math.max(...win)).toFixed(3));
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }

  function tick() {
    raf = 0;
    shown += (target - shown) * 0.16;
    if (Math.abs(target - shown) < 0.0004) shown = target;
    render(shown);
    if (shown !== target) raf = requestAnimationFrame(tick);
  }
  function requestDraw(force) {
    if (force) lastKey = '';
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function onScroll() { target = readProgress(); requestDraw(false); }

  /* ─── Intro: wordmark + counter, then the cover parts like a pair of doors ─── */
  function runIntro() {
    const html = document.documentElement;
    if (!html.classList.contains('m-intro')) return;
    try { sessionStorage.setItem('m-intro', '1'); } catch (e) {}
    const el = document.createElement('div');
    el.id = 'sdm-intro';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<div class="si-leaf si-l"></div><div class="si-leaf si-r"></div>' +
      '<div class="si-mark"><span class="si-word">' +
      'Solid Doors & Moldings'.split('').map((ch, k) => ch === ' ' ? ' ' : '<i style="--i:' + k + '">' + (ch === '&' ? '&amp;' : ch) + '</i>').join('') +
      '</span><span class="si-sub">Brooklyn, NY</span></div>' +
      '<div class="si-count"><b>0</b><span>%</span></div><div class="si-line"><i></i></div>';
    document.body.appendChild(el);
    const count = el.querySelector('.si-count b'), line = el.querySelector('.si-line i');
    const t0 = performance.now(), MIN = 1500, MAX = 3200;
    let done = false, pct = 0;
    const timeout = new Promise((r) => setTimeout(r, MAX));
    requestAnimationFrame(function tick(now) {
      if (done) return;
      const t = Math.min(1, (now - t0) / MIN);
      const real = Math.min(1, loadedCount / 10);
      pct = Math.max(pct, Math.round(Math.min(t, Math.max(real, t * 0.85)) * 100));
      count.textContent = String(pct);
      line.style.transform = 'scaleX(' + (pct / 100) + ')';
      requestAnimationFrame(tick);
    });
    Promise.race([introReady, timeout]).then(() => new Promise((r) => setTimeout(r, Math.max(0, MIN - (performance.now() - t0))))).then(() => {
      done = true;
      count.textContent = '100'; line.style.transform = 'scaleX(1)';
      el.classList.add('si-out');
      html.classList.remove('m-intro');
      document.body.classList.add('film-revealed');
      setTimeout(() => el.remove(), 1700);
    });
  }

  /* ─── Setup ─── */
  function setup() {
    NAV = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    if (reduced.matches) {
      section.classList.remove('ds-js', 'ds-ready');
      window.removeEventListener('scroll', onScroll);
      caps.forEach((el, i) => { el.style.opacity = i === 0 ? '1' : '0'; el.classList.toggle('is-live', i === 0); });
      return;
    }
    section.classList.add('ds-js');
    document.body.classList.add('has-film');
    resize();
    target = shown = readProgress();
    render(shown);
    window.addEventListener('scroll', onScroll, { passive: true });
    runIntro();
  }

  window.addEventListener('resize', () => { if (!reduced.matches) { resize(); onScroll(); } });
  portraitMQ.addEventListener('change', () => { if (!reduced.matches) resize(); });
  reduced.addEventListener('change', setup);

  setup();
})();
