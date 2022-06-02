// install event
self.addEventListener("install", (evt) => {
  console.log("service worker installed", evt);
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker activated", evt);
});

// fetch event
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});
