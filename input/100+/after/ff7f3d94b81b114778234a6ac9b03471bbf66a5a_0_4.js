function(id){
		var id=id||"voice_test_id";
		var cacheExist=localStorage.hasOwnProperty(id);
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		console.log("cacheExist?"+cacheExist);
			if(cacheExist){
				__getFromCache(id).then(function(base64){
					deferred.resolve(base64);
				},function(){
					deferred.reject();
				});
			//=====================================
			}else{
				__getSina(id).then(function(base64File1){
					//console.log("__getSina(id)_id?"+id);
					//console.log("__getSina(id)_base64File1?"+base64File1);
					__saveToCache(id,base64File1).then(function(){
						//console.log("__saveToCache(id)id?"+id);
						deferred.resolve(base64File1);
					},function(){
						deferred.reject();
					});
				},function(){					
					deferred.reject();
				});
				
			}
		return promise;
	}