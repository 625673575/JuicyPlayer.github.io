/* ======================================================
   JuicyPlayer i18n — Auto-detect language, manual toggle
   ====================================================== */
;(function () {
  'use strict';

  const DICT = {
    zh: {
      pageTitle: 'JuicyPlayer 遥控器 — 下载',
      navFeatures: '功能',
      navShowcase: '预览',
      navDownload: '下载',
      heroBadge: '🎵 音频播放器遥控器',
      heroTitle1: '用手机',
      heroTitle2: '遥控你的音乐',
      heroDesc: 'JuicyPlayer 将你的 Android 手机变成桌面播放器的无线遥控器。播放、暂停、切歌、调节音量——一切尽在指尖。',
      heroDownload: '免费下载',
      heroLearn: '了解更多',
      heroPlaceholder: '应用截图（替换为实际图片）',
      statVersion: '版本',
      statFree: '免费',
      statConn: '局域网',
      featureTag: '核心功能',
      featureTitle: '为什么选择 JuicyPlayer',
      featureDesc: '简洁、高效、优雅的音乐控制体验',
      f1Title: '🎵 远程播放控制',
      f1Desc: '播放、暂停、上下曲、拖动进度条——手机就是你的遥控器。支持锁屏控制和通知栏快捷操作。',
      f2Title: '🔊 音量 & 均衡器',
      f2Desc: '实时调节系统音量和播放器音量，支持均衡器预设切换，找到最适合你的听感。',
      f3Title: '📋 播放列表浏览',
      f3Desc: '在手机上查看完整播放列表、搜索歌曲、查看专辑封面和歌曲信息，随时切换想听的曲目。',
      imgPlayCtrl: '播放控制截图',
      imgVolCtrl: '音量与均衡截图',
      imgPlaylist: '播放列表截图',
      showcaseTag: '产品预览',
      showcaseTitle: '精致的界面设计',
      sc1Title: 'Android 遥控器',
      sc1Desc: 'Material Design 风格，暗色主题，手势操作',
      sc2Title: 'Windows 播放器',
      sc2Desc: '极简播放器界面，专注音乐，低资源占用',
      sc3Title: '无缝连接',
      sc3Desc: '同一局域网自动发现，无需手动输入 IP',
      imgAndroidUI: 'Android 遥控器界面',
      imgDesktopUI: 'Windows 播放器界面',
      imgConnection: '连接示意',
      appTag: '下载播放器',
      appTitle: '在任意设备上享受音乐',
      appWinTitle: 'JuicyPlayer for Windows',
      appWinDesc: '通过 Microsoft Store 安装，自动更新，安全可靠。',
      appWinReq: 'Windows 10/11 · 64-bit',
      appWinBtn: '在 Microsoft Store 获取',
      appMacTitle: 'JuicyPlayer for macOS',
      appMacDesc: 'macOS 版本正在开发中，敬请期待。',
      appMacSoon: 'Coming Soon',
      appMacBtn: '敬请期待',
      dlTag: '立即下载',
      dlTitle: '选择你的平台',
      dlDesc: 'Windows 桌面播放器 + Android 遥控器，搭配使用效果最佳',
      dlAppTitle: 'JuicyPlayer 播放器',
      dlStoreNote: 'Microsoft Store 安装',
      dlStoreBtn: '在 Microsoft Store 获取',
      dlMacSoon: 'Coming Soon',
      dlMacNote: 'macOS 版本开发中',
      dlMacBtn: '敬请期待',
      dlRemoteTitle: '遥控器',
      dlWinNote: 'Windows 10 / 11 · 64-bit',
      dlWinBtn: '下载安装包',
      dlWinSize: '约 14 MB · .exe',
      dlAndNote: 'Android 7.0+ · APK',
      dlAndBtn: '下载 APK',
      dlAndSize: '约 57 MB · .apk',
      historySummary: '📜 历史版本',
      historyEmpty: '暂无历史版本',
      howtoTag: '使用指南',
      howtoTitle: '三步开始使用',
      step1Title: '安装桌面播放器',
      step1Desc: '下载 Windows 安装包，双击运行即可完成安装。',
      step2Title: '安装手机遥控器',
      step2Desc: '在 Android 手机上下载并安装 APK，授予局域网权限。',
      step3Title: '连接 & 享受',
      step3Desc: '确保电脑和手机在同一 Wi-Fi 下，打开遥控器自动连接，开始享受无线操控。',
      footerRights: '保留所有权利。'
    },
    en: {
      pageTitle: 'JuicyPlayer Remote — Download',
      navFeatures: 'Features',
      navShowcase: 'Preview',
      navDownload: 'Download',
      heroBadge: '🎵 Audio Player Remote',
      heroTitle1: 'Control Your Music',
      heroTitle2: 'From Your Phone',
      heroDesc: 'JuicyPlayer turns your Android phone into a wireless remote for your desktop audio player. Play, pause, skip tracks, and adjust volume — all from the palm of your hand.',
      heroDownload: 'Free Download',
      heroLearn: 'Learn More',
      heroPlaceholder: 'App Screenshot (replace with actual image)',
      statVersion: 'Version',
      statFree: 'Free',
      statConn: 'LAN',
      featureTag: 'Core Features',
      featureTitle: 'Why JuicyPlayer',
      featureDesc: 'Simple, efficient, and elegant music control',
      f1Title: '🎵 Remote Playback Control',
      f1Desc: 'Play, pause, skip tracks, seek through progress bar — your phone is the remote. Supports lock-screen controls and notification bar shortcuts.',
      f2Title: '🔊 Volume & Equalizer',
      f2Desc: 'Adjust system and player volume in real-time, switch equalizer presets to find your perfect sound.',
      f3Title: '📋 Playlist Browsing',
      f3Desc: 'View the full playlist on your phone, search songs, browse album art and track info, and switch tracks anytime.',
      imgPlayCtrl: 'Playback Control',
      imgVolCtrl: 'Volume & Equalizer',
      imgPlaylist: 'Playlist View',
      showcaseTag: 'Preview',
      showcaseTitle: 'Elegant UI Design',
      sc1Title: 'Android Remote',
      sc1Desc: 'Material Design, dark theme, gesture controls',
      sc2Title: 'Windows Player',
      sc2Desc: 'Minimal player UI, music-focused, low resource usage',
      sc3Title: 'Seamless Connection',
      sc3Desc: 'Auto-discover on the same LAN — no manual IP needed',
      imgAndroidUI: 'Android Remote UI',
      imgDesktopUI: 'Windows Player UI',
      imgConnection: 'Connection Diagram',
      appTag: 'Download Player',
      appTitle: 'Enjoy Music on Any Device',
      appWinTitle: 'JuicyPlayer for Windows',
      appWinDesc: 'Install from Microsoft Store — auto updates, secure and reliable.',
      appWinReq: 'Windows 10/11 · 64-bit',
      appWinBtn: 'Get from Microsoft Store',
      appMacTitle: 'JuicyPlayer for macOS',
      appMacDesc: 'macOS version is in development, stay tuned.',
      appMacSoon: 'Coming Soon',
      appMacBtn: 'Coming Soon',
      dlTag: 'Download Now',
      dlTitle: 'Choose Your Platform',
      dlDesc: 'Windows desktop player + Android remote — best used together',
      dlAppTitle: 'JuicyPlayer Player',
      dlStoreNote: 'Install from Microsoft Store',
      dlStoreBtn: 'Get from Microsoft Store',
      dlMacSoon: 'Coming Soon',
      dlMacNote: 'macOS version in development',
      dlMacBtn: 'Coming Soon',
      dlRemoteTitle: 'Remote',
      dlWinNote: 'Windows 10 / 11 · 64-bit',
      dlWinBtn: 'Download Installer',
      dlWinSize: '~14 MB · .exe',
      dlAndNote: 'Android 7.0+ · APK',
      dlAndBtn: 'Download APK',
      dlAndSize: '~57 MB · .apk',
      historySummary: '📜 Version History',
      historyEmpty: 'No previous versions yet',
      howtoTag: 'Getting Started',
      howtoTitle: '3 Steps to Start',
      step1Title: 'Install Desktop Player',
      step1Desc: 'Download the Windows installer and run it — done in seconds.',
      step2Title: 'Install Mobile Remote',
      step2Desc: 'Download and install the APK on your Android phone, grant LAN permission.',
      step3Title: 'Connect & Enjoy',
      step3Desc: 'Make sure your PC and phone are on the same Wi-Fi. Open the remote — it connects automatically.',
      footerRights: 'All rights reserved.'
    }
  };

  /* ---- Detect language ---- */
  function detectLang() {
    var saved = localStorage.getItem('jp-lang');
    if (saved && DICT[saved]) return saved;
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    return 'en';
  }

  /* ---- Apply translations ---- */
  function applyLang(lang) {
    var dict = DICT[lang];
    if (!dict) return;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    // Update page title
    document.title = dict.pageTitle || document.title;
    // Update meta description
    var meta = document.querySelector('meta[name="description"]');
    if (meta && dict.heroDesc) meta.setAttribute('content', dict.heroDesc);
    // Update toggle button label
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';
    // Store
    localStorage.setItem('jp-lang', lang);
  }

  /* ---- Init ---- */
  var currentLang = detectLang();
  applyLang(currentLang);

  /* ---- Toggle ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        applyLang(currentLang);
      });
    }

    /* ---- App Download Tab Switch + OS Detection ---- */
    var appTabs = document.querySelectorAll('.app-tab');
    var appPanels = document.querySelectorAll('.app-panel');
    if (appTabs.length && appPanels.length) {
      // Auto-detect OS
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

      // Set default based on OS
      switchPlatform(defaultPlatform);

      // Click handlers
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
      // fallback: show all
      els.forEach(function (el) { el.classList.add('revealed'); });
    }
  });
})();
