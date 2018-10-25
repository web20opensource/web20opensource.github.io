/*TODO: Integrate a build process with grunt or gulp*/
/*TODO: use a module pattern to avoid global scope poluttion and anti-patterns*/

let restaurants,
  neighborhoods,
  cuisines
var newMap;
var markers = [];




/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap(); // added
  fetchNeighborhoods();
  fetchCuisines();
  //TODO: want to make header navigable.
  /*for (var i = 0, headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6'); i < headings.length; i++) {
   console.log(headings[i].textContent.trim() + " " +  headings[i].tagName, headings[i]);
   headings[i].tabIndex = "-1";
   headings[0].focus();
   headings[0].tabIndex=0;
  }*/

  if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function(reg) { console.log("Service Worker Registered", reg); })
           .catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
          });;
  }

  DBHelper.network = true;

});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  let indexOption = 1;
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    option.setAttribute("aria-setsize",self.neighborhoods.length);
    option.setAttribute("aria-posinset",indexOption++);
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize leaflet map, called from HTML.
 */
initMap = () => {
  self.newMap = L.map('map', {
        center: [40.722216, -73.987501],
        zoom: 12,
        scrollWheelZoom: false
      });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoibWFyaW9ydWl6IiwiYSI6ImNpc2RpY2RwZzAwNG0zb3J0Nm1sZmN3bW0ifQ.VVlXVKrCnJU7uuarUtIsuQ',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);

  updateRestaurants();
}
/* window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
} */

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => self.newMap.removeLayer(m));
  self.markers = [];
  self.restaurants = restaurants;
}


/*TODO: handle the tab event and keys correctly */
function handleKeys(e) {
  // Check for TAB key press
  const allLis = [...e.target.parentElement.childNodes];
  if (!allLis.length) return;
  let actualLiIndex = 0;
  for (let i=0; i< allLis.length ; i++){
   if (allLis[i]== e.target){
     actualLiIndex = i;
     break;
   }
  }
  
  const firstLi = allLis[0];
  const lastLi = allLis[allLis.length-1];
  if (e.keyCode === 9) {
    allLis[actualLiIndex].setAttribute("aria-selected","false");
    allLis[actualLiIndex].tabIndex = -1;
    //debugger;
    // SHIFT + TAB
    if (e.shiftKey) {
      if (e.target === firstLi) return;
      allLis[actualLiIndex-1].setAttribute("aria-selected","true");
      allLis[actualLiIndex-1].tabIndex = 0;
      allLis[actualLiIndex-1].focus();
      allLis[actualLiIndex-1].click();
    // TAB
    } else {
      if (document.activeElement === lastLi) return;
      allLis[actualLiIndex+1].setAttribute("aria-selected","true");
      allLis[actualLiIndex+1].tabIndex = 0;
      allLis[actualLiIndex+1].focus();
      allLis[actualLiIndex+1].click();
    }
  }
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  let indexRestaurant = 1;
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant, indexRestaurant++));
  });
  /*TODO: improve the accesability navigation */
  //ul.addEventListener('keydown', handleKeys);
  //ul.addEventListener('input', handleKeys);
  addMarkersToMap(restaurants);
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant, indexRestaurant) => {

  const li = document.createElement('li');
  const figure = document.createElement('figure');
  const figcaption = document.createElement('figcaption');

  figcaption.innerHTML =   restaurant.name;

  /* TODO: add srcset to support different image sizes and resolution device widths*/
  const FIimage = document.createElement('img');
  const image = document.createElement('img');
  image.className = 'restaurant-img b-lazy';
  image.src = `/${DBHelper.imageUrlForRestaurant(restaurant)}.webp`;
  image.setAttribute("alt","A picture from the restaurant " + restaurant.name);

  figure.append(image);
  figure.append(figcaption);

  li.append(figure);

  const name = document.createElement('h3');
  name.innerHTML = restaurant.name;
  name.setAttribute('class','restTitle')
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.setAttribute('class','restAddress')
  address.innerHTML = restaurant.address;
  li.append(address);



  const fav = document.createElement('span');
  if (restaurant.is_favorite === 'true')
    fav.className = "favRest";
  else
    fav.className = "notFavRest";

  fav.addEventListener('click',(e)=>{
    //TODO improve when offline ... Handle the server response and then update the UI. 
    if (DBHelper.network){
      if(e.target.className == 'favRest'){
        e.target.className = 'notFavRest';
        fetch(new Request(
          `http://localhost:1337/restaurants/${e.target.getAttribute('data-src')}/?is_favorite=false`),
          {method: 'PUT'}
          );
      }else{
        e.target.className = 'favRest';
        fetch(new Request(
          `http://localhost:1337/restaurants/${e.target.getAttribute('data-src')}/?is_favorite=true`),
          {method: 'PUT'}
          );
      }
    }else{
      alert("Try again when You are online!");
    }
  }); 

  fav.setAttribute('data-src', restaurant.id);

  li.append(fav);

  const more = document.createElement('a');
  more.innerHTML = restaurant.name + " details";
  more.href = DBHelper.urlForRestaurant(restaurant);
  more.setAttribute('role','button');

  li.append(more)

  /*TODO: improve the accesability navigation */
  /*if (indexRestaurant == 1){
   li.setAttribute("aria-selected", true);
   li.tabIndex = 0;
   li.focus();
  }else{
   li.setAttribute("aria-selected", false);
   li.tabIndex = -1;
  }*/

  li.tabIndex = 0;
  li.setAttribute("aria-setsize",self.restaurants.length);
  li.setAttribute("aria-posinset",indexRestaurant++);

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
    marker.on("click", onClick);
    function onClick() {
      window.location.href = marker.options.url;
    }
    self.markers.push(marker);
  });
}
/* addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
} */


//TODO - implement a notice to let user install the app - sw.js needs this code.
let btnAdd = self.document.getElementById('installAnUpdate');
btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});


jQuery("#cuisines-select").change(updateRestaurants);
jQuery("#neighborhoods-select").change(updateRestaurants);