function(commentID, commentTitle, commentBody, appType, callback){	

	var link = '/' + switchIndex(appType) + '/comments/' + commentID +'/_update';

	var data = {
		'script':'ctx._source.title = title; ctx._source.body = body',
		'params':{
			'title':commentTitle
			'body':commentBody
		}
	}

	db.post(link, data, function(err, req, data){
		if (data) {
			callback(data);
		}
		else {
			callback(undefined);
		}
	})
}