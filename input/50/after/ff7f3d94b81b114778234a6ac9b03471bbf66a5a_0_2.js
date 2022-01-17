function(returnID){
					__saveToCache(id,base64).then(function(){
						deferred.resolve(returnID);
					},function(){
						deferred.reject();
					});
				}