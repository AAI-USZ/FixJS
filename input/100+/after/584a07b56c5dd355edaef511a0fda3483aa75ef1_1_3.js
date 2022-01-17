function(commentID, direction, appType, callback){
	var link = '/' + switchIndex(appType) + '/comments/' + commentID +'/_update';
	var data = {};

	if (parseInt(direction) === 0) {
		data = {
			'script':'ctx._source.upvote += upvote',
			'params':{
				'upvote':1
			}
		}
	}else {
		data = {
			'script':'ctx._source.downvote += downvote',
			'params':{
				'downvote':1
			}
		}
	}

	//increment the vote found at commentID
	db.post(link, data, function(err, req, data){
		if (data) {
			callback(null, data);
		}else {
			callback(err);
		}
	})
}