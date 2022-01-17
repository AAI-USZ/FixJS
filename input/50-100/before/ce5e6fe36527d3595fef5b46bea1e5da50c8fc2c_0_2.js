function(data, callback){
	var document;

	//if _id does not exist, ES will return an uid after inserting doc
	if(data._id){
		document = mapping.document(data._id);
	}
	else{
		document = mapping.document();
	}

	document.set(data._source, function(result){
		if(result){
			console.log('ES generated ID is: ' + result);
		}

		console.log('Document added');
	});
}