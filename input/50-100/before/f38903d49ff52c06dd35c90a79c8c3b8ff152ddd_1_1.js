function(msg){
		var msg=msg||{method: 'postUrl', url: "test_url"};
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		chrome.extension
			  .sendMessage(msg, function(response) {
			  		deferred.resolve(response);
			});
		return promise;
	}