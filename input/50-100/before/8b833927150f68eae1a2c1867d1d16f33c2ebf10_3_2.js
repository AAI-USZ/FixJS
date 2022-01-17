function(data, appType, callback){
	var document;

	switchIndex(appType);
	switchMapping(0);

	document = mapping.document(data.id);

	document.set(data, function(){
		callback();
	});
}