function(data, callback){
	var document;

	document = mapping.document();

	document.set(data, function(result){
		if(result){
			callback(result);
		}

		console.log('Document added');
	});
}