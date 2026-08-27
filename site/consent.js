/* Bassin Digital — consentement RGPD partagé par toutes les pages.
   Google Analytics n'est chargé qu'après accord (clé localStorage "bd-consent", commune à l'accueil). */
(function () {
  var KEY = 'bd-consent', GA_ID = 'G-3YHDGH5L1B';
  function loadGA() {
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag; gtag('js', new Date()); gtag('config', GA_ID, { anonymize_ip: true });
  }
  var EN = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  var BASE = /\/en\//.test(location.pathname) ? '../' : '';
  var TXT = EN
    ? 'We use Google Analytics to measure the site\u2019s audience, only with your consent. See the <a href="' + BASE + 'mentions-legales.html">legal notice</a>.'
    : 'Nous utilisons Google Analytics pour mesurer l\u2019audience du site, uniquement avec votre accord. Voir les <a href="' + BASE + 'mentions-legales.html">mentions l\u00e9gales</a>.';
  var NO = EN ? 'Decline' : 'Refuser', OK = EN ? 'Accept' : 'Accepter';
  var stored = null; try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === 'accept') { loadGA(); return; }
  if (stored === 'refuse') { return; }
  function show() {
    if (document.getElementById('bd-consent')) return;
    var b = document.createElement('div');
    b.id = 'bd-consent'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', EN ? 'Cookie consent' : 'Consentement cookies');
    b.innerHTML =
      '<style>' +
      '#bd-consent{position:fixed;bottom:0;left:0;right:0;z-index:240;background:rgba(255,255,255,0.97);border-top:1px solid rgba(0,0,0,0.08);box-shadow:0 -10px 40px rgba(29,29,31,0.08);padding:0.75rem 1.5rem;display:flex;align-items:center;gap:1rem 1.5rem;flex-wrap:wrap;font-family:Jost,"Helvetica Neue",Arial,sans-serif;font-weight:300;opacity:0;transform:translateY(100%);transition:opacity .4s ease,transform .4s ease}' +
      '#bd-consent.show{opacity:1;transform:translateY(0)}' +
      '#bd-consent p{flex:1;min-width:220px;margin:0;font-size:0.8rem;line-height:1.45;color:rgba(29,29,31,0.72)}' +
      '#bd-consent p a{color:#1a7a6e}' +
      '#bd-consent .a{display:flex;gap:0.6rem;margin-left:auto}' +
      '#bd-consent button{font-family:inherit;font-size:0.8rem;letter-spacing:0.08em;padding:0.55rem 1.1rem;border-radius:8px;cursor:pointer}' +
      '#bd-consent .ok{background:#1d1d1f;color:#fff;border:1px solid #1d1d1f}' +
      '#bd-consent .no{background:transparent;color:rgba(29,29,31,0.72);border:1px solid rgba(0,0,0,0.16)}' +
      '@media (prefers-reduced-motion:reduce){#bd-consent{transition:none}}' +
      '</style>' +
      '<p>' + TXT + '</p>' +
      '<div class="a"><button type="button" class="no">' + NO + '</button><button type="button" class="ok">' + OK + '</button></div>';
    document.body.appendChild(b);
    setTimeout(function () { b.classList.add('show'); }, 900);
    b.querySelector('.ok').addEventListener('click', function () { try { localStorage.setItem(KEY, 'accept'); } catch (e) {} b.classList.remove('show'); loadGA(); });
    b.querySelector('.no').addEventListener('click', function () { try { localStorage.setItem(KEY, 'refuse'); } catch (e) {} b.classList.remove('show'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
