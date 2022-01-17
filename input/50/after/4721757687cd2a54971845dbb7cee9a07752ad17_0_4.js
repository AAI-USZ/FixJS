function(error, result)
		{
			if(error)
			{
				that.error(error);
			}
			callback(result);
		}