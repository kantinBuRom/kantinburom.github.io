(() => {
  const STORAGE_KEY = 'burom_last_notification_ts_v1';
  const INTERVAL_MS = 60 * 1000; // 1 menit untuk testing
  // const INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 jam produksi

  const TITLE = 'Selamat datang di Warung Bu Rom';
//   const BODY = 'Lihat menu terbaru dan promo hari ini!';
  const BODY = 'Lihat menu hari ini!';
  const URL = '/index.html';
  const ICON = '/image/IMG-11022025-buRom.webp';

  function hasPermission() {
    return ('Notification' in window) && Notification.permission === 'granted';
  }

  function canRequestPermission() {
    return ('Notification' in window) && Notification.permission === 'default';
  }

  function shouldNotify() {
    try {
      const last = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
      return (Date.now() - last) >= INTERVAL_MS;
    } catch (e) {
      return true;
    }
  }

  function recordNotify() {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (e) { /* ignore */ }
  }

  async function showNotificationViaSW() {
    try {
      if (!('serviceWorker' in navigator)) throw new Error('No service worker');
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(TITLE, {
        body: BODY,
        icon: ICON,
        badge: ICON,
        data: { url: URL },
        tag: 'burom-visit-' + Math.floor(Date.now() / 1000),
        renotify: false,
        vibrate: [100, 50, 100]
      });
      recordNotify();
      return true;
    } catch (err) {
      return false;
    }
  }

  function showNotificationFallback() {
    try {
      const options = {
        body: BODY,
        icon: ICON,
        badge: ICON,
        data: { url: URL },
        tag: 'burom-visit-' + Math.floor(Date.now() / 1000),
        renotify: false,
        vibrate: [100, 50, 100]
      };
      new Notification(TITLE, options);
      recordNotify();
      return true;
    } catch (e) {
      return false;
    }
  }

  async function tryNotify({ requestPermissionIfDefault = false } = {}) {
    if (!('Notification' in window)) return;
    if (!shouldNotify()) return;

    if (hasPermission()) {
      const ok = await showNotificationViaSW();
      if (!ok) showNotificationFallback();
      return;
    }

    if (canRequestPermission() && requestPermissionIfDefault) {
      try {
        const p = await Notification.requestPermission();
        if (p === 'granted') {
          const ok = await showNotificationViaSW();
          if (!ok) showNotificationFallback();
        }
      } catch (e) {
      }
    }
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      tryNotify({ requestPermissionIfDefault: false });
    }, 800);
  });

  window.buRomNotify = {
    tryNotify,
    setIntervalMs(ms) {
      if (typeof ms === 'number' && ms >= 0) {
        console.log('[buRomNotify] set interval to', ms);
        Object.defineProperty(window.buRomNotify, '_interval_ms', { value: ms, writable: true, configurable: true });
      }
    },
    reset() {
      localStorage.removeItem(STORAGE_KEY);
    },
    lastTimestamp() {
      return parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
    }
  };

})();