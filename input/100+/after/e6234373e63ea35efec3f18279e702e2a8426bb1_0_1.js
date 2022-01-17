function(search, appType, callback){

	if(!search){
		callback(undefined);
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

	mapping.search(data, function(err, data){
		if(data && data.hits.total !== 0) {
			callback(data.hits);
		} else { 
			callback(undefined);
		}
	});
}