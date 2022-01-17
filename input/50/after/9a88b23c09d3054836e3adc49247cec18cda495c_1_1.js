function(callback){
	db.collection('ext').find().sort({pass: 1}).toArray(function(err,result){
		callback(err,result);
	})
}