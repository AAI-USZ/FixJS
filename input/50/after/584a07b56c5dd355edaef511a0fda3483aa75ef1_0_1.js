function(err, result){
				if(result){
					retResources.push.apply(retResources, result);
					callback(null, retResources);
				}else{
					callback( err, null );
				}
			}