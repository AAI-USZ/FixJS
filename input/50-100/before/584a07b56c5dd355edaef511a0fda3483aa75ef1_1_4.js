function(commentID, appType, callback){
	var data;

	var link = '/' + switchIndex(appType) + '/comments/' + commentID +'/_update';

	data = {
		'script':'ctx._source.isAnswered = status',
		'params':{
			'status':'true'
		}
	}

	//set isAnswered to true for the comment found at commentID
	db.post(link, data, function(err, req, data){
		if (data) {
			callback(data);
		}
		else {
			callback(undefined);
		}
	})
}