/* Adeptly service worker — self-healing, network-first.
   Always loads the latest code when online; never pins an old index.html.
   Bump CACHE to force every client to drop stale caches and update. */
const CACHE = "adeptly-v62";

self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });

self.addEventListener("activate", e => {
  e.waitUntil(
    // Delete EVERY cache (including this SW's own older ones) so no stale HTML/JS survives.
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Network-first for everything. Cache a copy only as an offline fallback.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        try { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); } catch (_) {}
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match("./index.html")))
  );
});
