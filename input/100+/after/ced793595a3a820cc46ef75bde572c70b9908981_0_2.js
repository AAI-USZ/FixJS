function(questionID, questionTitle, questionBody, appType, callback){
	var link = '/' + switchIndex(appType) + '/questions/' + questionID + '/_update';

	var date = new Date().toISOString();

	var data = {
		'script':'ctx._source.title = title; ctx._source.body = body; ctx._source.timestamp = date;',
		'params':{
			'title':questionTitle,
			'body':questionBody,
			'date':date
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