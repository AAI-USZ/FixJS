function( args, callback ){
	
	var async = require('async');	
	var resources = [];	

	CourseSection.sectionsInCourse(args, function(error, sectionUUIDs) {		
		if(sectionUUIDs){									
			async.forEach(sectionUUIDs, function(sectionUUID, callback) {												
				SectionMaterial.findAllMaterialsInSection({section:sectionUUID}, function(error, sectionMaterial) {
					async.forEach(sectionMaterial, function(resourceID, callback) {						
						var Resource = require('../models/resource.js');
						Resource.getResourceByUUID(resourceID.material, function(error, resource) {											
							resources.push(resource);	
							// once the result is retrieved pass it to the callback
							callback();																												
						})
					}, function(err){					    
					    // passed the result to outer loop
					    callback();
					});									
				})				
			}, function(err){
			    // pass the completed result to a callback			    
			    callback(null, resources);
			});										
		}

		//No sectionUUIDs were found
		else{
			callback(error, null);
		}
	})
}