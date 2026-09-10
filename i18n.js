/* ======================================================
   JuicyPlayer i18n — Auto-detect language, manual toggle
   ====================================================== */
;(function () {
  'use strict';

  var DICT = {
    en: {
      pageTitle: 'JuicyPlayer — Elegant Desktop Music Player',
      navFeatures: 'Features',
      navShowcase: 'Preview',
      navDownload: 'Download',
      heroBadge: '🎵 Desktop Music Player',
      heroTitle1: 'The Ultimate',
      heroTitle2: 'Music Experience',
      heroDesc: 'JuicyPlayer is a clean, elegant desktop audio player with wireless remote control from your phone. Play, pause, skip, and adjust volume — all at your fingertips.',
      heroDownload: 'Free Download',
      heroLearn: 'Learn More',
      statVersion: 'Version',
      statFree: 'Free',
      statConn: 'Remote',
      featureTag: 'Core Features',
      featureTitle: 'Why JuicyPlayer',
      featureDesc: 'Simple, efficient, and elegant desktop music experience',
      f1Title: '🎵 Playback Control',
      f1Desc: 'Play, pause, skip tracks, seek through the progress bar — with lock-screen and notification bar support. Pair with Juicy Remoter for phone control.',
      f2Title: '🔊 Volume & Equalizer',
      f2Desc: 'Adjust system and player volume in real-time, switch equalizer presets to find your perfect sound.',
      f3Title: '📋 Playlist',
      f3Desc: 'Browse the full playlist, search songs, view album art and track info — switch tracks anytime.',
      showcaseTag: 'Preview',
      showcaseTitle: 'Elegant UI Design',
      sc1Title: 'Juicy Remoter',
      sc1Desc: 'Material Design, dark theme, gesture controls',
      sc2Title: 'JuicyPlayer',
      sc2Desc: 'Minimal player UI, music-focused, low resource usage',
      sc3Title: 'Seamless Connection',
      sc3Desc: 'Auto-discover on the same LAN — no manual IP needed',
      appTag: 'Download Player',
      appTitle: 'JuicyPlayer — Your Music Player',
      appDesc: 'A clean, focused desktop audio player supporting multiple formats',
      appWinTitle: 'JuicyPlayer for Windows',
      appWinDesc: 'Install from Microsoft Store — auto updates, secure and reliable.',
      appWinReq: 'Windows 10/11 · 64-bit',
      appWinBtn: 'Get from Microsoft Store',
      appMacTitle: 'JuicyPlayer for macOS',
      appMacDesc: 'macOS version is in development, stay tuned.',
      appMacSoon: 'Coming Soon',
      appMacBtn: 'Coming Soon',
      dlTag: 'Mobile Remote',
      dlTitle: 'Juicy Remoter — Remote Control',
      dlDesc: 'Control JuicyPlayer from your phone, instant response over LAN',
      dlAndTitle: 'Juicy Remoter · Android',
      dlAndNote: 'Android 7.0+',
      dlAndBtn: 'Download APK',
      dlAndSize: '~57 MB · .apk',
      dlWinTitle: 'Juicy Remoter · Windows',
      dlWinNote: 'Windows 10 / 11 · 64-bit',
      dlWinBtn: 'Download Installer',
      dlWinSize: '~14 MB · .exe',
      historySummary: '📜 Version History',
      historyEmpty: 'No previous versions yet',
      howtoTag: 'Getting Started',
      howtoTitle: '3 Steps to Start',
      step1Title: 'Install JuicyPlayer',
      step1Desc: 'Download and install JuicyPlayer desktop player from Microsoft Store.',
      step2Title: 'Install Juicy Remoter',
      step2Desc: 'Download and install Juicy Remoter APK on your Android phone, grant LAN permission.',
      step3Title: 'Connect & Enjoy',
      step3Desc: 'Make sure your PC and phone are on the same Wi-Fi. Open the remote — it auto-connects to the player.',
      footerRights: 'All rights reserved.',
      vizTag: 'Sound Visualization',
      vizTitle: 'See every note',
      vizDesc: 'Real-time spectrum analysis built in. Hit play and watch the waveform dance to the sound — fully synthesized in your browser, no download, no network.',
      vizNote: 'Synthesized demo · headphones recommended',
      faqTag: 'FAQ',
      faqTitle: 'Questions, answered',
      faqQ1: 'My phone can\'t connect to the PC?',
      faqA1: 'Make sure both are on the same Wi-Fi and Juicy Player is running on the PC. The remote auto-discovers on the LAN; if it still fails, your firewall is likely blocking it — allow Juicy Player through private networks.',
      faqQ2: 'Which formats are supported?',
      faqA2: 'All common formats: MP3, FLAC, WAV, OGG, AAC, M4A, OPUS, AIFF, APE. Lossless formats (FLAC / APE / WAV) play bit-perfect, no transcoding.',
      faqQ3: 'Is Juicy Player free?',
      faqA3: 'Completely free — no ads, no in-app purchases. We don\'t track what you listen to either; your history stays on your own PC.',
      faqQ4: 'Does the remote need an account?',
      faqA4: 'No. It\'s pure LAN peer-to-peer — your data never leaves your router, so there\'s nothing to log into.',
      faqQ5: 'When is the macOS version coming?',
      faqA5: 'In development. Watch / Star the GitHub repo and you\'ll be notified the moment it ships.',
      paletteEmpty: 'No results'
    }
  };

  /* ---- Detect language ---- */
  function detectLang() {
    var saved = localStorage.getItem('jp-lang');
    if (saved && DICT[saved]) return saved;
    return 'en';
  }

  /* ---- Apply translations ---- */
  function applyLang(lang) {
    var dict = DICT[lang];
    if (!dict) return;
    document.documentElement.lang = 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.title = dict.pageTitle || document.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && dict.heroDesc) meta.setAttribute('content', dict.heroDesc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var twTitle = document.querySelector('meta[name="twitter:title"]');
    var twDesc = document.querySelector('meta[name="twitter:description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogTitle) ogTitle.setAttribute('content', dict.pageTitle || ogTitle.getAttribute('content'));
    if (ogDesc && dict.heroDesc) ogDesc.setAttribute('content', dict.heroDesc);
    if (twTitle) twTitle.setAttribute('content', dict.pageTitle || twTitle.getAttribute('content'));
    if (twDesc && dict.heroDesc) twDesc.setAttribute('content', dict.heroDesc);
    if (ogLocale) ogLocale.setAttribute('content', 'en_US');

    localStorage.setItem('jp-lang', lang);

    // Update typewriter effect
    if (window.updateTypewriter) {
      window.updateTypewriter(lang);
    }
  }

  /* ---- Init ---- */
  var currentLang = detectLang();

  /* ---- Toggle ---- */
  document.addEventListener('DOMContentLoaded', function () {
    applyLang(currentLang);

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        currentLang = 'en';
        applyLang(currentLang);
      });
    }

    /* ---- App Download Tab Switch + OS Detection ---- */
    var appTabs = document.querySelectorAll('.app-tab');
    var appPanels = document.querySelectorAll('.app-panel');
    if (appTabs.length && appPanels.length) {
      var ua = navigator.userAgent.toLowerCase();
      var isMac = /macintosh|mac os x|iphone|ipad/.test(ua) && !/windows/.test(ua);
      var defaultPlatform = isMac ? 'mac' : 'win';

      function switchPlatform(platform) {
        appTabs.forEach(function (t) {
          t.classList.toggle('active', t.getAttribute('data-platform') === platform);
          t.setAttribute('aria-selected', t.getAttribute('data-platform') === platform ? 'true' : 'false');
        });
        appPanels.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-platform') === platform);
        });
      }

      switchPlatform(defaultPlatform);

      appTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          switchPlatform(this.getAttribute('data-platform'));
        });
      });
    }

    /* ---- Scroll reveal ---- */
    var els = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('revealed'); });
    }
  });
})();
