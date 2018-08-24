dbPromise = idb.open('restreviews', 1, function(upgradeDb) {
    switch(upgradeDb.oldVersion) {
      case 0:
        var keyValStore = upgradeDb.createObjectStore('keyval');
        keyValStore.put("world", "hello");
      case 1:
        upgradeDb.createObjectStore('people', { keyPath: 'name' });
      case 2:
        var peopleStore = upgradeDb.transaction.objectStore('people');
        peopleStore.createIndex('animal', 'favoriteAnimal');
      case 3:
        peopleStore = upgradeDb.transaction.objectStore('people');
        peopleStore.createIndex('age', 'age');
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


