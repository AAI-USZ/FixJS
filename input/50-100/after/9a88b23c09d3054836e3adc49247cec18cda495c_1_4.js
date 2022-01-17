function(id,callback){
	db.collection('ext').update({_id: db.ObjectID.createFromHexString(id)}, {"$set": {"pass": 1}},function(err){
		callback(err);
	})
}