function(tag, callback){
	tag.uuid = UUID.generate();
	var newTag = Tag.build(tag);
	newTag.save().error(function(error){
		callback(error, null);
	}).success(function(){
		callback(null, newTag);
	})
}