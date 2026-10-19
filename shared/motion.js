/* ===================================================
   SOLID DOORS & MOLDINGS — Motion System
   Load in <head>:  <link rel="stylesheet" href="shared/motion.css">
                    <script src="shared/motion.js"></script>

   Applied automatically on every page:
     · door-leaf page transitions between internal links
     · scroll reveals (fade-up, image wipes, word-by-word headings, labels, rules)
     · photo parallax inside .img-ph, count-up stats, card tilt + glare,
       magnetic buttons, custom cursor, scroll progress, auto-hiding nav, back-to-top

   Opt-in attributes for page-specific work:
     data-reveal="up|left|right|scale|fade"   reveal any element (stagger with siblings)
     data-split                              word-by-word reveal for any text block
     data-parallax="0.15"                    move the element itself with scroll (speed)
     data-count                              count up the first number inside
     data-tilt / data-magnetic               hover effects
     data-cursor="Drag"                      label shown in the cursor over the element
     data-no-motion                          opt an element (and its children) out
   API: window.Motion.refresh(root?) after inserting new content; Motion.reduced (bool).
   =================================================== */

(function () {
  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  html.classList.add('m-js');

  // Arriving from an internal link: open the door leaves.
  try {
    if (!reduced && sessionStorage.getItem('m-door') === '1') {
      sessionStorage.removeItem('m-door');
      html.classList.add('m-entering');
      setTimeout(function () { html.classList.remove('m-entering'); }, 950);
    }
  } catch (e) {}

  var EXCLUDE = '#door-story, [data-no-motion], #mobile-nav, #main-nav, .m-cursor, #m-top';
  var FADE = [
    '.section-intro', '.section-intro-center', '.card', '.feature-item', '.process-step', '.stat-item',
    '.industry-card', '.style-card', '.profile-card', '.hw-card', '.stain-card', '.species-card',
    '.pain-item', '.faq-item', '.testimonial', '.cta-banner p', '.cta-banner .btn-row', '.spec-table',
    '.form-group', '.lead', '.hero-ctas', '.btn-row', '.breadcrumb', '.footer-col', '.footer-brand',
    '.footer-bottom', '[data-reveal]'
  ].join(',');
  var SPLIT = 'h1, h2, [data-split]';
  var TILT = '.card, .style-card, .profile-card, .hw-card, .stain-card, .species-card, .industry-card, .feat-prod, [data-tilt]';
  var MAGNET = '.btn, .nav-cta-quote, [data-magnetic]';

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var excluded = function (el) { return !!el.closest(EXCLUDE); };

  /* ─── Reveal ─── */
  var io = null;
  var queue = [];
  var flushScheduled = false;

  function reveal(el, delay) {
    el.style.setProperty('--m-d', delay + 's');
    el.classList.add('m-in');
    // Once settled, drop the reveal classes so hover transforms stay snappy.
    setTimeout(function () {
      el.classList.remove('m-r', 'm-wipe', 'm-split', 'm-lab', 'm-rule', 'm-in');
      el.style.removeProperty('--m-d');
    }, 1700 + delay * 1000);
    if (el.hasAttribute('data-count') || el.classList.contains('stat-number')) countUp(el);
    el.querySelectorAll('[data-count], .stat-number').forEach(countUp);
  }

  function flush() {
    flushScheduled = false;
    queue.sort(function (a, b) {
      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    queue.forEach(function (el, i) { reveal(el, Math.min(i * 0.08, 0.56)); });
    queue = [];
  }

  function onIntersect(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      queue.push(entry.target);
    });
    if (queue.length && !flushScheduled) { flushScheduled = true; setTimeout(flush, 16); }
  }

  function prep(el, cls) {
    if (el.dataset.mDone || excluded(el)) return;
    el.dataset.mDone = '1';
    el.classList.add(cls);
    // A fully clipped element never counts as intersecting, so wipes are polled on scroll instead.
    if (cls === "m-wipe") pendingWipes.push(el); else io.observe(el);
  }

  var pendingWipes = [];
  function checkWipes(vh) {
    if (!pendingWipes.length) return;
    pendingWipes = pendingWipes.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0 && (r.width || r.height)) {
        queue.push(el);
        return false;
      }
      return true;
    });
    if (queue.length && !flushScheduled) { flushScheduled = true; setTimeout(flush, 16); }
  }

  function splitWords(el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          if (parts.length === 1 && !parts[0]) return;
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var w = document.createElement('span'); w.className = 'm-w';
            var wi = document.createElement('span'); wi.className = 'm-wi';
            wi.style.setProperty('--m-i', Math.min(i++, 14));
            wi.textContent = p;
            w.appendChild(wi); frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR' && child.tagName !== 'SVG') {
          walk(child);
        }
      });
    })(el);
  }

  function scan(root) {
    root = root || document;
    root.querySelectorAll(FADE).forEach(function (el) {
      // Let the outermost container carry the fade.
      var parent = el.parentElement && el.parentElement.closest(FADE);
      if (parent && !excluded(parent)) return;
      prep(el, 'm-r');
    });
    root.querySelectorAll(SPLIT).forEach(function (el) {
      if (el.dataset.mDone || excluded(el)) return;
      splitWords(el);
      prep(el, 'm-split');
    });
    root.querySelectorAll('.img-ph').forEach(function (el) { prep(el, 'm-wipe'); });
    root.querySelectorAll('.label').forEach(function (el) { prep(el, 'm-lab'); });
    root.querySelectorAll('.rule').forEach(function (el) { prep(el, 'm-rule'); });
    root.querySelectorAll(TILT).forEach(setupTilt);
    root.querySelectorAll(MAGNET).forEach(setupMagnet);
    collectParallax(root);
  }

  /* ─── Count-up ─── */
  function countUp(el) {
    if (el.dataset.mCounted || excluded(el)) return;
    el.dataset.mCounted = '1';
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) { if (/\d/.test(node.textContent)) break; }
    if (!node) return;
    var match = node.textContent.match(/[\d,]*\.?\d+/);
    if (!match) return;
    var raw = match[0], target = parseFloat(raw.replace(/,/g, ''));
    var decimals = (raw.split('.')[1] || '').length, commas = raw.indexOf(',') > -1;
    var before = node.textContent.slice(0, match.index), after = node.textContent.slice(match.index + raw.length);
    var start = performance.now(), dur = 1600;
    (function tick(now) {
      var t = clamp((now - start) / dur, 0, 1);
      var v = target * (1 - Math.pow(1 - t, 3));
      var s = v.toFixed(decimals);
      if (commas) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals });
      node.textContent = before + s + after;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ─── Tilt + glare ─── */
  function setupTilt(el) {
    if (!finePointer || el.dataset.mTilt || excluded(el)) return;
    el.dataset.mTilt = '1';
    el.classList.add('m-tilt');
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var glare = document.createElement('span'); glare.className = 'm-glare';
    el.appendChild(glare);
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.add('m-tilting');
      el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 7).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 9).toFixed(2) + 'deg) translateY(-4px)';
      el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('m-tilting');
      el.style.transform = '';
    });
  }

  /* ─── Magnetic buttons ─── */
  function setupMagnet(el) {
    if (!finePointer || el.dataset.mMag || excluded(el) && !el.matches('.nav-cta-quote')) return;
    el.dataset.mMag = '1';
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = 'translate(' + (dx * 0.22).toFixed(1) + 'px,' + (dy * 0.32).toFixed(1) + 'px)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  }

  /* ─── Parallax ─── */
  var parallax = [];
  function collectParallax(root) {
    root.querySelectorAll('.img-ph, [data-parallax]').forEach(function (el) {
      if (el.dataset.mPx || excluded(el)) return;
      el.dataset.mPx = '1';
      parallax.push({ el: el, self: el.hasAttribute('data-parallax'), speed: parseFloat(el.getAttribute('data-parallax')) || 0.1 });
    });
  }

  /* ─── Scroll-linked chrome ─── */
  var progressBar, topBtn, lastY = window.scrollY, ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var p = clamp(y / max, 0, 1);
    if (progressBar) progressBar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    if (topBtn) {
      topBtn.classList.toggle('on', y > 600);
      topBtn.style.setProperty('--m-ring', (150.8 * (1 - p)).toFixed(1));
    }
    var mobileOpen = (document.getElementById('mobile-nav') || {}).style;
    if (y < 200 || (mobileOpen && mobileOpen.display === 'block')) html.classList.remove('m-nav-hidden');
    else if (y - lastY > 6) html.classList.add('m-nav-hidden');
    else if (lastY - y > 6) html.classList.remove('m-nav-hidden');
    lastY = y;

    if (reduced) return;
    checkWipes(vh);
    for (var i = 0; i < parallax.length; i++) {
      var item = parallax[i], r = item.el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      var offset = (r.top + r.height / 2 - vh / 2) * -item.speed;
      if (item.self) {
        item.el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      } else {
        var lim = r.height * 0.05;
        item.el.style.setProperty('--m-py', clamp(offset, -lim, lim).toFixed(1) + 'px');
      }
    }
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }

  function buildChrome() {
    progressBar = document.createElement('div');
    progressBar.id = 'm-progress';
    document.body.appendChild(progressBar);

    topBtn = document.createElement('button');
    topBtn.id = 'm-top';
    topBtn.type = 'button';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML =
      '<svg class="ring" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/></svg>' +
      '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });
    document.body.appendChild(topBtn);
    setupMagnet(topBtn);
  }

  /* ─── Cursor ─── */
  function buildCursor() {
    if (!finePointer || reduced) return;
    var c = document.createElement('div');
    c.className = 'm-cursor';
    c.setAttribute('aria-hidden', 'true');
    var label = document.createElement('span');
    c.appendChild(label);
    document.body.appendChild(c);
    var tx = -100, ty = -100, x = -100, y = -100, running = false;
    function loop() {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) requestAnimationFrame(loop); else running = false;
    }
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      c.classList.add('on');
      if (!running) { running = true; requestAnimationFrame(loop); }
    });
    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest ? e.target : null;
      if (!t) return;
      var labelled = t.closest('[data-cursor]');
      var card = t.closest('.card, .feat-prod, .industry-card, a.style-card, a.profile-card');
      var text = labelled ? labelled.getAttribute('data-cursor') : card ? 'View' : '';
      label.textContent = text;
      c.classList.toggle('label', !!text);
      c.classList.toggle('hover', !text && !!t.closest('a, button, input, select, textarea, label, summary, [role="button"]'));
    });
    document.addEventListener('pointerdown', function () { c.classList.add('down'); });
    document.addEventListener('pointerup', function () { c.classList.remove('down'); });
    document.documentElement.addEventListener('pointerleave', function () { c.classList.remove('on'); });
  }

  /* ─── Page transitions ─── */
  function setupTransitions() {
    // Phones: navigate instantly; the door leaves would only add a delay to every tap.
    if (reduced || !finePointer || window.innerWidth < 768) return;
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash link
      e.preventDefault();
      try { sessionStorage.setItem('m-door', '1'); } catch (err) {}
      html.classList.add('m-leaving');
      setTimeout(function () { location.href = url.href; }, 400);
    });
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) html.classList.remove('m-leaving', 'm-entering');
    });
  }

  /* ─── Init ─── */
  function init() {
    buildChrome();
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);
    // Tabs/accordions can unhide images without scrolling.
    document.addEventListener('click', function () { setTimeout(requestFrame, 60); });
    if (!reduced) {
      io = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
      scan(document);
      setTimeout(requestFrame, 300); // re-check once nav.js has swapped in photos
      buildCursor();
      setupTransitions();
    } else {
      document.querySelectorAll('[data-count], .stat-number').forEach(function (el) { el.dataset.mCounted = '1'; });
    }
    onFrame();
  }

  window.Motion = {
    reduced: reduced,
    refresh: function (root) { if (io) scan(root || document); requestFrame(); },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
