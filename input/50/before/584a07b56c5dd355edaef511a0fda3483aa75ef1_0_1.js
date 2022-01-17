function(result){
				if(result){
					retResources.push.apply(retResources, result);
					callback(null, retResources);
				}else{
					callback( error, null );
				}
			}