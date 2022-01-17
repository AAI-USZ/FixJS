function(tag, callback){
	var newTag = Tag.build(tag);
	newTag.save().error(function(error){
		callback(error, null);
	}).success(function(){
		callback(null, newTag);
	})
}