self.addEventListener("install", (event) => 
{
  event.waituntil(caches.open("medifast-cache").then(cache) =>
                  {
    return cache.addAll([
      "/",
      "/index.html"
      ]);
  });

self.addEventListener("fetch", (event) =>
  {
    event.respondWith(
      caches.match(eventrequest).then((response) => 
        {
          return response || fetch(event.request);
        })
      );
  });
