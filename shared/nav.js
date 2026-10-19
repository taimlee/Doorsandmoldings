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
