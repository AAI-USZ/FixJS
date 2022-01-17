function(error, item)
		{
			if(error)
			{
				that.error(error);
			}
			callback(new that(item));
		}