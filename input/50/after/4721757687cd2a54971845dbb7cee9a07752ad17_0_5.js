function(message)
	{
		mode.error.throw(
		{
			code: 500, message: 'Mongo: ' + message
		});
	}