function(appType, pageNum, callback){
	var data = {
			"query": {
				"term": {
					"isInstructor": true
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
		if(err)
			return callback(err);
		console.log(data.hits.total);

		addUsersToData(data, callback);
	});
}