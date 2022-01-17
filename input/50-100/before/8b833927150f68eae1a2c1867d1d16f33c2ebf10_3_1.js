function(appType, callback){
	var data = {
		query: {
			match_all:{}
		}
	};

	switchIndex(appType);
	switchMapping(0);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			callback(undefined);
		}
	});
}