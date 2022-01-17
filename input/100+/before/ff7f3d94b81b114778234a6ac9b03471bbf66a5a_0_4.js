function(id){
		var id=id||"voice_test_id";
		var cacheExist=localStorage.hasOwnProperty(id);
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
			if(cacheExist){
				__getFromCache(id).then(function(base64){
					deferred.resolve(base64);
				},function(){
					deferred.reject();
				});
			//=====================================
			}else{
				__getSina(id).then(function(base64){
					__saveToCache(id,base64).then(function(base64){
						deferred.resolve(base64);
					},function(){
						deferred.reject();
					});
				},function(){					
					deferred.reject();
				});
				
			}
		return promise;
	}