function(){
					__saveToCache(id,base64).then(function(){
						deferred.resolve();
					},function(){
						deferred.reject();
					});
				}