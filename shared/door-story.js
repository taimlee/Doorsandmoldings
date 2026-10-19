/* ===================================================
   SOLID DOORS & MOLDINGS — Door Story
   Scroll position (0 → 8) drives eight scenes in one pinned stage, shown
   through a tall frame of real footage and photography:
   0 hero (door clip scrubbed by scroll) · 1 construction · 2 species ·
   3 style · 4 moldings · 5 hardware · 6 the shop · 7 step inside (frame opens to full screen)
   =================================================== */

(function () {
  const section = document.getElementById('door-story');
  if (!section) return;

  const $ = (sel) => section.querySelector(sel);
  const $$ = (sel) => Array.from(section.querySelectorAll(sel));

  const SCENES = 8;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stage = $('.ds-stage');
  const frame = $('.ds-frame');
  const full = $('.ds-full');
  const fullImg = $('.ds-full img');
  const slides = $$('.ds-slide');
  const ambient = $$('.ds-ambient div');
  const caps = $$('.ds-cap');
  const railBtns = $$('.ds-rail button');
  const progress = $('.ds-progress span');
  const tag = $('.ds-tag-text');
  const scrub = $('.ds-scrub');

  // Per scene: the frame tag, and for photo scenes the names shown with each sub-image.
  const TAGS = ['Solid wood', 'Hand-planed', null, null, null, 'Lever hardware', 'The workshop', ''];
  const subNames = {};
  [2, 3, 4].forEach((i) => {
    subNames[i] = caps[i].querySelectorAll('[data-word]');
  });

  /* ─── Helpers ─── */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (s, a, b) => ease(clamp((s - a) / (b - a)));

  const last = {};
  const setOnce = (key, value, fn) => { if (last[key] !== value) { last[key] = value; fn(value); } };

  /* ─── Measurements ─── */
  let NAV = 72, SW = 0, SH = 0, FR = { x: 0, y: 0, w: 0, h: 0 };
  function measure() {
    NAV = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const s = stage.getBoundingClientRect();
    const f = frame.getBoundingClientRect();
    SW = s.width; SH = s.height;
    FR = { x: f.left - s.left, y: f.top - s.top, w: f.width, h: f.height };
    for (const k in last) delete last[k];
  }

  /* ─── Video control ─── */
  const loops = slides.map((sl) => sl.querySelector('video:not(.ds-scrub)'));
  function manageVideo(i, visible, near) {
    const v = loops[i];
    if (!v) return;
    if (near && v.preload === 'none') { v.preload = 'auto'; v.load(); }
    if (visible && v.paused) v.play().catch(() => {});
    else if (!visible && !v.paused) v.pause();
  }
  let scrubTarget = 0;
  function scrubTo(t) {
    if (!scrub || !scrub.duration) return;
    const time = t * (scrub.duration - 0.05);
    if (Math.abs(time - scrubTarget) < 1 / 30) return;
    scrubTarget = time;
    if (!scrub.seeking) scrub.currentTime = time;
  }
  if (scrub) {
    scrub.addEventListener('seeked', () => {
      if (Math.abs(scrub.currentTime - scrubTarget) > 1 / 30) scrub.currentTime = scrubTarget;
    });
    // iOS only renders seeks after the video has been played once.
    const prime = () => { scrub.play().then(() => scrub.pause()).catch(() => {}); window.removeEventListener('touchstart', prime); };
    window.addEventListener('touchstart', prime, { passive: true });
  }

  /* ─── Render ─── */
  function render(s) {
    // Slides open like a pair of doors from the centre.
    const reveal = slides.map((_, i) => (i === 0 ? 1 : seg(s, i - 0.22, i + 0.08)));
    slides.forEach((sl, i) => {
      const r = reveal[i];
      const x = (50 * (1 - r)).toFixed(2);
      setOnce('clip' + i, x, (v) => { sl.style.clipPath = i === 0 ? '' : 'inset(0 ' + v + '% 0 ' + v + '%)'; });
      const next = reveal[i + 1] || 0;
      // Slow push-in through each scene; the outgoing scene leans back as the next one opens.
      const kb = 1.12 - 0.12 * clamp((s - (i - 0.2)) / 1.3);
      const media = sl.querySelectorAll(':scope > .ds-media, :scope > .ds-sub > .ds-media');
      const scale = (kb * (1 + 0.06 * next)).toFixed(4);
      setOnce('kb' + i, scale, (v) => media.forEach((m) => { m.style.transform = 'scale(' + v + ')'; }));

      const visible = r > 0.02 && next < 0.98 && s < 7.4;
      manageVideo(i, visible, s > i - 0.8 && s < i + 1.5);

      // Sub-images slide across like a sliding door.
      const subs = sl.querySelectorAll('.ds-sub');
      if (subs.length) {
        let shown = 0;
        subs.forEach((sub, k) => {
          const sr = k === 0 ? 1 : seg(s, i + 0.2 + (k - 1) * 0.22, i + 0.32 + (k - 1) * 0.22);
          if (sr > 0.5) shown = k;
          const val = ((1 - sr) * 100).toFixed(2);
          setOnce('sub' + i + k, val, (v) => {
            sub.style.clipPath = k === 0 ? '' : 'inset(0 ' + v + '% 0 0)';
            sub.style.setProperty('--edge', sr > 0.01 && sr < 0.99 ? 1 : 0);
          });
          const bar = caps[i].querySelectorAll('.ds-count i')[k];
          if (bar) bar.style.setProperty('--f', sr.toFixed(3));
        });
        setOnce('word' + i, shown, (v) => subNames[i].forEach((w, k) => w.classList.toggle('on', k === v)));
      }
    });

    // Hero: the door clip follows the scroll.
    scrubTo(clamp(s / 0.95));

    // Final scene: the lobby photo opens out from the frame to the whole screen.
    const f = seg(s, 6.85, 7.35);
    const ins = [FR.y, SW - FR.x - FR.w, SH - FR.y - FR.h, FR.x].map((v) => (v * (1 - f)).toFixed(1) + 'px');
    setOnce('full', ins.join(' '), (v) => { full.style.clipPath = f > 0 ? 'inset(' + v + ' round 3px)' : ''; });
    fullImg.style.transform = 'scale(' + (1.15 - 0.15 * seg(s, 6.85, 8)).toFixed(4) + ')';

    const active = Math.min(SCENES - 1, Math.floor(s + 0.08));
    setOnce('active', active, (v) => {
      ambient.forEach((a, i) => a.classList.toggle('on', i === v));
      railBtns.forEach((b, i) => {
        b.classList.toggle('on', i === v);
        if (i === v) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
    });
    const sceneTag = TAGS[active] !== null ? TAGS[active]
      : (caps[active].querySelector('[data-word].on') || {}).textContent || '';
    setOnce('tag', sceneTag, (v) => { tag.textContent = v; });

    /* Captions */
    caps.forEach((el, i) => {
      let v;
      if (i === 0) v = 1 - seg(s, 0.6, 0.9);
      else if (i === SCENES - 1) v = seg(s, 7.15, 7.45);
      else v = seg(s, i, i + 0.18) * (1 - seg(s, i + 0.78, i + 0.95));
      setOnce('cap' + i, v.toFixed(3), () => {
        el.style.opacity = v.toFixed(3);
        el.style.setProperty('--cy', (1 - v) * (i === 0 ? -24 : 24) + 'px');
        el.classList.toggle('is-live', v > 0.5);
        el.setAttribute('aria-hidden', v > 0.5 ? 'false' : 'true');
      });
    });

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
    measure();
    if (reduceMotion.matches) {
      section.classList.remove('ds-js');
      window.removeEventListener('scroll', onScroll);
      render(0);
      return;
    }
    section.classList.add('ds-js');
    measure();
    render(currentScene());
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  railBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const target = i === 0 ? 0 : i === SCENES - 1 ? 7.98 : i + 0.45;
      const top = section.getBoundingClientRect().top + window.scrollY - NAV;
      window.scrollTo({ top: top + (target / SCENES) * scrollRange(), behavior: 'smooth' });
    });
  });

  window.addEventListener('resize', () => { measure(); render(reduceMotion.matches ? 0 : currentScene()); });
  reduceMotion.addEventListener('change', setup);
  if (scrub) scrub.addEventListener('loadedmetadata', () => render(currentScene()));
  // The frame's entrance animation moves it; re-measure once it settles.
  frame.addEventListener('animationend', () => { measure(); render(currentScene()); });

  setup();
})();
