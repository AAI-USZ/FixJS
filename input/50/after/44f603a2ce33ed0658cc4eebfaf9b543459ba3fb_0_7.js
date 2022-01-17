function(error, item)
		{
			if(error)
			{
				that.error(500, error);
			}
			that.update(item);

			callback();
		}