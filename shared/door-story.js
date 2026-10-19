/* ===================================================
   SOLID DOORS & MOLDINGS — Door Story
   Scroll position (0 → 7) drives seven scenes on one pinned stage:
   0 hero · 1 construction · 2 species · 3 style · 4 moldings · 5 hardware · 6 step inside
   =================================================== */

(function () {
  const section = document.getElementById('door-story');
  if (!section) return;

  const $ = (sel) => section.querySelector(sel);
  const $$ = (sel) => Array.from(section.querySelectorAll(sel));

  const SCENES = 7;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 900px)');

  const stage = $('.ds-stage');
  const frame = $('.ds-frame');
  const door = $('.ds-door');
  const slab = $('.ds-slab');
  const light = $('.ds-door-light');
  const underglow = $('.ds-underglow');
  const opening = $('.ds-opening');
  const openingImg = $('.ds-opening-img');
  const glow = $('.ds-glow');
  const spill = $('.ds-spill');
  const lever = $('.ds-lever');
  const crown = $('.ds-crown');
  const base = $('.ds-base');
  const casingPaths = $$('.ds-casing-draw path');
  const casingFill = $('.ds-casing-fill');
  const fixedPieces = $$('.ds-fixed');
  const panels = $$('.ds-panel');
  const caps = $$('.ds-cap');
  const railBtns = $$('.ds-rail button');
  const progress = $('.ds-progress span');
  const speciesWords = $$('[data-species-word]');
  const speciesChips = $$('[data-species-chip]');
  const styleWords = $$('[data-style-word]');
  const styleChips = $$('[data-style-chip]');
  const bg = {
    lumber: $('.ds-bg-lumber'),
    wall: $('.ds-bg-wall'),
    room: $('.ds-bg-room'),
    shade: $('.ds-bg-shade'),
  };

  /* ─── Data ─── */
  const WOODS = ['wood-mahogany', 'wood-white-oak', 'wood-cherry', 'wood-walnut']
    .map((n) => new URL('images/story/' + n + '.jpg', document.baseURI).href);
  WOODS.forEach((src) => { const i = new Image(); i.src = src; });
  const woodUrl = (i) => 'url("' + WOODS[i] + '")';

  // Panel layouts, in % of the door (x, y, w, h). Six slots morph between them.
  const CLASSIC = [[19, 10, 29, 13], [52, 10, 29, 13], [19, 25.5, 29, 18], [52, 25.5, 29, 18], [19, 55, 29, 30], [52, 55, 29, 30]];
  const row = (i) => [19, 10 + i * 15.4, 62, 13.4];
  const SHAKER = [row(0), row(0), row(1), row(2), row(3), row(4)];
  const FLUSH = SHAKER.map(([x, y, w, h]) => [x, y + h / 2 - 0.3, w, 0.6]);
  const FRENCH = [[19, 10, 29, 23.5], [52, 10, 29, 23.5], [19, 36.25, 29, 23.5], [52, 36.25, 29, 23.5], [19, 62.5, 29, 22.5], [52, 62.5, 29, 22.5]];
  const LAYOUTS = [
    { rects: CLASSIC, op: 1, glass: 0, joint: 1 },
    { rects: FLUSH,   op: 0, glass: 0, joint: 0 },
    { rects: SHAKER,  op: 1, glass: 0, joint: 1 },
    { rects: FRENCH,  op: 1, glass: 1, joint: 1 },
  ];
  const LOBBY_ASPECT = 1800 / 1350;

  /* ─── Helpers ─── */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (s, a, b) => ease(clamp((s - a) / (b - a)));
  // Position within a multi-step sequence: returns [fromIndex, toIndex, t]
  const steps = (s, a, b, n) => {
    const f = clamp((s - a) / (b - a)) * (n - 1);
    const i = Math.min(n - 2, Math.floor(f));
    return [i, i + 1, ease(f - i)];
  };

  /* ─── Measurements ─── */
  let W = 0, H = 0, FX = 0, FY = 0, SW = 0, SH = 0, NAV = 72;

  function measure() {
    NAV = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    W = frame.offsetWidth;
    H = frame.offsetHeight;
    FX = frame.offsetLeft;
    FY = frame.offsetTop;
    SW = stage.clientWidth;
    SH = stage.clientHeight;

    fixedPieces.forEach((el) => {
      const [x, y] = el.dataset.rect.split(',').map(Number);
      el.style.setProperty('--px', (x / 100) * W + 'px');
      el.style.setProperty('--py', (y / 100) * H + 'px');
    });
    door.style.setProperty('--gw', H * LOBBY_ASPECT + 'px');
    door.style.setProperty('--gh', H + 'px');
    last = {};
  }

  /* ─── Render ─── */
  let last = {};
  const setOnce = (key, value, fn) => { if (last[key] !== value) { last[key] = value; fn(value); } };

  function render(s) {
    // Scene 1 — construction: the door comes apart and goes back together
    const explode = seg(s, 1.08, 1.4) * (1 - seg(s, 1.62, 1.92));
    // Scene 2 — species crossfade
    const [wa, wb, wt] = steps(s, 2.1, 2.9, WOODS.length);
    // Scene 3 — style morph
    const [la, lb, lt] = steps(s, 3.08, 3.92, LAYOUTS.length);
    // Scene 4 — moldings
    const casingDraw = seg(s, 4.05, 4.6);
    // Scene 5 — hardware
    const leverIn = seg(s, 5.05, 5.45);
    const press = seg(s, 5.6, 5.85);
    const hwZoom = seg(s, 5.02, 5.4) * (1 - seg(s, 5.85, 6.05));
    // Scene 6 — open and walk through
    const open = seg(s, 6.0, 6.55);
    const dolly = seg(s, 6.3, 6.98);

    /* Backgrounds */
    bg.lumber.style.opacity = (seg(s, 1.0, 1.25) * (1 - seg(s, 1.8, 2.05)) * 0.9).toFixed(3);
    bg.wall.style.opacity = seg(s, 4.0, 4.4).toFixed(3);
    bg.room.style.opacity = seg(s, 6.7, 6.95).toFixed(3);
    bg.shade.style.opacity = seg(s, 6.55, 6.85).toFixed(3);
    glow.style.opacity = (0.25 + 0.75 * open).toFixed(3);
    spill.style.opacity = open.toFixed(3);
    underglow.style.opacity = ((1 - explode) * (0.8 - 0.8 * open)).toFixed(3);

    /* Wood species */
    setOnce('wa', wa, (v) => door.style.setProperty('--wa', woodUrl(v)));
    setOnce('wb', wb, (v) => door.style.setProperty('--wb', woodUrl(v)));
    door.style.setProperty('--mix', wt.toFixed(3));
    const speciesIdx = wt > 0.5 ? wb : wa;
    setOnce('sp', speciesIdx, (v) => {
      speciesWords.forEach((el, i) => el.classList.toggle('on', i === v));
      speciesChips.forEach((el, i) => el.classList.toggle('on', i === v));
    });

    /* Panel layout */
    const A = LAYOUTS[la], B = LAYOUTS[lb];
    const joint = lerp(A.joint, B.joint, lt);
    const glass = lerp(A.glass, B.glass, lt);
    door.style.setProperty('--joint', joint.toFixed(3));
    const styleIdx = lt > 0.5 ? lb : la;
    setOnce('st', styleIdx, (v) => {
      styleWords.forEach((el, i) => el.classList.toggle('on', i === v));
      styleChips.forEach((el, i) => el.classList.toggle('on', i === v));
    });

    const lobbyW = H * LOBBY_ASPECT;
    const lobbyX = (W - lobbyW) / 2;
    panels.forEach((el, i) => {
      const ra = A.rects[i], rb = B.rects[i];
      const x = lerp(ra[0], rb[0], lt), y = lerp(ra[1], rb[1], lt);
      const w = lerp(ra[2], rb[2], lt), h = lerp(ra[3], rb[3], lt);
      const key = x.toFixed(2) + ',' + y.toFixed(2) + ',' + w.toFixed(2) + ',' + h.toFixed(2);
      setOnce('p' + i, key, () => {
        el.style.left = x + '%';
        el.style.top = y + '%';
        el.style.width = w + '%';
        el.style.height = h + '%';
        const px = (x / 100) * W, py = (y / 100) * H;
        el.style.setProperty('--px', px + 'px');
        el.style.setProperty('--py', py + 'px');
        el.style.setProperty('--gx', lobbyX - px + 'px');
        el.style.setProperty('--gy', -py + 'px');
      });
      el.style.opacity = lerp(A.op, B.op, lt).toFixed(3);
      el.style.setProperty('--glass', glass.toFixed(3));
      el.style.setProperty('--raise', ((1 - glass) * joint).toFixed(3));

      const cx = x + w / 2 - 50, cy = y + h / 2 - 50;
      el.style.transform = explode
        ? 'translate3d(' + (cx / 50) * 0.16 * W * explode + 'px,' + (cy / 50) * 0.07 * H * explode + 'px,' + (110 + i * 8) * explode + 'px) rotateZ(' + (i % 2 ? 3 : -3) * explode + 'deg)'
        : '';
    });

    fixedPieces.forEach((el) => {
      const [dx, dy, dz] = el.dataset.ex.split(',').map(Number);
      el.style.transform = explode
        ? 'translate3d(' + dx * W * explode + 'px,' + dy * H * explode + 'px,' + dz * explode + 'px)'
        : '';
    });
    slab.style.opacity = (1 - explode).toFixed(3);
    light.style.opacity = (1 - explode).toFixed(3);

    /* Door pose */
    door.style.transform =
      'rotateY(' + (-26 * explode + 82 * open) + 'deg) rotateX(' + 8 * explode + 'deg) scale(' + (1 - 0.06 * explode) + ')';
    openingImg.style.transform = 'scale(' + (1.2 - 0.2 * open) + ')';
    opening.style.opacity = (1 - explode).toFixed(3);

    /* Millwork */
    casingPaths.forEach((p) => { p.style.strokeDashoffset = (1 - casingDraw).toFixed(4); });
    casingFill.style.opacity = seg(s, 4.5, 4.85).toFixed(3);
    crown.style.transform = 'scaleX(' + seg(s, 4.25, 4.75).toFixed(4) + ')';
    base.style.transform = 'scaleX(' + seg(s, 4.35, 4.85).toFixed(4) + ')';

    /* Lever */
    lever.style.opacity = leverIn.toFixed(3);
    lever.style.transform = 'translate3d(' + (1 - leverIn) * 0.25 * W + 'px,0,2px)';
    lever.style.setProperty('--press', -30 * press + 'deg');

    /* Camera: close-up on the lever, then dolly through the open door */
    let k = 1, tx = 0, ty = 0;
    if (dolly > 0) {
      const zMax = Math.max(SW / W, SH / H) * 1.15;
      k = lerp(1, zMax, Math.pow(dolly, 1.6));
      const fx = 0.5 * W, fy = 0.5 * H;
      const targetX = lerp(FX + fx, SW / 2, dolly), targetY = lerp(FY + fy, SH / 2, dolly);
      tx = targetX - FX - k * fx;
      ty = targetY - FY - k * fy;
    } else if (hwZoom > 0) {
      k = 1 + 0.55 * hwZoom;
      const fx = 0.92 * W, fy = 0.49 * H;
      tx = fx * (1 - k);
      ty = fy * (1 - k);
    }
    frame.style.transform = k === 1 ? '' : 'translate(' + tx + 'px,' + ty + 'px) scale(' + k + ')';

    /* Captions */
    caps.forEach((el, i) => {
      let v;
      if (i === 0) v = 1 - seg(s, 0.6, 0.92);
      else if (i === SCENES - 1) v = seg(s, 6.55, 6.82);
      else v = seg(s, i + 0.05, i + 0.25) * (1 - seg(s, i + 0.75, i + 0.95));
      el.style.opacity = v.toFixed(3);
      el.style.setProperty('--cy', (1 - v) * (i === 0 ? -24 : 24) + 'px');
      el.classList.toggle('is-live', v > 0.5);
      el.setAttribute('aria-hidden', v > 0.5 ? 'false' : 'true');
    });

    /* Rail + progress */
    const active = Math.min(SCENES - 1, Math.floor(s));
    setOnce('rail', active, (v) => railBtns.forEach((b, i) => {
      b.classList.toggle('on', i === v);
      if (i === v) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    }));
    progress.style.transform = 'scaleX(' + (s / SCENES).toFixed(4) + ')';
  }

  /* ─── Scroll wiring ─── */
  const scrollRange = () => Math.max(1, section.offsetHeight - stage.offsetHeight);
  const currentScene = () => clamp((NAV - section.getBoundingClientRect().top) / scrollRange()) * SCENES;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; render(currentScene()); });
  }

  function setup() {
    if (reduceMotion.matches) {
      section.classList.remove('ds-js');
      window.removeEventListener('scroll', onScroll);
      measure();
      render(0);
      lever.style.opacity = 1;
      lever.style.transform = '';
      return;
    }
    section.classList.add('ds-js');
    measure();
    render(currentScene());
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  railBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const target = i === 0 ? 0 : i === SCENES - 1 ? 6.98 : i + 0.5;
      const top = section.getBoundingClientRect().top + window.scrollY - NAV;
      window.scrollTo({ top: top + (target / SCENES) * scrollRange(), behavior: 'smooth' });
    });
  });

  window.addEventListener('resize', () => { measure(); render(reduceMotion.matches ? 0 : currentScene()); });
  reduceMotion.addEventListener('change', setup);
  mobile.addEventListener('change', () => { measure(); render(currentScene()); });

  setup();
})();
