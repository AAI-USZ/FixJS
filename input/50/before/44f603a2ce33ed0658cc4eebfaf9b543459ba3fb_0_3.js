function(error, item)
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
			}