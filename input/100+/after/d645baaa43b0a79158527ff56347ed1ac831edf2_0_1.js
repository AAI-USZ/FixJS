function(requestOptions)
	{
		
		var newOptions = self.extend(defaultOptions, requestOptions);
		
		
		var path = startPath;

		if(/:sessionId/.test(newOptions.path)){
			if (self.sessionId){
				newOptions.path = newOptions.path.replace(':sessionId', self.sessionId);
			}else{
				self.log(colors.red + "ERROR, no sessionId to pass" + colors.reset);
				return new Error('No SessionId to pass in request');
			}
		}
		
		if (newOptions.path && newOptions.path !== "")
		{
			path += newOptions.path;
		}
		
		newOptions.path = path;

		return newOptions;
	}