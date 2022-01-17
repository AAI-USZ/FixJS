function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(0);

	document = mapping.document(UUID.generate());
	data.timestamp = new Date().toISOString();

	document.set(data, function(err, req, data){
		if(data){
			callback(data);
		}else{
			callback(undefined);
		}
	});
}