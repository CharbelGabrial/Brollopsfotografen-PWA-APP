const staticCacheName = "app-static";
const assets = [
  "/",
  "./index.html",
  "./capture.html",
  "./stream.html",
  "./assets/js/capture.js",
  "./assets/js/handler.js",
  "./assets/js/service_worker.js",
  "./assets/js/manifest.json",
  "./assets/js/showImage.js",
  "./assets/css/index.css",
  "./assets/img/close.png",
  "./assets/img/gallery.png",
  "./assets/img/logo.png",
  "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  "https://fonts.gstatic.com/s/notosans/v27/o-0MIpQlx3QUlC5A4PNr4Awhc_ak6EJgNLCm9A.woff2",
];

// install event
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets");
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
  // console.log("service worker installed");
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
  // console.log("service worker activated");
});

// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cachRes) => {
      return cachRes || fetch(evt.request);
    })
  );
  // console.log("fetch event", evt);
});
