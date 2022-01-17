function(userOptions){
		console.log("twitter init");
		options = $.extend(options, userOptions || {});
		self.twitterPromise = getTwitterPromise();
	}