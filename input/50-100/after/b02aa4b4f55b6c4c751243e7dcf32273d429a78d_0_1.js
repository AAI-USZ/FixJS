function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(1);

	var commentID = UUID.generate();

	console.log("From QueryEs addComment");
	console.log("Comment uuid = " + commentID);

	document = mapping.document(commentID);	

	document.set(data, function(){
		callback();
	});
}