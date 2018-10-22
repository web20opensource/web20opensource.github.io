
/*Clean-up & migration.*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
});


/*install event*/
self.addEventListener("install", function(event) {
  /*
  TODO: 
   # improve the cache to avoid storing long time old items not used.
   # do more to the app seems a real native app even when offline or lie fi
   # be able to update to a new version
   # respond 200 OK when offline
  */
  event.waitUntil(
    caches.open("restaurant_reviews_v2").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/restaurant.html",
        "/restaurant.html?id=1",
        "/restaurant.html?id=2",
        "/restaurant.html?id=3",
        "/restaurant.html?id=4",
        "/restaurant.html?id=5",
        "/restaurant.html?id=6",
        "/restaurant.html?id=7",
        "/restaurant.html?id=8",
        "/restaurant.html?id=9",
        "/restaurant.html?id=10",
        "/css/styles.css",
        "/css/mqueries.css",
        "https://necolas.github.io/normalize.css/8.0.0/normalize.css",
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg",
        "/img/6.jpg",
        "/img/7.jpg",
        "/img/8.jpg",
        "/img/9.jpg",
        "/img/10.jpg",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/sw.js",
        "/js/indexDBCache.js",
        "/js/idb.js",
        "/js/restaurant_info.js",
        "/js/handleOffline.js",
        "/offline.html"
      ])
    })
  )
});


/*fetch*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
        caches.match(event.request).then(function(response){
          if (response) return response;
          return fetch(event.request).then(function(networkResponse) {
              //cache the new responses
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
        })
        .catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
    )
});