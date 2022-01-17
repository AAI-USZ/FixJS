function( error, sectionMaterials ){
		var resourcesInSection = new Array();
		var i = sectionMaterials.length - 1;
		for(; i >= 0; i-- ){
			resourcesInSection.push(sectionMaterials[i].material);
		}

		Resource.findAll({ where : { uuid : resourcesInSection }}).success(function( resources ){
			var retResources = new Array();
			var x = resources.length - 1;
			for( ; x >= 0; x-- ){
				retResources.push( resources[x] );
			}

			//search for resource uuids in ES, friggin circular dependency
			require('./queryES.js').getAllQuestionsByUuids(resourcesInSection, args.appType, function(err, result){
				if(result){
					retResources.push.apply(retResources, result);
					callback(null, retResources);
				}else{
					callback( err, null );
				}
			});

		}).error(function(error){
			callback( error, null );
		});
	}