function(error, item)
		{
			if(error)
			{
				that.error(error);
			}
			that.update(item);

			callback();
		}