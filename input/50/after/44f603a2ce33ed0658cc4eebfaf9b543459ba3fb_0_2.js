function(error, collection)
		{
			if(error)
			{
				that.error(500, error);
			}
			that.collection = collection;

			callback();
		}