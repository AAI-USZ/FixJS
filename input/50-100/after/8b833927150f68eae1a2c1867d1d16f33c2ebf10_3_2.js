function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(0);

	var user_uuid = UUID.generate();

	console.log("from QueryEs addQuestion");
	console.log("User uuid = " + user_uuid);

	document = mapping.document(user_uuid);

	document.set(data, function(err, req, data){
		if(data){
			callback(data);
		}else{
			callback(undefined);
		}
	});
}