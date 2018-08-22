

//read
dbPromise.then(function(db){
	var tx = db.transaction('keyval');
	var keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(function(db){
	console.log('The value of hello is: ', val);
});

//write


