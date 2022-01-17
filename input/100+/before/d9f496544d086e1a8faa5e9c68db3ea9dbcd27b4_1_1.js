function(appType, callback){
	var data = {
		"query": {
			"match_all": {}
		},
		"sort": [
			{
				"timestamp": {
					"order": "desc"
				}
			}
		],
		"from": 0,
		"size": 5
	};


	switchIndex(appType);
	switchMapping(0);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits.hits); //only need the hits.hits part
		}
		else{
			callback(undefined);
		}
	});

}