dbPromise = idb.open('restreviews', 1, function(upgradeDb) {
    switch(upgradeDb.oldVersion) {
      case 0:
        var keyValStore = upgradeDb.createObjectStore('keyval');
    }
  });


/*
//read
dbPromise.then(function(db){
	var tx = db.transaction('keyval');
	var keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(function(db){
	console.log('The value of hello is: ', val);
});
*/
//write


