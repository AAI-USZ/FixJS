function(appType, pageNum, callback){
	var data = {
			"query": {
				"term": {
					"isInstructor": "true"
				}
			},
			"sort": [
				{
					"timestamp": {
						"order": "desc"
					}
				}
			],
		from: paging(pageNum),
		size: sizeOfResult
	};

	switchIndex(appType);
	switchMapping(0);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(null, data.hits.hits); //only need the hits.hits part
		}
		else{
			callback(err);
		}
	});
}