/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `https://udacity-mws-server.herokuapp.com/restaurants`;
  }

  /*fetch reviews*/
  static async fetchReviews(callback, restId){
    if (restId){
      const myRequest = new Request(`https://udacity-mws-server.herokuapp.com/reviews/?restaurant_id=${restId}`, {
        method: 'GET'
      });
      try{
        let res = await fetch(myRequest);
        let response = await res.json();
        console.log(response);
        callback(response);
      }catch(e){
          //store it in DB and fetch when internet is back.
          console.log(e);
          fillReviewsHTML();
      }

    }
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    $.ajax({
      url: "https://udacity-mws-server.herokuapp.com/restaurants",
      beforeSend: function( xhr ) {
        xhr.overrideMimeType( "text/plain; charset=utf8" );
      }
    })
      .done(function( data ) {
        if ( console && console.log ) {
          console.log( "Sample of data:", data.slice( 0, 100 ) );
          const restaurants = JSON.parse(data);
          if (dbPromise){
            dbPromise.then(function(db){
              var tx = db.transaction('keyval', 'readwrite');
              var keyValStore = tx.objectStore('keyval');
              for (let rest in restaurants){
                keyValStore.put(restaurants[rest],rest);
              }
              return tx.complete;
            }).then(function(db){
              console.log('added successfully!');
            });
          }
          callback(null, restaurants);
        }
      })
      .fail(function(){
          dbPromise.then(db => {
            return db.transaction('keyval').objectStore('keyval').getAll();
          }).then(allObjs => callback(null,allObjs));
      });
  }

  static async saveReviewInDB(review, removePending, callback){
    //DBHelper.saveReview((review)=>{
       const myRequest = new Request('https://udacity-mws-server.herokuapp.com/reviews/', {
        method: 'POST',
        body:review
      });

      await fetch(myRequest)
        .then(response => response.json())
        .then(reviewResponse => {
          console.log(reviewResponse);
          //reviewsResponsesStore 
          dbPromise.then(function(db){
            var tx = db.transaction('reviewsResponses', 'readwrite');
            var keyValStore = tx.objectStore('reviewsResponses');
            //store the review and 
            keyValStore.put(reviewResponse,reviewResponse.id)
            return tx.complete;
          }).then(function(db){
              console.log('review response added successfully to IndexDB to cache it');
              alert("Thanks for Your review")
              
              if (removePending)
                DBHelper.removeFromPending(JSON.parse(review).restaurant_id);
              else
                addReviewToExistingList(review);
          });
        }).catch(error => {
          //store it in DB and fetch when internet is back.
          
          console.log(error);
          dbPromise.then(function(db){
            
            var tx = db.transaction('reviewsPending', 'readwrite');
            var keyValStore = tx.objectStore('reviewsPending');
            //store the review and 
            keyValStore.put(review,JSON.parse(review).restaurant_id)
            return tx.complete;
          }).then(function(db){
              console.log('review added successfully to IndexDB to add it later when the network conditions are favorable.');
              alert("Thanks for your review. Will save it when we are back online.");
              callback(review);
          });
          return new Response(null,{ "status" : 200 , "statusText" : "OK" });
          //turn on a flag of pending to synchronize. 
        });
  }

  static pendingReview(callback){
    dbPromise.then(function(db){
        var tx = db.transaction('reviewsPending');
        var keyValStore = tx.objectStore('reviewsPending');
        return keyValStore.getAll();
      }).then(function(db){
        
        for(let rest of db) 
          DBHelper.saveReviewInDB(rest, true, callback);
        return;
      });
  }

  static removeFromPending(restId){
      return dbPromise.then(db => {
        const tx = db.transaction('reviewsPending', 'readwrite');
        tx.objectStore('reviewsPending').delete(restId);
        return tx.complete;
      }).then(function(db){
        
        console.log("removed from pendings");
      });
  }
    

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        //callback(error, null);
        // Get the json object from IndexDB API if available
        const restaurant = {};
        dbPromise.then(function(db){
          var tx = db.transaction('keyval');
          var keyValStore = tx.objectStore('keyval');
          return keyValStore.get('hello');
        }).then(function(db){
          
          callback(null, restaurant);
          console.log('The value of hello is: ', val);
        });
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`img/${restaurant.photograph | restaurant.id}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
      });
      marker.addTo(newMap);
    return marker;
  }
  /* static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  } */

  static returnFavorite(restaurant){
    const fav = document.createElement('span');
    if (restaurant.is_favorite === 'true'){
      fav.className = "favRest";
      fav.setAttribute('aria-label','This is one of my favorite restaurants');
    }
    else{
      fav.className = "notFavRest";
      fav.setAttribute('aria-label','Not one of my favorites');
    }

    fav.addEventListener('click',(e)=>{
      //TODO improve when offline ... Handle the server response and then update the UI. 
      if (DBHelper.network){
        if(e.target.className == 'favRest'){
          e.target.className = 'notFavRest';
          fav.setAttribute('aria-label','Not one of my favorites');
          fetch(new Request(
            `https://udacity-mws-server.herokuapp.com/restaurants/${e.target.getAttribute('data-src')}/?is_favorite=false`),
            {method: 'PUT'}
            );
        }else{
          e.target.className = 'favRest';
          fav.setAttribute('aria-label','This is one of my favorite restaurants');
          fetch(new Request(
            `https://udacity-mws-server.herokuapp.com/restaurants/${e.target.getAttribute('data-src')}/?is_favorite=true`),
            {method: 'PUT'}
            );
        }
      }else{
        alert("Try again when You are online!");
      }
    }); 

    fav.setAttribute('data-src', restaurant.id);
    return fav;
  }




}//class

