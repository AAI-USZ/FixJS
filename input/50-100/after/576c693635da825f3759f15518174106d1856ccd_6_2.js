function(target, args, callback){
	MediaFile.find({where: target}).success(function(mediaFile) {		
		mediaFile.updateAttributes(args).success(function(updatedMedia) {
			console.log("updated succesfully");
			callback(null, updatedMedia);
		});			
	}).error(function(error) {
		callback(error, null);
		console.log("Couldn't find mediaFile " + error);
	});


}