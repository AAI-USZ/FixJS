function (id,base64) {
		var id=id || 'dbVoice_test';
		var base64File=undefined;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		//如果有缓存则首先更新缓存
		if(localStorage.hasOwnProperty(id)){
			localStorage[id]=base64;
			deferred.resolve(true);
		}
		//然后需要构造一个XHR2对象并上传
		return promise;
	}