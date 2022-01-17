function(resources){
		var resourceUUIDs = null;
		if(resources){
			resourceUUIDs = [];
			for(index in resources){
				resourceUUIDs.push(resources[index].resource);
			}
		}
		if(resourceUUIDs){
			Resource.findAll({where:{uuid:resourceUUIDs}}).success(function(resources){
				callback(null, resources);
			}).error(function(error){
				callback(error, null);
			})
		}
		callback("No starred resources found", null);
	}