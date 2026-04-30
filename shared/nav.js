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
  // Hardcoded Unsplash photo IDs — one per product/scene category.
  var PHOTOS = {
    // Interior doors
    shaker_5panel:       'rIcDuE91HWk',
    raised_panel:        '6A8IlonoXR4',
    flush_door:          'zF0aSACUPjk',
    custom_arched:       'iphWbI4pkSU',
    // Barn doors
    barn_modern:         'kHy6pcn0nc4',
    barn_xbrace:         'g2luYjMpc14',
    barn_zbrace:         'bmEfC6JfABA',
    barn_reclaimed:      'JWMEUgHy7ok',
    barn_glass:          'a21S260hKYc',
    barn_shaker:         'AexqkH1SLbg',
    barn_double:         'KiBtTuPtsHA',
    // French doors
    french_interior:     'TiNh2kcfF0Y',
    french_bifold:       'irqcS2UsBbA',
    french_sunlit:       'DvWRy8ykluY',
    // Exterior doors
    exterior_grand:      'Tgs4Neb9fVg',
    exterior_arched:     'ohz7YsXj14w',
    exterior_dutch:      'fnPPA3hpbgQ',
    exterior_mahogany:   'zWjKyZump6o',
    // Custom / special
    pivot_door:          'bloY_24ivVM',
    custom_carved:       'STrvz-H3JcI',
    // Fire-rated
    fire_rated:          'Y7XhCw8ykRo',
    fire_hotel:          'uiqx-n5RVhg',
    // Moldings
    crown_molding:       'Cn8Vz8sO9Pw',
    coffered_ceiling:    '8aHbSehdS3k',
    crown_hotel:         'JuI0xTZyKJ0',
    baseboard:           'Idl6CfIYxsA',
    door_casing:         'TuhjCrKzJY4',
    chair_rail:          'pjQAGRNehew',
    chair_rail_formal:   'rI-IbYGrTf0',
    wainscoting:         'thpCQH4Tolk',
    board_batten:        'DxQxKD3pnDU',
    shadow_box:          'OKcqTe4h6jg',
    staircase_molding:   'bxJ8JMcRcjs',
    // Hardware
    lever_brass:         'ZqdRa6vjX4Y',
    lever_black:         'ZUdwAfOlvEM',
    knob_brass:          '8ea3Kl7pY4k',
    knob_crystal:        '5YUIiv0kLW8',
    hinge_brass:         'UxP1o-E2OCM',
  };

  // Returns a hardcoded photo ID for the label, or null to fall back to query.
  function _photoId(label) {
    var l = label.toLowerCase();
    // Barn doors (check before generic "door")
    if (/double.bypass/.test(l))                              return PHOTOS.barn_double;
    if (/x.brace/.test(l))                                    return PHOTOS.barn_xbrace;
    if (/z.brace/.test(l))                                    return PHOTOS.barn_zbrace;
    if (/reclaimed.*barn|plank.*barn|wide.*sliding/.test(l))  return PHOTOS.barn_reclaimed;
    if (/glass.*barn|barn.*glass/.test(l))                    return PHOTOS.barn_glass;
    if (/shaker.*barn|barn.*shaker|panel.*barn/.test(l))      return PHOTOS.barn_shaker;
    if (/barn.door.*(loft|modern|rail)|loft.*barn/.test(l))   return PHOTOS.barn_modern;
    if (/barn.door/.test(l))                                   return PHOTOS.barn_modern;
    // Interior doors
    if (/shaker|5.panel|five.panel/.test(l))                  return PHOTOS.shaker_5panel;
    if (/craftsman|2.panel|two.panel/.test(l))                return PHOTOS.shaker_5panel;
    if (/raised.panel/.test(l))                               return PHOTOS.raised_panel;
    if (/flush|flat.panel.*door/.test(l))                     return PHOTOS.flush_door;
    if (/louvered/.test(l))                                   return PHOTOS.flush_door;
    if (/glass.lite|10.lite|15.lite|true.divided/.test(l))    return PHOTOS.french_interior;
    if (/custom.*arch|arch.*interior/.test(l))                return PHOTOS.custom_arched;
    // French doors
    if (/bifold|accordion|pocketing/.test(l))                 return PHOTOS.french_bifold;
    if (/sunlit.garden|pair.*open.*garden|open.*sunlit/.test(l)) return PHOTOS.french_sunlit;
    if (/french.*open.*garden|open.*garden.*french/.test(l))  return PHOTOS.french_sunlit;
    if (/exterior.french|terrace.door|french.*terrace|french.*exterior|exterior.*french/.test(l)) return PHOTOS.french_interior;
    if (/french.door|french.doors/.test(l))                   return PHOTOS.french_interior;
    // Exterior doors
    if (/dutch.door/.test(l))                                 return PHOTOS.exterior_dutch;
    if (/arched.*exterior|ornate.*exterior|arched.top|single.*arched/.test(l)) return PHOTOS.exterior_arched;
    if (/grand.*mahogany|mahogany.*entry|mahogany.*grand/.test(l)) return PHOTOS.exterior_mahogany;
    if (/grand.*oak|grand.*white.oak|grand.*entry|sidelight|estate.entry/.test(l)) return PHOTOS.exterior_grand;
    if (/entry.door|front.door|exterior.*solid|solid.*exterior|exterior.*door/.test(l)) return PHOTOS.exterior_grand;
    if (/contemporary.exterior|modern.exterior/.test(l))      return PHOTOS.exterior_grand;
    // Custom / pivot
    if (/pivot/.test(l))                                      return PHOTOS.pivot_door;
    if (/custom.*carv|carved.*mahogany|carved.*solid|carved.*ornate/.test(l)) return PHOTOS.custom_carved;
    // Fire-rated
    if (/ul.listing|ul.list|fire.*label/.test(l))             return PHOTOS.fire_rated;
    if (/fire.rated.*walnut|fire.rated.*wood|fire.rated.*office|fire.rated.*solid/.test(l)) return PHOTOS.fire_hotel;
    if (/hotel.room.door|corridor.door|suite.entry/.test(l))  return PHOTOS.fire_hotel;
    if (/fire.rated|fire-rated/.test(l))                      return PHOTOS.fire_rated;
    // Crown molding
    if (/coffered/.test(l))                                   return PHOTOS.coffered_ceiling;
    if (/grand.crown|high.ceiling.*library|library.*crown/.test(l)) return PHOTOS.coffered_ceiling;
    if (/hotel.*crown|crown.*hotel|hotel.*wainscot/.test(l))  return PHOTOS.crown_hotel;
    if (/crown.molding|crown.*ceiling|ceiling.molding|dentil/.test(l)) return PHOTOS.crown_molding;
    // Base / casing
    if (/base.cap|base.molding|baseboard|tall.base|minimal.*base/.test(l)) return PHOTOS.baseboard;
    if (/staircase.*molding/.test(l))                         return PHOTOS.staircase_molding;
    if (/casing|door.frame|door.casing/.test(l))              return PHOTOS.door_casing;
    // Chair rail
    if (/colonial.chair|traditional.*chair/.test(l))          return PHOTOS.chair_rail_formal;
    if (/chair.rail.*dining|dining.*chair.rail|formal.*dining.*chair/.test(l)) return PHOTOS.chair_rail_formal;
    if (/chair.rail/.test(l))                                 return PHOTOS.chair_rail;
    // Wainscoting / paneling
    if (/beadboard/.test(l))                                  return PHOTOS.board_batten;
    if (/board.and.batten|board.*batten/.test(l))             return PHOTOS.board_batten;
    if (/shadow.box/.test(l))                                 return PHOTOS.shadow_box;
    if (/picture.frame|gallery.wall/.test(l))                 return PHOTOS.shadow_box;
    if (/panel.molding|wall.panel.grid|panel.grid|dining.room.panel|formal.living.*panel/.test(l)) return PHOTOS.shadow_box;
    if (/executive.board/.test(l))                            return PHOTOS.shadow_box;
    if (/wainscot/.test(l))                                   return PHOTOS.wainscoting;
    // Hardware
    if (/matte.black.*lever|linear.lever|j.pull|matte.black.*pull|cabinet.*pull/.test(l)) return PHOTOS.lever_black;
    if (/lever|door.handle|brass.*handle|handle.*brass/.test(l)) return PHOTOS.lever_brass;
    if (/crystal.knob/.test(l))                               return PHOTOS.knob_crystal;
    if (/knob/.test(l))                                       return PHOTOS.knob_brass;
    if (/hinge|flush.bolt|door.stop|door.closer|mortise|cremone|entry.pull|barn.*pull|barn.*hardware|hardware.display/.test(l)) return PHOTOS.hinge_brass;
    // No hardcoded match — fall back to query
    return null;
  }

  // Fallback: stable seed for source.unsplash.com queries
  function _sig(label) {
    var h = 5381;
    for (var i = 0; i < label.length; i++) h = (h * 33 ^ label.charCodeAt(i)) >>> 0;
    return (h % 900) + 50;
  }

  // Fallback query for categories not covered by hardcoded IDs.
  function _query(label) {
    var l = label.toLowerCase();
    // Barn doors
    if (/z.brace/.test(l))                              return 'z-brace+barn+door+black+industrial+wood';
    if (/x.brace/.test(l))                              return 'x-brace+barn+door+farmhouse+pine+wood';
    if (/bypass/.test(l))                               return 'bypass+sliding+barn+door+wood+modern';
    if (/glass.*barn|barn.*glass/.test(l))              return 'glass+panel+barn+door+modern+interior';
    if (/shaker.*barn|barn.*shaker|panel.*barn/.test(l))return 'shaker+barn+door+white+oak+minimal';
    if (/reclaimed.*barn|plank.*barn|wide.*sliding/.test(l)) return 'reclaimed+wood+barn+door+rustic+rail';
    if (/double.bypass/.test(l))                        return 'double+bypass+barn+door+walnut+bedroom';
    if (/barn.door/.test(l))                            return 'barn+door+sliding+interior+wood+modern';
    // Interior doors
    if (/shaker|5-panel|five.panel/.test(l))            return 'shaker+5+panel+interior+wood+door+clean';
    if (/craftsman|2-panel|two.panel/.test(l))          return 'craftsman+2+panel+interior+wood+door';
    if (/raised.panel/.test(l))                         return 'raised+panel+interior+door+traditional+wood';
    if (/louvered/.test(l))                             return 'louvered+interior+door+white+painted';
    if (/glass.lite|10.lite|15.lite|true.divided/.test(l)) return 'glass+panel+interior+door+french+lite';
    if (/flush.*door|flat.panel.*door/.test(l))         return 'flush+minimal+interior+door+wood+modern';
    if (/custom.*arched|arch.*interior/.test(l))        return 'custom+arched+interior+door+cherry+wood';
    if (/interior.*door|interior.*solid/.test(l))       return 'interior+solid+wood+door+panel+minimal';
    // Exterior doors
    if (/dutch.door/.test(l))                           return 'dutch+door+exterior+painted+split+wood';
    if (/arched.*exterior|ornate.*exterior/.test(l))    return 'arched+exterior+wood+door+ornate+entry';
    if (/contemporary.exterior|modern.exterior/.test(l))return 'modern+contemporary+exterior+door+white+oak';
    if (/sidelight|grand.*entry|grand.*oak|grand.*mahogany|grand.*white.oak/.test(l)) return 'grand+entry+door+wood+sidelights+transom+luxury';
    if (/entry.door|front.door/.test(l))                return 'front+entry+door+wood+home+exterior';
    if (/exterior.french|terrace.door/.test(l))         return 'exterior+french+doors+terrace+garden+wood';
    if (/exterior.*solid|solid.*exterior/.test(l))      return 'solid+wood+exterior+door+sidelights+modern';
    // French doors
    if (/bifold|accordion/.test(l))                     return 'bifold+french+doors+wood+glass+interior';
    if (/pocketing/.test(l))                            return 'pocketing+french+door+interior+wall+sliding';
    if (/half.glass|half-glass/.test(l))                return 'french+door+half+glass+wood+interior+panel';
    if (/full.glass/.test(l))                           return 'full+glass+french+door+minimal+modern';
    if (/pair.*open|open.*garden|sunlit.garden/.test(l))return 'french+doors+open+garden+sunlit+natural+light';
    if (/french.door/.test(l))                          return 'french+doors+glass+wood+interior+light';
    // Fire-rated / commercial
    if (/ul.listing|ul.list/.test(l))                   return 'fire+door+label+UL+listing+plate+metal+close';
    if (/fire.rated|fire.rated.*walnut|fire.rated.*wood/.test(l)) return 'fire+rated+steel+metal+door+commercial+industrial';
    if (/hotel.room.door|corridor.door/.test(l))        return 'hotel+corridor+room+door+wood+hospitality';
    // Custom / pivot
    if (/pivot/.test(l))                                return 'pivot+door+oversized+wood+modern+polished+brass';
    if (/custom.*carved|carved.*mahogany/.test(l))      return 'carved+mahogany+wood+door+ornate+custom+entry';
    if (/custom.*door|made.to.spec/.test(l))            return 'custom+handcrafted+wood+door+bespoke+interior';
    // Crown molding
    if (/dentil/.test(l))                               return 'crown+molding+dentil+detail+white+painted+close';
    if (/coffered/.test(l))                             return 'coffered+ceiling+panel+molding+library+wood+beams';
    if (/grand.crown|high.ceiling.*crown/.test(l))      return 'grand+crown+molding+high+ceiling+library+bookcase';
    if (/hotel.*crown|crown.*hotel/.test(l))            return 'hotel+lobby+crown+molding+luxury+grand+interior';
    if (/crown.molding|crown.*ceiling|ceiling.molding/.test(l)) return 'crown+molding+white+painted+ceiling+architectural';
    // Casing
    if (/backband/.test(l))                             return 'door+casing+backband+formal+traditional+depth';
    if (/colonial.*cas|ogee.*cas/.test(l))              return 'colonial+ogee+door+casing+trim+traditional+wood';
    if (/craftsman.*cas/.test(l))                       return 'craftsman+door+casing+rosette+flat+painted+white';
    if (/minimal.*cas|modern.*cas/.test(l))             return 'modern+minimal+door+casing+contemporary+clean';
    if (/built.up.*cas|layered.*cas/.test(l))           return 'layered+built+up+door+casing+formal+doorway';
    if (/colonial.stop/.test(l))                        return 'colonial+stop+casing+traditional+profile+wood';
    if (/casing|door.frame|door.casing/.test(l))        return 'door+window+casing+trim+wood+interior+craftsman';
    // Base molding
    if (/base.cap/.test(l))                             return 'base+cap+molding+floor+transition+hardwood';
    if (/modern.minimal.*base|minimal.*base/.test(l))   return 'modern+minimal+baseboard+white+oak+natural';
    if (/tall.base/.test(l))                            return 'tall+baseboard+formal+room+painted+white+elegant';
    if (/base.molding|baseboard/.test(l))               return 'baseboard+molding+floor+trim+white+painted+interior';
    // Staircase
    if (/staircase.*molding/.test(l))                   return 'staircase+wall+panel+molding+angled+installation';
    // Chair rail
    if (/built.up.chair|layered.chair/.test(l))         return 'built+up+chair+rail+two+piece+cap+base+molding';
    if (/colonial.chair/.test(l))                       return 'colonial+chair+rail+formal+traditional+hallway';
    if (/craftsman.chair/.test(l))                      return 'craftsman+chair+rail+flat+bead+detail';
    if (/modern.*chair.rail|flat.*chair.rail|minimal.*chair/.test(l)) return 'modern+minimal+flat+chair+rail+contemporary+clean';
    if (/traditional.*chair/.test(l))                   return 'traditional+ogee+chair+rail+profile+formal';
    if (/chair.rail/.test(l))                           return 'chair+rail+molding+dining+room+two+tone+wall';
    // Wainscoting / paneling
    if (/beadboard.*sage|sage.*beadboard/.test(l))      return 'beadboard+wainscoting+sage+green+painted+kitchen';
    if (/beadboard/.test(l))                            return 'beadboard+wainscoting+white+painted+cottage+interior';
    if (/board.and.batten.*dining|board.*batten.*farm/.test(l)) return 'board+batten+wall+farmhouse+dining+room+modern';
    if (/board.and.batten/.test(l))                     return 'board+and+batten+wall+panel+farmhouse+interior';
    if (/shadow.box/.test(l))                           return 'shadow+box+wall+panel+bedroom+contemporary';
    if (/raised.panel.wainscot/.test(l))                return 'raised+panel+wainscoting+formal+hallway+white+painted';
    if (/flat.panel.wainscot/.test(l))                  return 'flat+panel+wainscoting+contemporary+shaker+white';
    if (/full.wainscot|dining.*wainscot/.test(l))       return 'full+height+wainscoting+dining+room+formal+chair+rail';
    if (/wainscot.*install|install.*wainscot/.test(l))  return 'wainscoting+installation+formal+dining+traditional';
    if (/wainscot.*cap/.test(l))                        return 'wainscoting+cap+panel+hallway+painted';
    if (/hotel.*wainscot|wainscot.*hotel/.test(l))      return 'hotel+lobby+full+height+wainscoting+crown+molding';
    if (/wainscot/.test(l))                             return 'wainscoting+interior+hallway+white+painted+wall+panel';
    // Panel molding
    if (/picture.frame|gallery.wall/.test(l))           return 'picture+frame+panel+molding+gallery+wall+formal+room';
    if (/dining.room.panel/.test(l))                    return 'dining+room+wall+panel+molding+painted+white+elegant';
    if (/formal.living.*panel|panel.*formal.living/.test(l)) return 'formal+living+room+wall+panel+grid+shadow+reveals';
    if (/executive.board/.test(l))                      return 'executive+boardroom+solid+walnut+doors+wall+paneling';
    if (/panel.molding|wall.panel.grid|panel.grid/.test(l)) return 'wall+panel+molding+grid+formal+interior+painted+white';
    if (/coffered.*panel|panel.*beam/.test(l))          return 'coffered+panel+molding+library+beams+ceiling';
    // Hardware – levers
    if (/arch.*lever.*bronze|arch.*bronze/.test(l))     return 'arch+lever+handle+oil+rubbed+bronze+door+close';
    if (/craftsman.lever|craftsman.*brass/.test(l))     return 'craftsman+lever+solid+brass+satin+door+handle';
    if (/linear.lever|matte.black.*lever|lever.*matte.black/.test(l)) return 'linear+matte+black+lever+door+handle+modern+minimal';
    if (/offset.lever|brushed.brass/.test(l))           return 'brushed+brass+offset+lever+door+handle+contemporary';
    if (/close.up.*lever|lever.*close.up|brass.*lever.*door/.test(l)) return 'brass+lever+set+door+close+up+antique+painted';
    if (/solid.brass.lever/.test(l))                    return 'solid+brass+lever+handle+door+hardware+satin';
    // Hardware – knobs
    if (/crystal.knob/.test(l))                         return 'crystal+glass+door+knob+brass+faceted+hardware';
    if (/round.knob|polished.brass.*knob/.test(l))      return 'round+polished+brass+door+knob+traditional+hardware';
    if (/oil.rub.*knob/.test(l))                        return 'oil+rubbed+bronze+door+knob+hardware+close';
    if (/knob/.test(l))                                 return 'door+knob+hardware+close+up+metal+brass';
    // Hardware – pulls / bolts
    if (/cremone/.test(l))                              return 'cremone+bolt+brass+french+door+closure+hardware';
    if (/barn.*hardware|rail.system|matte.black.rail/.test(l)) return 'barn+door+hardware+matte+black+rail+system';
    if (/barn.*pull|wrought.iron/.test(l))              return 'barn+door+pull+wrought+iron+rustic+handle';
    if (/entry.pull|18.*pull|architectural.*pull/.test(l)) return 'entry+pull+18+inch+solid+brass+bar+architectural';
    if (/commercial.*pull/.test(l))                     return 'commercial+door+pull+brushed+nickel+hardware';
    if (/j.pull|cabinet.*pull|pulls.*black/.test(l))    return 'matte+black+cabinet+door+pull+modern+hardware';
    if (/matte.black.pull|matte.black.*door.pull/.test(l)) return 'matte+black+door+pull+modern+hardware+entry';
    if (/flush.bolt/.test(l))                           return 'flush+bolt+door+hardware+brass+top+bottom';
    if (/door.stop/.test(l))                            return 'brass+door+stop+wall+mount+hardware+close+up';
    if (/door.closer/.test(l))                          return 'surface+mount+door+closer+commercial+hardware';
    if (/mortise/.test(l))                              return 'mortise+lock+set+antique+brass+estate+door+hardware';
    if (/hardware.display/.test(l))                     return 'door+hardware+showroom+display+handles+finishes+all';
    if (/hinge/.test(l))                                return 'ball+bearing+butt+hinge+door+hardware+brass+close';
    if (/hardware|handle|lever|pull/.test(l))           return 'door+hardware+handle+metal+close+up+brass';
    // Wood grain
    if (/white.oak.grain|white.oak.*close/.test(l))     return 'white+oak+wood+grain+natural+close+up+texture';
    if (/walnut.grain/.test(l))                         return 'walnut+wood+grain+dark+rich+close+up+texture';
    if (/cherry.*grain|cherry.*warm/.test(l))           return 'cherry+wood+grain+warm+reddish+close+up+texture';
    if (/mahogany.grain|mahogany.*straight/.test(l))    return 'mahogany+wood+grain+straight+reddish+brown+close';
    if (/maple.grain|maple.*tight/.test(l))             return 'maple+wood+grain+tight+light+close+up+texture';
    if (/alder.grain|alder.*reddish/.test(l))           return 'alder+wood+grain+light+reddish+brown+close+up';
    if (/douglas.fir|fir.*knotty|fir.*warm/.test(l))   return 'douglas+fir+grain+warm+knotty+wood+texture';
    if (/poplar.grain|poplar.*light/.test(l))           return 'poplar+wood+grain+light+painted+close+up';
    if (/paint.grade/.test(l))                          return 'paint+grade+primed+white+door+studio+clean';
    // Workshop / facility
    if (/cnc|router/.test(l))                           return 'cnc+router+cutting+wood+panel+precision+machine';
    if (/planing|hand.plan|planing.*oak/.test(l))       return 'craftsman+hand+planing+solid+oak+workbench+tools';
    if (/staining|finishing.booth/.test(l))             return 'wood+door+staining+finishing+spray+workshop+booth';
    if (/shop.drawing|designer.*review/.test(l))        return 'architect+designer+reviewing+shop+drawings+door+samples';
    if (/molding.profile|hundreds/.test(l))             return 'molding+profile+wall+display+samples+wood+trim';
    if (/wood.*sample|finish.*chip|sample.*chip/.test(l)) return 'wood+stain+finish+sample+chips+design+table+spread';
    if (/wide.angle.*facility|brooklyn.facility/.test(l)) return 'millwork+factory+facility+floor+wood+production+wide';
    if (/aerial.*brooklyn|aerial.*facility/.test(l))   return 'aerial+industrial+building+brooklyn+rooftop+facility';
    if (/master.craftsman|craftsman.at.bench/.test(l))  return 'master+craftsman+workbench+planing+wood+portrait';
    if (/workshop|woodwork|carpenter/.test(l))          return 'woodworking+workshop+craftsman+hand+tools+bench';
    if (/lumber|wood.stack|stack.*cured|cured.*hardwood/.test(l)) return 'hardwood+lumber+stack+cured+planks+warehouse';
    if (/facility|production|mill/.test(l))             return 'millwork+production+facility+wood+workshop+factory';
    // People
    if (/robert.hollis|founder.*workbench|circa.1990/.test(l)) return 'woodworker+craftsman+workbench+vintage+portrait';
    if (/claire|ceo.*portrait|portrait.*ceo/.test(l))   return 'businesswoman+professional+portrait+executive+modern';
    if (/diane|design.director/.test(l))                return 'interior+designer+professional+woman+portrait+office';
    if (/marcus|head.of.production/.test(l))            return 'production+manager+craftsman+workshop+man+portrait';
    if (/portrait/.test(l))                             return 'professional+portrait+modern+office+confident';
    // Interiors
    if (/hotel.lobby.*wainscot|hotel.*wainscot/.test(l)) return 'hotel+lobby+wainscoting+crown+molding+luxury+grand';
    if (/hotel.lobby.*crown/.test(l))                   return 'hotel+lobby+crown+molding+grand+luxury+interior';
    if (/hotel.corridor|suite.entry/.test(l))           return 'hotel+corridor+luxury+wood+doors+warm+lighting';
    if (/hotel.room.door|hotel.lobby/.test(l))          return 'hotel+lobby+luxury+grand+interior+wood+doors';
    if (/hotel|hospitality|resort/.test(l))             return 'luxury+hotel+interior+wood+doors+hospitality';
    if (/boardroom|executive.*panel/.test(l))           return 'executive+boardroom+wood+panel+wall+formal+doors';
    if (/office|commercial/.test(l))                    return 'commercial+office+interior+wood+door+modern';
    if (/dining.room.*wainscot|full.wainscot/.test(l))  return 'dining+room+wainscoting+chair+rail+formal+wall';
    if (/dining.room/.test(l))                          return 'formal+dining+room+interior+molding+wall+elegant';
    if (/living.room|open.plan|modern.interior/.test(l))return 'modern+living+room+interior+design+wood+door+open';
    if (/hallway|foyer|corridor/.test(l))               return 'hallway+entry+interior+corridor+wood+door+panels';
    if (/showroom/.test(l))                             return 'door+showroom+display+row+solid+wood+doors+products';
    // Location / map
    if (/map|brooklyn.*location|showroom.*location/.test(l)) return 'brooklyn+new+york+street+neighborhood+building';
    // Hero / catch-all
    if (/hero/.test(l))                                 return 'grand+wood+entry+door+luxury+interior+warm+light';
    if (/exterior/.test(l))                             return 'exterior+home+architecture+front+door+wood+luxury';
    if (/interior/.test(l))                             return 'interior+design+wood+door+modern+minimal+clean';
    if (/door/.test(l))                                 return 'solid+wood+door+interior+architecture+clean';
    if (/molding/.test(l))                              return 'architectural+molding+trim+white+painted+interior';
    return 'interior+architecture+wood+door+minimal+clean';
  }

  function loadPhotos() {
    document.querySelectorAll('.img-ph').forEach(function (ph) {
      var labelEl = ph.querySelector('.img-ph-label');
      var label   = labelEl ? labelEl.textContent.trim() : '';
      var isStyleImg = ph.classList.contains('style-img');
      var isCatImg   = ph.classList.contains('cat-img');

      var w = Math.max(ph.offsetWidth  || 800, 200);
      var h = Math.max(ph.offsetHeight || 600, 150);

      var id  = _photoId(label);
      var src = id
        ? 'https://images.unsplash.com/photo-' + id
          + '?w=' + Math.round(w * 1.5) + '&h=' + Math.round(h * 1.5)
          + '&auto=format&fit=crop&q=80'
        : 'https://source.unsplash.com/featured/'
          + Math.round(w * 1.5) + 'x' + Math.round(h * 1.5)
          + '/?' + _query(label) + '&sig=' + _sig(label);

      // Product cards: light background so the image reads clean
      if (isStyleImg) {
        ph.style.background = '#f4f1ec';
      } else if (isCatImg) {
        ph.style.background = '#1a1714';
      } else {
        ph.style.background = '#ede9e1';
      }

      var pos = window.getComputedStyle(ph).position;
      if (pos === 'static') ph.style.position = 'relative';

      var img = document.createElement('img');
      img.src     = src;
      img.alt     = label;
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';
      img.loading = 'lazy';
      img.onload  = function () { if (labelEl) labelEl.style.display = 'none'; };
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
