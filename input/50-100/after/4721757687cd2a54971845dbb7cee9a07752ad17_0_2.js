function(error, cursor)
		{
			if(error)
			{
				that.error(error);
			}
			var items = [];

			cursor.each(function(error, item)
			{
				if(error)
				{
					that.error(error);
				}
				if(item == null)
				{
					callback(items);
				}
				items.push(new that(item));	
			});
		}