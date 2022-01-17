function(ccc){
		_.assertFunction(ccc);
		schemaUrl = ccc(JSON.stringify(minnowClient.schema));
	}