function(search, appType, callback){

	if(!search){
		console.log("empty");
		return;
	}

	var data = {
		query: {
			bool:{
				must:[{
					query_string: {
						default_field: '_all',
						query: search
					}
				}]
			}
		},
		from: 0,
		size: 20
	};

	switchIndex(appType);
	switchMapping(0);

	index.search(data, function(err, data){
		if(data && data.hits.total !== 0) {
			callback(data.hits);
		} else { 
			callback(undefined);
		}
	});
}