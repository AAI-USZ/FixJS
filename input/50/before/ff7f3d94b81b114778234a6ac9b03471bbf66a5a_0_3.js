function(base64){
					__saveToCache(id,base64).then(function(base64){
						deferred.resolve(base64);
					},function(){
						deferred.reject();
					});
				}