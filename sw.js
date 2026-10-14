/* Phoenix Contact Schnellchecks – Service Worker (Offline-Betrieb) */
const VERSION = '2.0';
const CACHE = 'pc-schnellcheck-' + VERSION;
const FONT_CACHE = 'pc-schnellcheck-fonts';
const PAGES = ['./index.html', './en.html', './fr.html', './es.html'];
const CORE = ['./', ...PAGES, './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('pc-schnellcheck-') && k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Schrift von Google Fonts: einmal laden, danach offline verfügbar
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // Einstellungen: immer zuerst aus dem Netz (neue Empfängeradresse sofort aktiv)
  if (url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./config.js', copy)); }
      return r;
    }).catch(() => caches.match('./config.js')));
    return;
  }
  // Seitenaufruf: erst Netz (für Updates), sonst Cache
  if (req.mode === 'navigate') {
    const page = /\/(en|fr|es)\.html$/.test(url.pathname) ? './' + url.pathname.split('/').pop() : './index.html';
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(page, copy)); }
      return r;
    }).catch(() => caches.match(page)));
    return;
  }
  // Übrige Dateien: Cache zuerst
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
