function(code, message)
	{
		mode.error.throw(
		{
			code: code, message: 'Mongo: ' + message
		});
	}