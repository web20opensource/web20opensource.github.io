self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/project_phase1/',
        '/project_phase1/index.html',
        '/project_phase1/css/style.css',
        '/project_phase1/js/main.js',
        '/project_phase1/image-list.js',
        '/project_phase1/star-wars-logo.jpg',
        '/project_phase1/gallery/',
        '/project_phase1/gallery/bountyHunters.jpg',
        '/project_phase1/gallery/myLittleVader.jpg',
        '/project_phase1/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event){
	console.log(event.request);
});