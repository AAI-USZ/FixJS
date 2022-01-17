function(error, item)
		{
			if(error)
			{
				that.error(error);
			}
			callback(item ? new that(item) : null);
		}