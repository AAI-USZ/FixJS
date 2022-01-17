function(callback){
	db.collection('ext').find().sort({like: -1}).toArray(function(err,result){
		callback(err,result);
	});
}