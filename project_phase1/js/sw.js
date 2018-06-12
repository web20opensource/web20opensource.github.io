self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/project_phase1/',
        '/project_phase1/index.html',
        '/project_phase1/css/styles.css',
        '/project_phase1/js/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event){
	console.log(event.request);
});