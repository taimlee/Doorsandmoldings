/* ===================================================
   SOLID DOORS & MOLDINGS — Nav + Footer Injector
   =================================================== */

(function () {
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const base = depth <= 0 ? './' : depth === 1 ? '../' : '../../';

  /* ─── NAV ─── */
  const navHTML = `
<nav id="main-nav">
  <div class="nav-inner">
    <a href="${base}index.html" class="nav-logo">
      <span class="nav-logo-main">Solid Doors &amp; Moldings</span>
      <span class="nav-logo-sub">Crafted in America Since 1987</span>
    </a>
    <ul class="nav-links">
      <li class="nav-item has-dropdown">
        <button class="nav-btn">Doors <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg></button>
        <div class="nav-dropdown"><div class="nav-dropdown-inner">
          <div class="nav-dropdown-section">
            <div class="nav-dropdown-section-label">By Type</div>
            <a href="${base}doors/interior-doors.html">Interior Doors</a>
            <a href="${base}doors/exterior-doors.html">Exterior Doors</a>
            <a href="${base}doors/french-doors.html">French Doors</a>
            <a href="${base}doors/barn-doors.html">Barn Doors</a>
            <a href="${base}doors/custom-doors.html">Custom Doors</a>
            <a href="${base}doors/fire-rated-doors.html">Fire-Rated Doors</a>
          </div>
        </div></div>
      </li>
      <li class="nav-item has-dropdown">
        <button class="nav-btn">Moldings <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg></button>
        <div class="nav-dropdown"><div class="nav-dropdown-inner">
          <div class="nav-dropdown-section">
            <div class="nav-dropdown-section-label">By Type</div>
            <a href="${base}moldings/crown-molding.html">Crown Molding</a>
            <a href="${base}moldings/base-molding.html">Base Molding</a>
            <a href="${base}moldings/casing.html">Door &amp; Window Casing</a>
            <a href="${base}moldings/chair-rail.html">Chair Rail</a>
            <a href="${base}moldings/panel-molding.html">Panel Molding</a>
            <a href="${base}moldings/wainscoting.html">Wainscoting</a>
          </div>
        </div></div>
      </li>
      <li class="nav-item"><a href="${base}hardware.html" class="nav-btn">Hardware</a></li>
      <li class="nav-item has-dropdown">
        <button class="nav-btn">Industries <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg></button>
        <div class="nav-dropdown"><div class="nav-dropdown-inner">
          <div class="nav-dropdown-section">
            <div class="nav-dropdown-section-label">We Serve</div>
            <a href="${base}industries/hotels.html">Hotels &amp; Hospitality</a>
            <a href="${base}industries/commercial.html">Commercial Offices</a>
            <a href="${base}industries/contractors.html">Contractors &amp; Builders</a>
            <a href="${base}industries/designers.html">Interior Designers &amp; Architects</a>
          </div>
        </div></div>
      </li>
      <li class="nav-item"><a href="${base}gallery.html" class="nav-btn">Gallery</a></li>
      <li class="nav-item has-dropdown">
        <button class="nav-btn">Resources <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg></button>
        <div class="nav-dropdown"><div class="nav-dropdown-inner">
          <div class="nav-dropdown-section">
            <a href="${base}finishes.html">Materials &amp; Finishes Guide</a>
            <a href="${base}faq.html">FAQ</a>
            <a href="${base}about.html">Our Story</a>
            <a href="${base}showroom.html">Showroom</a>
          </div>
        </div></div>
      </li>
    </ul>
    <div class="nav-cta">
      <a href="${base}contact.html" class="nav-cta-contact">Contact</a>
      <a href="${base}quote.html" class="nav-cta-quote">Get a Quote →</a>
    </div>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/>
      </svg>
    </button>
  </div>
</nav>`;

  /* ─── MOBILE NAV ─── */
  const mobileHTML = `
<div id="mobile-nav" style="display:none;position:fixed;inset:0;z-index:1100;background:var(--charcoal);overflow-y:auto;padding:24px var(--gutter,24px) 48px;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;">
    <a href="${base}index.html" style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--cream);">Solid Doors &amp; Moldings</a>
    <button id="mobile-nav-close" style="color:var(--cream);background:none;border:none;cursor:pointer;">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="20" y2="20"/><line x1="20" y1="2" x2="2" y2="20"/></svg>
    </button>
  </div>
  <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Doors</div>
  <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:28px;">
    <a href="${base}doors/interior-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Interior Doors</a>
    <a href="${base}doors/exterior-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Exterior Doors</a>
    <a href="${base}doors/french-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">French Doors</a>
    <a href="${base}doors/barn-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Barn Doors</a>
    <a href="${base}doors/custom-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Custom Doors</a>
    <a href="${base}doors/fire-rated-doors.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;">Fire-Rated Doors</a>
  </div>
  <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Moldings</div>
  <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:28px;">
    <a href="${base}moldings/crown-molding.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Crown Molding</a>
    <a href="${base}moldings/base-molding.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Base Molding</a>
    <a href="${base}moldings/casing.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Casing</a>
    <a href="${base}moldings/chair-rail.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Chair Rail</a>
    <a href="${base}moldings/panel-molding.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Panel Molding</a>
    <a href="${base}moldings/wainscoting.html" style="font-size:1rem;color:rgba(255,255,255,0.80);padding:10px 0;">Wainscoting</a>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">
    <a href="${base}hardware.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">Hardware</a>
    <a href="${base}gallery.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">Gallery</a>
    <a href="${base}finishes.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">Finishes Guide</a>
    <a href="${base}faq.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">FAQ</a>
    <a href="${base}about.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">About</a>
    <a href="${base}contact.html" style="font-size:1rem;color:rgba(255,255,255,0.80);">Contact</a>
  </div>
  <a href="${base}quote.html" style="display:block;background:var(--gold);color:var(--charcoal);text-align:center;padding:16px;font-weight:700;border-radius:2px;font-size:0.95rem;">Get a Quote →</a>
</div>`;

  /* ─── FOOTER ─── */
  const footerHTML = `
<footer id="main-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-brand-name">Solid Doors &amp; Moldings</div>
        <p class="footer-brand-tagline">American-crafted solid wood doors, architectural moldings, and premium hardware — built to last a lifetime.</p>
        <div class="footer-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>829 E New York Ave, Brooklyn, NY 11203</span></div>
        <div class="footer-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.42a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>(718) 986-7990</span></div>
        <div class="footer-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>info@soliddoorsandmoldings.com</span></div>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Doors</div>
        <ul>
          <li><a href="${base}doors/interior-doors.html">Interior Doors</a></li>
          <li><a href="${base}doors/exterior-doors.html">Exterior Doors</a></li>
          <li><a href="${base}doors/french-doors.html">French Doors</a></li>
          <li><a href="${base}doors/barn-doors.html">Barn Doors</a></li>
          <li><a href="${base}doors/custom-doors.html">Custom Doors</a></li>
          <li><a href="${base}doors/fire-rated-doors.html">Fire-Rated Doors</a></li>
          <li><a href="${base}hardware.html">Hardware &amp; Handles</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Moldings</div>
        <ul>
          <li><a href="${base}moldings/crown-molding.html">Crown Molding</a></li>
          <li><a href="${base}moldings/base-molding.html">Base Molding</a></li>
          <li><a href="${base}moldings/casing.html">Casing</a></li>
          <li><a href="${base}moldings/chair-rail.html">Chair Rail</a></li>
          <li><a href="${base}moldings/panel-molding.html">Panel Molding</a></li>
          <li><a href="${base}moldings/wainscoting.html">Wainscoting</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Company</div>
        <ul>
          <li><a href="${base}about.html">About Us</a></li>
          <li><a href="${base}gallery.html">Gallery</a></li>
          <li><a href="${base}finishes.html">Finishes Guide</a></li>
          <li><a href="${base}showroom.html">Showroom</a></li>
          <li><a href="${base}faq.html">FAQ</a></li>
          <li><a href="${base}contact.html">Contact</a></li>
          <li><a href="${base}quote.html">Get a Quote</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2026 Solid Doors &amp; Moldings, Inc. All rights reserved.</div>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Accessibility</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ─── Inject ─── */
  // Nav
  var navEl = document.createElement('div');
  navEl.innerHTML = navHTML;
  document.body.insertBefore(navEl.firstElementChild, document.body.firstChild);

  // Mobile nav
  var mobileEl = document.createElement('div');
  mobileEl.innerHTML = mobileHTML;
  document.body.insertBefore(mobileEl.firstElementChild, document.body.children[1] || null);

  // Footer
  var footerEl = document.createElement('div');
  footerEl.innerHTML = footerHTML;
  document.body.appendChild(footerEl.firstElementChild);

  /* ─── Behaviors ─── */
  // Scroll
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Hamburger / close
  document.addEventListener('click', function (e) {
    if (e.target.closest('#nav-hamburger')) {
      var mn = document.getElementById('mobile-nav');
      if (mn) mn.style.display = 'block';
    }
    if (e.target.closest('#mobile-nav-close')) {
      var mn = document.getElementById('mobile-nav');
      if (mn) mn.style.display = 'none';
    }
  });

  // ─── Real Photography ───────────────────────────────
  // Maps label keywords → curated Unsplash photo IDs
  var PHOTOS = [
    // Doors – exterior
    { k: ['grand','entry door','mahogany door','estate entry','carved door','solid mahogany'],  id: '1558618666-fcd25c85cd64' },
    { k: ['exterior door','front door','sidelight','dutch door','arched door','contemporary exterior'], id: '1568605114974-d883bead6b46' },
    // Doors – interior
    { k: ['interior door','shaker','5-panel','panel door','2-panel','raised 6','louvered','glass-lite','flush interior'], id: '1558997519-9c67cfcaad47' },
    // French doors
    { k: ['french door','garden door','terrace door','bifold','pocketing french'], id: '1502005229762-cf1b2da7c5d6' },
    // Barn doors
    { k: ['barn door','sliding door','x-brace','reclaimed plank','z-brace','bypass'], id: '1558997519-9c67cfcaad47' },
    // Custom / pivot
    { k: ['custom door','pivot door','carved','oversized','custom carved','historic'], id: '1600585154340-be6161a56a0c' },
    // Fire-rated
    { k: ['fire-rated','fire rated','hotel room door','corridor door','office door'], id: '1497366216548-37526070297c' },
    // Crown molding
    { k: ['crown molding','crown','cornice','coffered','ceiling molding'], id: '1586023492125-27b2c045efd7' },
    // Base molding / wainscoting / paneling
    { k: ['baseboard','base molding','wainscoting','paneling','wall panel','shadow box','board and batten','beadboard','chair rail','casing','door frame','door casing','window frame'], id: '1600210492486-724d5a25c597' },
    // Hardware
    { k: ['hardware','handle','lever','knob','pull','brass','hinge','bolt','cremone','mortise'], id: '1558618587-5acac4dfef3f' },
    // Workshop / craft
    { k: ['workshop','craftsman','woodworking','carpenter','planing','bench','cnc','finishing','staining','mill','facility','production'], id: '1530124566582-a618bc2615dc' },
    // Lumber / wood material
    { k: ['lumber','wood stack','cured','plank','grain','species','texture','white oak','walnut','cherry','mahogany','maple'], id: '1518893883800-45cd0954574b' },
    // Interiors – living / lounge
    { k: ['living room','lounge','modern interior','contemporary','open plan'], id: '1583847268964-b28dc8f51f92' },
    // Interiors – dining
    { k: ['dining room','formal dining','dining','chair rail dining'], id: '1556909172-8277d6b46f0a' },
    // Interiors – hallway / entry
    { k: ['hallway','corridor','entry','foyer'], id: '1600566752355-35792bedcfea' },
    // Hotel / hospitality
    { k: ['hotel lobby','hotel corridor','hotel','hospitality','resort','hermitage','thompson'], id: '1564501049412-61c2a3083791' },
    // Office / commercial / boardroom
    { k: ['office','boardroom','commercial','corporate','executive'], id: '1497366811353-6870744d04b2' },
    // Brooklyn / map / location
    { k: ['map','brooklyn','new york','location','showroom location'], id: '1522083165945-a07a6ac05f87' },
    // Portrait / people
    { k: ['portrait','founder','team','director','manager','person'], id: '1560250097-0b93528c311a' },
    // Samples / design
    { k: ['sample','finish chip','stain','material','drawing','design table'], id: '1558618666-fcd25c85cd64' },
    // Showroom
    { k: ['showroom','display','door display'], id: '1616486701797-0f33f61038ec' },
  ];

  function bestPhotoId(label) {
    if (!label) return null;
    var l = label.toLowerCase();
    var best = null, bestScore = 0;
    for (var i = 0; i < PHOTOS.length; i++) {
      var score = 0;
      for (var j = 0; j < PHOTOS[i].k.length; j++) {
        if (l.indexOf(PHOTOS[i].k[j]) !== -1) score += PHOTOS[i].k[j].length;
      }
      if (score > bestScore) { bestScore = score; best = PHOTOS[i].id; }
    }
    return best;
  }

  function loadPhotos() {
    document.querySelectorAll('.img-ph').forEach(function (ph) {
      var labelEl = ph.querySelector('.img-ph-label');
      var label = labelEl ? labelEl.textContent : '';
      var id = bestPhotoId(label);
      if (!id) return;

      // Measure rendered size for optimal crop
      var w = Math.max(ph.offsetWidth || 800, 400);
      var h = Math.max(ph.offsetHeight || 600, 200);

      var img = document.createElement('img');
      img.src = 'https://images.unsplash.com/photo-' + id + '?w=' + Math.round(w * 1.5) + '&h=' + Math.round(h * 1.5) + '&auto=format&fit=crop&q=80';
      img.alt = label;
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';
      img.loading = 'lazy';

      // Ensure parent is positioned
      var pos = window.getComputedStyle(ph).position;
      if (pos === 'static') ph.style.position = 'relative';

      // Remove stripe pseudo-element by overriding
      ph.style.background = '#1a1714';

      // Hide label once image loads
      img.onload = function () {
        if (labelEl) labelEl.style.display = 'none';
      };
      ph.insertBefore(img, ph.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPhotos);
  } else {
    // Slight delay so layout has settled and offsetHeight is accurate
    setTimeout(loadPhotos, 120);
  }

  // FAQ accordion (runs on FAQ page)
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = this.classList.contains('open');
      document.querySelectorAll('.faq-question').forEach(function (q) {
        q.classList.remove('open');
        var ans = q.nextElementSibling;
        if (ans && ans.classList.contains('faq-answer')) ans.classList.remove('open');
      });
      if (!isOpen) {
        this.classList.add('open');
        var ans = this.nextElementSibling;
        if (ans && ans.classList.contains('faq-answer')) ans.classList.add('open');
      }
    });
  });
}());
