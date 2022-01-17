function(username,psw,callback){
	db.collection('user').find({username: username}).toArray(function(err,result){
		callback(err,result);
	})
}