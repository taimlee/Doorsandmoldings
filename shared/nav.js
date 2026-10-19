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
      <span class="nav-logo-sub">Solid Wood. American Made.</span>
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
      <li class="nav-item has-dropdown">
        <button class="nav-btn">Resources <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg></button>
        <div class="nav-dropdown"><div class="nav-dropdown-inner">
          <div class="nav-dropdown-section">
            <a href="${base}finishes.html">Materials &amp; Finishes Guide</a>
            <a href="${base}faq.html">FAQ</a>
            <a href="${base}about.html">About Us</a>
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
<div id="mobile-nav" aria-hidden="true">
  <div class="mm-head">
    <a href="${base}index.html" class="mm-logo">Solid Doors &amp; Moldings</a>
    <button id="mobile-nav-close" class="mm-close" aria-label="Close menu"><span></span><span></span></button>
  </div>
  <nav class="mm-body" aria-label="Mobile">
    <ul class="mm-list">
    <li class="mm-item" style="--i:0">
      <button type="button" class="mm-link mm-toggle" aria-expanded="false" aria-controls="mm-sub-0"><span>Doors</span><i aria-hidden="true"></i></button>
      <ul class="mm-sub" id="mm-sub-0" hidden><li><a href="${base}doors/interior-doors.html">Interior</a></li><li><a href="${base}doors/exterior-doors.html">Exterior</a></li><li><a href="${base}doors/french-doors.html">French</a></li><li><a href="${base}doors/barn-doors.html">Barn</a></li><li><a href="${base}doors/custom-doors.html">Custom</a></li><li><a href="${base}doors/fire-rated-doors.html">Fire-Rated</a></li></ul>
    </li>
    <li class="mm-item" style="--i:1">
      <button type="button" class="mm-link mm-toggle" aria-expanded="false" aria-controls="mm-sub-1"><span>Moldings</span><i aria-hidden="true"></i></button>
      <ul class="mm-sub" id="mm-sub-1" hidden><li><a href="${base}moldings/crown-molding.html">Crown</a></li><li><a href="${base}moldings/base-molding.html">Base</a></li><li><a href="${base}moldings/casing.html">Casing</a></li><li><a href="${base}moldings/chair-rail.html">Chair Rail</a></li><li><a href="${base}moldings/panel-molding.html">Panel</a></li><li><a href="${base}moldings/wainscoting.html">Wainscoting</a></li></ul>
    </li>
    <li class="mm-item" style="--i:2">
      <button type="button" class="mm-link mm-toggle" aria-expanded="false" aria-controls="mm-sub-2"><span>Industries</span><i aria-hidden="true"></i></button>
      <ul class="mm-sub" id="mm-sub-2" hidden><li><a href="${base}industries/hotels.html">Hotels</a></li><li><a href="${base}industries/commercial.html">Commercial</a></li><li><a href="${base}industries/contractors.html">Contractors</a></li><li><a href="${base}industries/designers.html">Designers</a></li></ul>
    </li>
    <li class="mm-item" style="--i:3"><a class="mm-link" href="${base}hardware.html"><span>Hardware</span></a></li>
    <li class="mm-item" style="--i:4"><a class="mm-link" href="${base}finishes.html"><span>Finishes</span></a></li>
    <li class="mm-item" style="--i:5"><a class="mm-link" href="${base}about.html"><span>About</span></a></li>
    <li class="mm-item" style="--i:6"><a class="mm-link" href="${base}faq.html"><span>FAQ</span></a></li>
    <li class="mm-item" style="--i:7"><a class="mm-link" href="${base}contact.html"><span>Contact</span></a></li>
    </ul>
  </nav>
  <div class="mm-foot" style="--i:9">
    <a href="${base}quote.html" class="mm-cta">Get a Quote →</a>
    <div class="mm-addr">829 E New York Ave, Brooklyn, NY · by appointment</div>
  </div>
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
          <li><a href="${base}finishes.html">Finishes Guide</a></li>
          <li><a href="${base}faq.html">FAQ</a></li>
          <li><a href="${base}contact.html">Contact</a></li>
          <li><a href="${base}quote.html">Get a Quote</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2026 Solid Doors &amp; Moldings, Inc. All rights reserved.</div>
      <div class="footer-legal">
        <a href="${base}privacy-policy.html">Privacy Policy</a>
        <a href="${base}terms-of-use.html">Terms of Use</a>
        <a href="${base}accessibility.html">Accessibility</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ─── Inject ─── */
  // Favicon
  if (!document.querySelector('link[rel="icon"]')) {
    var favicon = document.createElement('link');
    favicon.rel = 'icon'; favicon.type = 'image/svg+xml';
    favicon.href = base + 'favicon.svg';
    document.head.appendChild(favicon);
  }
  // Nav
  var navEl = document.createElement('div');
  navEl.innerHTML = navHTML;
  document.body.insertBefore(navEl.firstElementChild, document.body.firstChild);

  // Mobile nav
  var mobileEl = document.createElement('div');
  mobileEl.innerHTML = mobileHTML;
  document.body.insertBefore(mobileEl.firstElementChild, document.body.children[1] || null);

  // Mobile action bar (hidden on the quote and contact pages themselves)
  if (!/\/(quote|contact)\.html$/.test(window.location.pathname)) {
    var bar = document.createElement('div');
    bar.id = 'mobile-cta';
    bar.innerHTML = '<a href="' + base + 'contact.html" class="mcta-contact">Contact</a><a href="' + base + 'quote.html" class="mcta-quote">Get a Quote →</a>';
    document.body.appendChild(bar);
    document.body.classList.add('has-mobile-cta');
  }

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

  // Mobile menu: open/close with a staggered reveal, lock scroll, Esc to close
  var mm = document.getElementById('mobile-nav');
  var mmBtn = document.getElementById('nav-hamburger');
  function openMenu() {
    if (!mm) return;
    mm.classList.add('open'); mm.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('menu-open');
    if (mmBtn) mmBtn.setAttribute('aria-expanded', 'true');
    if (window.lenis) window.lenis.stop();
    var first = mm.querySelector('.mm-link'); if (first) setTimeout(function () { first.focus(); }, 350);
  }
  function closeMenu() {
    if (!mm || !mm.classList.contains('open')) return;
    mm.classList.remove('open'); mm.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('menu-open');
    if (mmBtn) { mmBtn.setAttribute('aria-expanded', 'false'); mmBtn.focus(); }
    if (window.lenis) window.lenis.start();
  }
  if (mmBtn) mmBtn.setAttribute('aria-expanded', 'false');
  document.addEventListener('click', function (e) {
    if (e.target.closest('#nav-hamburger')) openMenu();
    else if (e.target.closest('#mobile-nav-close')) closeMenu();
    else if (e.target.closest('.mm-toggle')) {
      var t = e.target.closest('.mm-toggle'), sub = document.getElementById(t.getAttribute('aria-controls'));
      var open = t.getAttribute('aria-expanded') === 'true';
      mm.querySelectorAll('.mm-toggle[aria-expanded="true"]').forEach(function (o) {
        if (o !== t) { o.setAttribute('aria-expanded', 'false'); var s = document.getElementById(o.getAttribute('aria-controls')); if (s) s.hidden = true; }
      });
      t.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (sub) sub.hidden = open;
    }
    else if (mm && mm.classList.contains('open') && e.target.closest('#mobile-nav a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('pageshow', function () { closeMenu(); });

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
