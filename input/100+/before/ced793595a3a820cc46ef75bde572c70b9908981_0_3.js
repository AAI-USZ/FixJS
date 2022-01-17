function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(1);

	var commentID = UUID.generate();

	console.log("From QueryEs addComment");
	console.log("Comment uuid = " + commentID);

	document = mapping.document(commentID);	

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