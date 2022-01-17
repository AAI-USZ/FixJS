function(eid,callback){
	db.collection('ext').update({_id: db.ObjectID.createFromHexString(eid)},{"$inc": {"like": 1}},function(err){
		callback(err);
	});
}