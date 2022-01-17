function(questionID, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	} else if (type > 1) {
		error.message = "not a valid type";
		callback(data, error);
	}

	link += questionID;

	db.get(link, {}, function(err, req, data){

		if(data){
			callback(data, undefined);
		}else{
			error.message = "object not found in database";
			error.err = err;
			callback(data, error);
		}
	});
}