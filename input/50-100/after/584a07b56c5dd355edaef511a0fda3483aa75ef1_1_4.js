function(commentID, appType, callback){
	var link = '/' + switchIndex(appType) + '/comments/' + commentID +'/_update';
	var data = {
		'script':'ctx._source.isAnswered = status',
		'params':{
			'status':'true'
		}
	}

	//set isAnswered to true for the comment found at commentID
	db.post(link, data, function(err, req, data){
		if (data) {
			callback(null, data);
		}
		else {
			callback(err);
		}
	})
}