
var dbPromise = idb.open('cache-responses', 1, function(upgradeDB){
	let keyValStore = upgradeDB.createObjectStore('keyval');
	keyValStore.put('world','hello');
});

dbPromise.then(function(db){
	var tx = db.transaction('keyval');
	var keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(function(db){
	console.log('The value of hello is: ', val);
});

dbPromise.then(function(db){
	var tx = db.transaction('keyval', 'readwrite');
	var keyValStore = tx.objectStore('keyval');
	keyValStore.put('bar','foo');
	return tx.complete;
}).then(function(){
	console.log('added successfully!');
});

