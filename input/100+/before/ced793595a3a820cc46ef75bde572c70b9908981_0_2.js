function(questionID, questionTitle, questionBody, appType, callback){
	var link = '/' + switchIndex(appType) + '/questions/' + questionID + '/_update';

	var data = {
		'script':'ctx._source.title = title; ctx._source.body = body',
		'params':{
			'title':questionTitle,
			'body':questionBody
		}
	}

	db.post(link, data, function(err, req, data){
		if(data){
			callback(data);
		}else{
			callback(undefined);
		}
	})
}