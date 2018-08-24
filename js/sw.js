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
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1206/1539.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1206/1540.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1205/1539.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1207/1539.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1205/1540.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/12/1207/1540.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19304/24632.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19305/24632.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19304/24633.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19305/24633.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19304/24631.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19305/24631.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19304/24634.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19305/24634.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19299/24631.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19299/24632.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19298/24632.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19298/24631.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19300/24631.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19300/24632.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19299/24630.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19299/24633.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19300/24630.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19298/24633.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19298/24630.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://api.tiles.mapbox.com/v4/mapbox.streets/16/19300/24633.jpg70?access_token=pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ",
      		"https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
      		"https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png",
      		"/restaurant.html?id=1",
      		"/restaurant.html?id=2",
      		"/restaurant.html?id=3",
      		"/restaurant.html?id=4",
      		"/restaurant.html?id=5",
      		"/restaurant.html?id=6",
      		"/restaurant.html?id=7",
      		"/restaurant.html?id=8",
      		"/restaurant.html?id=9",
      		"/restaurant.html?id=10"
      ]);
    })
  )
});

self.addEventListener("fetch", function(event){
	event.respondWith(
        cache.matches(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});