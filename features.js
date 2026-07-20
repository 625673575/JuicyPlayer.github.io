/* ======================================================
   Juicy Player — Extended interactive features
   ====================================================== */
;(function () {
  'use strict';
  var doc = document;

  var ICON_PLAY = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_PAUSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

  /* shared playback state */
  var state = { playing: false, volume: 0.8, progress: 0, duration: 214, track: 'Neon Tide', artist: 'Juicy Player Radio' };

  /* ---------- Theme + accent ---------- */
  function applyTheme(t) {
    doc.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('jp-theme', t); } catch (e) {}
    var b = doc.getElementById('themeToggle');
    if (b) b.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
  }
  function applyAccent(a) {
    doc.documentElement.setAttribute('data-accent', a);
    try { localStorage.setItem('jp-accent', a); } catch (e) {}
    doc.querySelectorAll('.accent-dot').forEach(function (d) {
      d.classList.toggle('active', d.dataset.accent === a);
    });
  }
  var savedTheme = 'dark', savedAccent = 'orange';
  try { savedTheme = localStorage.getItem('jp-theme') || 'dark'; } catch (e) {}
  try { savedAccent = localStorage.getItem('jp-accent') || 'orange'; } catch (e) {}
  applyTheme(savedTheme);
  applyAccent(savedAccent);

  var themeBtn = doc.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    applyTheme(doc.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
  doc.querySelectorAll('.accent-dot').forEach(function (d) {
    d.addEventListener('click', function () { applyAccent(d.dataset.accent); });
  });

  /* ---------- shared play control (drives hero + now-playing) ---------- */
  var lp, lpPlay, lpBars, lpFill, lpTime, lpVol, lpArt;
  var heroEl = doc.getElementById('hero');

  function setPlaying(p) {
    state.playing = p;
    if (lp) lp.classList.toggle('playing', p);
    if (lpPlay) lpPlay.innerHTML = p ? ICON_PAUSE : ICON_PLAY;
  }

  /* ---------- Hero live player ---------- */
  lp = doc.getElementById('livePlayer');
  if (lp) {
    lpPlay = doc.getElementById('lpPlay');
    lpBars = doc.getElementById('lpBars');
    lpFill = doc.getElementById('lpFill');
    lpTime = doc.getElementById('lpTime');
    lpVol = doc.getElementById('lpVol');
    lpArt = doc.getElementById('lpArt');

    var BAR_N = 28;
    for (var i = 0; i < BAR_N; i++) {
      var bar = doc.createElement('div');
      bar.className = 'lp-bar';
      lpBars.appendChild(bar);
    }
    var bars = lpBars.children;

    function fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

    (function renderBars() {
      var now = performance.now() / 1000;
      for (var j = 0; j < bars.length; j++) {
        var h;
        if (state.playing) {
          h = 22 + (Math.sin(now * 6 + j * 0.5) * 0.5 + 0.5) * 58 + Math.random() * 14;
        } else {
          h = 8 + (Math.sin(now * 1.5 + j) * 0.5 + 0.5) * 8;
        }
        bars[j].style.height = h + '%';
      }
      requestAnimationFrame(renderBars);
    })();

    (function tick() {
      if (state.playing) {
        state.progress += 0.1;
        if (state.progress >= state.duration) state.progress = 0;
        if (lpFill) lpFill.style.width = (state.progress / state.duration * 100) + '%';
        if (lpTime) lpTime.textContent = fmt(state.progress);
      }
      setTimeout(tick, 100);
    })();

    if (lpPlay) lpPlay.addEventListener('click', function () { setPlaying(!state.playing); });
    if (lpVol) lpVol.addEventListener('input', function () { state.volume = lpVol.value / 100; });
    lpPlay.innerHTML = ICON_PLAY;
  }



  /* ---------- Command palette (Ctrl/Cmd+K) ---------- */
  var palette = doc.getElementById('palette');
  if (palette) {
    var pInput = doc.getElementById('paletteInput');
    var pList = doc.getElementById('paletteList');
    var pBtn = doc.getElementById('searchToggle');
    var items = [
      { label: '功能 Features', icon: '◆', target: '#features' },
      { label: '预览 Showcase', icon: '◈', target: '#showcase' },

      { label: '下载 Download', icon: '↓', target: '#download' },
      { label: '常见问题 FAQ', icon: '?', target: '#faq' },
      { label: '切换语言 Toggle language', icon: '文', action: 'lang' },
      { label: '切换主题 Toggle theme', icon: '☾', action: 'theme' }
    ];
    var activeIdx = 0;

    function renderPalette(filter) {
      filter = (filter || '').toLowerCase();
      activeIdx = 0;
      var list = items.filter(function (it) { return it.label.toLowerCase().indexOf(filter) > -1; });
      pList._items = list;
      if (!list.length) {
        pList.innerHTML = '<div class="palette-empty" data-i18n="paletteEmpty">没有找到结果</div>';
        return;
      }
      var html = '';
      list.forEach(function (it, idx) {
        html += '<div class="palette-item' + (idx === 0 ? ' active' : '') + '" data-idx="' + idx + '">' +
          (it.icon ? '<span class="pi-ico">' + it.icon + '</span>' : '') +
          '<span>' + it.label + '</span></div>';
      });
      pList.innerHTML = html;
    }

    function updateActive() {
      var els = pList.querySelectorAll('.palette-item');
      els.forEach(function (el, i) { el.classList.toggle('active', i === activeIdx); });
      if (els[activeIdx]) els[activeIdx].scrollIntoView({ block: 'nearest' });
    }

    function activate(el) {
      var idx = +el.dataset.idx;
      var list = pList._items || [];
      var it = list[idx];
      if (!it) return;
      closePalette();
      if (it.action === 'lang') { var b = doc.getElementById('langToggle'); if (b) b.click(); }
      else if (it.action === 'theme') { if (themeBtn) themeBtn.click(); }
      else if (it.target) {
        var t = doc.querySelector(it.target);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function openPalette() { palette.classList.add('show'); renderPalette(''); setTimeout(function () { pInput.focus(); }, 50); }
    function closePalette() { palette.classList.remove('show'); }

    renderPalette('');
    if (pBtn) pBtn.addEventListener('click', openPalette);
    palette.addEventListener('click', function (e) { if (e.target === palette) closePalette(); });
    pInput.addEventListener('input', function () { renderPalette(pInput.value); });
    pList.addEventListener('click', function (e) {
      var item = e.target.closest('.palette-item');
      if (item) activate(item);
    });
    pInput.addEventListener('keydown', function (e) {
      var list = pList._items || [];
      if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(list.length - 1, activeIdx + 1); updateActive(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(0, activeIdx - 1); updateActive(); }
      else if (e.key === 'Enter') { e.preventDefault(); var el = pList.querySelector('.palette-item.active'); if (el) activate(el); }
      else if (e.key === 'Escape') { closePalette(); }
    });
    doc.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
    });
  }

  /* ---------- FAQ accordion ---------- */
  doc.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
