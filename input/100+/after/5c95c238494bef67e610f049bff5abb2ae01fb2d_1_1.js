function(questionID, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID;

	db.get(link, {}, function(err, req, data){

		if(err) throw err;

		if(data){
			callback(data);
		}else{
			callback(undefined);
		}
	});
}