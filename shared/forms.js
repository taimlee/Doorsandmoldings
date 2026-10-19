/* ===================================================
   SOLID DOORS & MOLDINGS — Form sending
   One sender for the contact and quote forms:
     · success only when FormSubmit confirms it (not just any reply)
     · keepalive, so leaving the page does not cancel a slow send
     · patient: FormSubmit can take a minute; the button says so after 8s
     · one automatic retry on a network error or timeout
     · honeypot field (_honey) silently drops bots
   usage: SDM.sendForm(endpoint, payload, { onSlow: fn }) -> Promise
   =================================================== */
(function () {
  var SLOW_AFTER = 8000, TIMEOUT = 120000;

  function once(endpoint, payload, onSlow) {
    return new Promise(function (resolve, reject) {
      var ctl = ('AbortController' in window) ? new AbortController() : null;
      var slowTimer = setTimeout(function () { if (onSlow) onSlow(); }, SLOW_AFTER);
      var killTimer = setTimeout(function () { if (ctl) ctl.abort(); }, TIMEOUT);
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: ctl ? ctl.signal : undefined
      })
        .then(function (r) {
          return r.text().then(function (t) {
            var j = null; try { j = JSON.parse(t); } catch (e) {}
            var ok = r.ok && j && (j.success === 'true' || j.success === true);
            if (ok) resolve(j);
            else reject(new Error((j && j.message) || ('HTTP ' + r.status)));
          });
        })
        .catch(reject)
        .finally(function () { clearTimeout(slowTimer); clearTimeout(killTimer); });
    });
  }

  function sendForm(endpoint, payload, opts) {
    opts = opts || {};
    if (payload._honey) return Promise.resolve({ success: 'true', honeypot: true });
    var slowFired = false;
    var onSlow = function () { if (!slowFired) { slowFired = true; if (opts.onSlow) opts.onSlow(); } };
    return once(endpoint, payload, onSlow).catch(function (err) {
      // A retry only helps for network-level failures; a rejection from the service itself stays final.
      if (/HTTP 4|activat|invalid/i.test(String(err && err.message))) throw err;
      return once(endpoint, payload, onSlow);
    });
  }

  window.SDM = window.SDM || {};
  window.SDM.sendForm = sendForm;
})();
