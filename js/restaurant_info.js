/*TODO: use a module pattern to avoid global scope poluttion and anti-patterns*/

let restaurant;
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
  initMap();
});

/**
 * Initialize leaflet map
 */
initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {      
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
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
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}  
 
/* window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
} */

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}
 
/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  address.tabIndex = 0;

  /* TODO: add srcset to support different image sizes and resolution device widths*/
  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = `/${DBHelper.imageUrlForRestaurant(restaurant)}.jpg`;
  image.setAttribute("alt", "A picture from the restaurant " + restaurant.name);

  document.getElementById("rest-fig-caption").innerHTML = "Restaurant: " + restaurant.name;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  cuisine.tabIndex = 0;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  DBHelper.fetchReviews(fillReviewsHTML, self.restaurant.id);

}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);
    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    row.tabIndex=0;

    hours.appendChild(row);
  }
}



let commentCreated = false;
const addRevBtn = document.getElementById('addNewReview');
addRevBtn.addEventListener('click',(e)=>{
  debugger;
  e.preventDefault();
  if (commentCreated){
    alert("You already created a comment. Thanks.")
    return;
  }
  else{
    DBHelper.saveReviewInDB(JSON.stringify({
        "restaurant_id": self.restaurant.id,
        "name": $("#addReviewForm input")[0].value,
        "rating": $("#addReviewForm input")[1].value,
        "comments": $("#addReviewForm textarea").val()
      }),
    false,
    addReviewToExistingList);
    commentCreated = true;
    return;
    // Initially tried to create dynamically but later 
    // get a static form. 
    // Probably is good practice to create it dynamically. 
    // will leave this code for future reference and guidance into improvements. 
    /*const form = document.createElement("form");
    const userName = document.createElement("input");
    userName.setAttribute('name','userName');
    userName.setAttribute('type','text');
    const comments = document.createElement("input");
    comments.setAttribute('name','comments');
    comments.setAttribute('type','text');
    const inputIdRest = document.createElement("input");
    inputIdRest.setAttribute('name','idRest');
    inputIdRest.setAttribute('type','hidden');
    inputIdRest.setAttribute('value',self.restaurant.id);
    const inputRate = document.createElement("input");
    inputRate.setAttribute('name','rate');
    inputRate.setAttribute('type','hidden');

    form.appendChild(userName);
    form.appendChild(comments);
    form.appendChild(inputIdRest);
    form.appendChild(inputRate);

    container.appendChild(form);
    commentCreated = true;*/
  }
});

/**
 * Create all reviews HTML and add them to the webpage.
 */
 //TODO: Improve wai-aria navigation



addReviewToExistingList = (review = {}) => {
    const ul = document.getElementById('reviews-list');
    review = JSON.parse(review);
    review.date = new Date().toDateString();
    ul.appendChild(createReviewHTML(review));
    return;
}

fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.tabIndex = 0;
  title.focus();
  title.innerHTML = "Reviews";
  title.className = "restaurant-review-header";
  container.appendChild(title);
  //container.appendChild(addRevBtn);
  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
  }else{
    const ul = document.getElementById('reviews-list');
    reviews.forEach(review => {
        ul.appendChild(createReviewHTML(review));
    });
    container.appendChild(ul);
  }

  for (var i = 0, headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6'); i < headings.length; i++) {
   //console.log(headings[i].textContent.trim() + " " +  headings[i].tagName, headings[i]);
   headings[i].tabIndex = 0;
  }

  headings[0].focus();

  const map = document.querySelectorAll("#map")[0];
  const mapContainer2 = document.querySelectorAll("#map-container")[0];
  mapContainer2.appendChild(map);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date || new Date(review.createdAt).toDateString();
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  li.tabIndex = 0;

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name + "'s details";
  li.setAttribute("aria-current","page");
  li.tabIndex = 0;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
