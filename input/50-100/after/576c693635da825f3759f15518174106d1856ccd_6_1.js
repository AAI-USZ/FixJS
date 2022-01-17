function(media, callback){
	media.target = UUID.generate();
	var newMediaFile = MediaFile.build(media);
	newMediaFile.save().error(function(error){		
		callback(error, null);
	}).success(function(){		
		callback(null, newMediaFile);
	})
}