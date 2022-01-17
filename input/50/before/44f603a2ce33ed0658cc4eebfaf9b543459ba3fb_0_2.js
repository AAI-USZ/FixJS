function(error, collection)
		{
			if(error)
			{
				that.error(error);
			}
			that.collection = collection;

			callback();
		}