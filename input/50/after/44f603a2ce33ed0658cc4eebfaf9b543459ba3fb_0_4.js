function(error, item)
		{
			if(error)
			{
				that.error(500, error);
			}
			callback(item ? new that(item) : null);
		}