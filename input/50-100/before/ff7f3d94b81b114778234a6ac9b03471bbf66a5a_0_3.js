function(id,base64){
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		var id=id||"voice_test_id";
		var base64=base64||"base64";

			localStorage[id]=base64;
			deferred.resolve(base64);
			//deferred.reject();

		return promise;
	}