function(msg){
		var msg=msg||{method: 'heartBeat'};
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		chrome.extension
			  .sendMessage(msg, function(response) {
			  		deferred.resolve(response);
			});
		return promise;
	}