/* CleanCore Decon — i18n: language selector, browser auto-detect + redirect, per-locale fonts.
   URL scheme: English at root (/), others under /es/ /zh/ /ko/ /hy/ mirroring the same paths. */
(function () {
  var LOCALES = [
    { code: 'en', label: 'English',   short: 'EN',        prefix: '',    font: null },
    { code: 'es', label: 'Español',   short: 'ES',        prefix: '/es', font: null },
    { code: 'zh', label: '中文',       short: '中文',       prefix: '/zh', font: 'Noto+Sans+SC:wght@400;500;700;800',       family: "'Noto Sans SC'" },
    { code: 'ko', label: '한국어',      short: '한국어',      prefix: '/ko', font: 'Noto+Sans+KR:wght@400;500;700;800',       family: "'Noto Sans KR'" },
    { code: 'hy', label: 'Հայերեն',   short: 'Հայ',        prefix: '/hy', font: 'Noto+Sans+Armenian:wght@400;500;700;800', family: "'Noto Sans Armenian'" }
  ];
  var CODES = LOCALES.map(function (l) { return l.code; });
  var STORE = 'ccd_lang';
  var byCode = {};
  LOCALES.forEach(function (l) { byCode[l.code] = l; });

  var LOCALE_RE = /^\/(es|zh|ko|hy)(?=\/|$)/;

  function currentCode() {
    var m = location.pathname.match(LOCALE_RE);
    return m ? m[1] : 'en';
  }
  function basePath() {
    var p = location.pathname.replace(LOCALE_RE, '');
    if (p === '' ) p = '/';
    if (p.charAt(0) !== '/') p = '/' + p;
    return p;
  }
  function urlFor(code) {
    var base = basePath();
    var pre = byCode[code].prefix;
    var path = (base === '/') ? (pre + '/') : (pre + base);
    return path + location.search + location.hash;
  }
  function detect() {
    var langs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var l = (langs[i] || '').toLowerCase();
      if (l.indexOf('zh') === 0) return 'zh';
      var two = l.slice(0, 2);
      if (CODES.indexOf(two) >= 0) return two;
    }
    return 'en';
  }

  var cur = currentCode();
  var stored = null;
  try { stored = localStorage.getItem(STORE); } catch (e) {}
  if (stored && CODES.indexOf(stored) < 0) stored = null;

  /* Auto-redirect only from the default (English) URLs, so an explicit /es/, /zh/… link
     is always respected. Stored manual choice wins over browser detection. */
  if (cur === 'en') {
    var desired = stored || detect();
    if (desired !== 'en') { location.replace(urlFor(desired)); return; }
  }

  /* ---- per-locale font ---- */
  var me = byCode[cur];
  if (me.font) {
    var fl = document.createElement('link');
    fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=' + me.font + '&display=swap';
    document.head.appendChild(fl);
    var fs = document.createElement('style');
    fs.textContent =
      'html[lang="' + cur + '"] body, html[lang="' + cur + '"] body *:not([data-lucide]):not(svg):not(path){' +
      'font-family:' + me.family + ",'Inter',system-ui,sans-serif !important}";
    document.head.appendChild(fs);
  }

  /* ---- selector styles ---- */
  var css = document.createElement('style');
  css.textContent = [
    '.rlang{position:relative;display:flex;align-items:center}',
    '.rlang-btn{display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 12px;border-radius:999px;',
    'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#eaf1f8;',
    'font:600 14px/1 "Inter",system-ui,sans-serif;cursor:pointer;transition:background .2s,border-color .2s}',
    '.rlang-btn:hover{background:rgba(255,255,255,.16)}',
    '.rlang-btn .rl-globe{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:2}',
    '.rlang-btn .rl-chev{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.4;transition:transform .2s}',
    '.rlang.open .rlang-btn .rl-chev{transform:rotate(180deg)}',
    '.rnav.scrolled .rlang-btn{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.24);color:#fff}',
    '.rnav.scrolled .rlang-btn:hover{background:rgba(255,255,255,.24)}',
    '.rlang-menu{position:absolute;top:calc(100% + 10px);right:0;min-width:184px;padding:7px;',
    'background:#fff;border:1px solid var(--hair,#E2E8F0);border-radius:14px;',
    'box-shadow:0 18px 44px rgba(10,37,64,.18);opacity:0;transform:translateY(-8px) scale(.98);',
    'transform-origin:top right;pointer-events:none;transition:opacity .2s,transform .2s;z-index:60}',
    '.rlang.open .rlang-menu{opacity:1;transform:none;pointer-events:auto}',
    '.rlang-menu a{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;',
    'border-radius:9px;color:var(--ink,#1A2433);font:600 14.5px/1.2 "Inter",system-ui,sans-serif;',
    'text-decoration:none;transition:background .15s}',
    '.rlang-menu a:hover{background:var(--bg-soft,#EEF3F9)}',
    '.rlang-menu a[aria-current="true"]{color:var(--blue,#1288CE)}',
    '.rlang-menu a .rl-ck{width:16px;height:16px;stroke:var(--blue,#1288CE);fill:none;stroke-width:2.6;opacity:0}',
    '.rlang-menu a[aria-current="true"] .rl-ck{opacity:1}',
    /* mobile block */
    '.rlang-m{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;padding-top:16px;border-top:1px solid var(--hair,#E2E8F0)}',
    '.rlang-m a{display:flex;align-items:center;justify-content:center;gap:7px;padding:12px 10px;border-radius:11px;',
    'background:var(--bg-soft,#EEF3F9);color:var(--ink,#1A2433);font:600 14.5px/1 "Inter",system-ui,sans-serif;text-decoration:none}',
    '.rlang-m a[aria-current="true"]{background:var(--blue,#1288CE);color:#fff}'
  ].join('');
  document.head.appendChild(css);

  var GLOBE = '<svg class="rl-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>';
  var CHEV = '<svg class="rl-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
  var CK = '<svg class="rl-ck" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';

  function pick(code, e) {
    if (e) e.preventDefault();
    try { localStorage.setItem(STORE, code); } catch (err) {}
    if (code === cur) { closeAll(); return; }
    location.href = urlFor(code);
  }
  function menuLinks(cls) {
    /* href set later via setAttribute (urlFor embeds location.search/hash — never inject into innerHTML) */
    return LOCALES.map(function (l) {
      var sel = l.code === cur ? ' aria-current="true"' : '';
      var extra = cls === 'menu' ? CK : '';
      return '<a href="#" data-lang="' + l.code + '"' + sel + '>' +
        '<span>' + l.label + '</span>' + extra + '</a>';
    }).join('');
  }
  function wireLinks(root) {
    root.querySelectorAll('a[data-lang]').forEach(function (a) {
      var code = a.getAttribute('data-lang');
      a.setAttribute('href', urlFor(code));
      a.addEventListener('click', function (e) { pick(code, e); });
    });
  }

  function build() {
    var cta = document.querySelector('.rnav .rcta');
    if (cta && !cta.querySelector('.rlang')) {
      var wrap = document.createElement('div');
      wrap.className = 'rlang';
      wrap.innerHTML =
        '<button class="rlang-btn" aria-haspopup="true" aria-expanded="false" aria-label="Language">' +
        GLOBE + '<span class="rl-cur">' + me.short + '</span>' + CHEV + '</button>' +
        '<div class="rlang-menu" role="menu">' + menuLinks('menu') + '</div>';
      cta.insertBefore(wrap, cta.firstChild);
      var btn = wrap.querySelector('.rlang-btn');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        wrap.classList.toggle('open');
        btn.setAttribute('aria-expanded', wrap.classList.contains('open') ? 'true' : 'false');
      });
      wireLinks(wrap);
    }
    var mob = document.querySelector('.rmobile');
    if (mob && !mob.querySelector('.rlang-m')) {
      var mblock = document.createElement('div');
      mblock.className = 'rlang-m';
      mblock.innerHTML = menuLinks('mobile');
      mob.appendChild(mblock);
      wireLinks(mblock);
    }
  }
  function closeAll() {
    var w = document.querySelector('.rlang.open');
    if (w) { w.classList.remove('open'); var b = w.querySelector('.rlang-btn'); if (b) b.setAttribute('aria-expanded', 'false'); }
  }
  document.addEventListener('click', closeAll);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
