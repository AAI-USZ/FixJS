function(user_uid, args, callback){
	Tag.find({where: user_uid}).success(function(tag) {		
		tag.updateAttributes(args).success(function(updatedTag) {			
			callback(null, updatedTag);
		});			
	}).error(function(error) {
		callback(error, null);
		console.log("Couldn't find tag " + error);
	});
}