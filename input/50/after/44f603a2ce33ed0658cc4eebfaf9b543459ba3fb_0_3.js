function(error, item)
			{
				if(error)
				{
					that.error(500, error);
				}
				if(item == null)
				{
					callback(items);
				}
				items.push(new that(item));	
			}