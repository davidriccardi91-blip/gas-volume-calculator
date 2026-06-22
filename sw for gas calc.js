// Offline cache for the Gas Volume Calculator (everything is inline in index.html)
const CACHE = "gasvol-v1";
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "./index.html"])));
  self.skipWaiting();
});
self.addEventListener("activate", e => { self.clients.claim(); });
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request)
      .then(resp => { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return resp; })
      .catch(() => caches.match("./index.html")))
  );
});
