function(target_uuid, args, callback){
	MediaFile.find({where: target_uuid}).success(function(mediaFile) {		
		mediaFile.updateAttributes(args).success(function(updatedMedia) {
			console.log("updated succesfully");
			callback(null, updatedMedia);
		});			
	}).error(function(error) {
		callback(error, null);
		console.log("Couldn't find mediaFile " + error);
	});


}