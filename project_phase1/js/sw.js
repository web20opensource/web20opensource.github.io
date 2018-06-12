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
        "/project_phase1/",
        "/project_phase1/index.html",
        "/project_phase1/css/styles.css",
        "/project_phase1/css/mqueries.css",
        "https://necolas.github.io/normalize.css/8.0.0/normalize.css",
        "/project_phase1/img/1.jpg",
        "/project_phase1/img/2.jpg",
        "/project_phase1/img/3.jpg",
        "/project_phase1/img/4.jpg",
        "/project_phase1/img/5.jpg",
        "/project_phase1/img/6.jpg",
        "/project_phase1/img/7.jpg",
        "/project_phase1/img/8.jpg",
        "/project_phase1/img/9.jpg",
        "/project_phase1/img/10.jpg",
      		"/project_phase1/js/dbhelper.js",
      		"/project_phase1/js/main.js",
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
      		"/project_phase1/data/restaurants.json",
      		"/project_phase1/img/1.jpg",
      		"/project_phase1/img/2.jpg",
      		"/project_phase1/img/3.jpg",
      		"/project_phase1/img/4.jpg",
      		"/project_phase1/img/5.jpg",
      		"/project_phase1/img/6.jpg",
      		"/project_phase1/img/7.jpg",
      		"/project_phase1/img/8.jpg",
      		"/project_phase1/img/9.jpg",
      		"/project_phase1/img/10.jpg",
      		"/project_phase1/js/sw.js",
      		"https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
      		"https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",
      		"https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=1",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=2",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=3",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=4",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=5",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=6",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=7",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=8",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=9",
      		"https://web20opensource.github.io/project_phase1/restaurant.html?id=10"
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