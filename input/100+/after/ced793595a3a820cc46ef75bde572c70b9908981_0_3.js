function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(1);

	document = mapping.document(UUID.generate());
	data.timestamp = new Date().toISOString();

	var date = new Date();

	data.timestamp = date.toISOString();

	document.set(data, function(err, req, data){
		if (data) {
			callback(data);
		}
		else {
			callback(undefined);
		}
		
	});
}