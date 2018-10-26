
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

/*install app*/
let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  let btnAdd = self.document.getElementById('installAnUpdate');
  btnAdd.style.display = 'block';
});

self.addEventListener('appinstalled', (evt) => {
  console.log('app installed');
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
        "/img/1.webp",
        "/img/2.webp",
        "/img/3.webp",
        "/img/4.webp",
        "/img/5.webp",
        "/img/6.webp",
        "/img/7.webp",
        "/img/8.webp",
        "/img/9.webp",
        "/img/10.webp",
        "/js/dbhelper.js",
        "/js/main.js",
        "/sw.js",
        "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
        "https://code.jquery.com/jquery-3.3.1.min.js",
        "/js/indexDBCache.js",
        "/js/idb.js",
        "/js/restaurant_info.js",
        "/js/handleOffline.js",
        "/offline.html",
        "/css/images/layers-2x.png",
        "/css/images/layers.png",
        "/css/images/marker-icon-2x.png",
        "css/images/marker-icon.png",
        "css/images/marker-shadow.png"
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
              //To prevent errors and exceeding services worker Quota you need to check your responses if they are valid.
              if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') { 
                cache.put(event.request, networkResponse.clone());
              }

              return networkResponse;
            })
        })
        //.catch(function() {
          // If both fail, show a generic fallback:
        //  return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        //})
    )
});