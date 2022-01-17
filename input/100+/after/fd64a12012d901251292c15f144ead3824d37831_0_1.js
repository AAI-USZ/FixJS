function(appType, pageNum, callback){
	var data = {
		query: {
			match_all:{}
		},
		from: paging(pageNum),
		size: sizeOfResult
	};

	switchIndex(appType);
	switchMapping(0);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			var result = {};
			result.hits = [];
			result.total = data.hits.total;

			async.forEach(data.hits.hits, function(questionObj, callback){

				user.selectUser({"uuid":questionObj._source.user}, function(error, user){
					if(user){
						questionObj.user = user;
					}
					else{
						questionObj.user = "User not found: " + questionObj._source.user;
					}

					result.hits.push(questionObj);
					callback();
				});
			}, function(err){

				callback(result);
			});
		}
		else{
			callback(undefined);
		}
	});
}