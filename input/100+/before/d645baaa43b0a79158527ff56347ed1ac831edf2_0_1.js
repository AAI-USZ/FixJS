function(requestOptions)
	{
		
		var newOptions = self.extend(defaultOptions, requestOptions);
		
		
		var path = startPath;

		if (self.sessionId)
		{
			newOptions.path = newOptions.path.replace(':sessionId', self.sessionId);
		}
		
		if (newOptions.path && newOptions.path !== "")
		{
			path += newOptions.path;
		}
		
		newOptions.path = path;

		return newOptions;
	}