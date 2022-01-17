function(userOptions){
		options = $.extend(options, userOptions || {});
		twitterPromise = getTwitterPromise();
	}