function(id,base64){
		var id=id||"voice_test_id";
		var cacheExist=localStorage.hasOwnProperty(id);
		var base64=base64||"base64";

		var deferred = $.Deferred(); 
		var promise = deferred.promise();
			if(cacheExist){
				//DoNothing....
				//这里有待解决，应该可以使用MD5或其他方式来防止重复提交
				deferred.resolve(id);
			}else{
				__setSina(id,base64).then(function(returnID){
					__saveToCache(id,base64).then(function(){
						deferred.resolve(returnID);
					},function(){
						deferred.reject();
					});
				},function(){
						deferred.reject();
				});
			}
		return promise;
	}