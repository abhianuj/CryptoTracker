/*adding cache*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v2').then(function(cache) {
      return cache.addAll(
        [
          'script.js',
          'style.css',
          'index.html'
        ]
      );
    })
  );
});

/*refreshing*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
            console.log("refreshing");
          return response;
        });
      });
    })
  );
});

/* cache -> network */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        console.log("cache->network");
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
          console.log("fetched");
        return response;
      });
    })
  );
});


