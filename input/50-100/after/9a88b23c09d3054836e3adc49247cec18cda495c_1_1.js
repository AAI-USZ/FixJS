function(type,callback){
	db.collection('ext').find({type: type}).sort({like: -1}).toArray(function(err,result){
		callback(err,result);
	});
}