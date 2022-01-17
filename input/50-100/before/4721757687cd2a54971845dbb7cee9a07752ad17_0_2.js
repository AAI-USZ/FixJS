function(error, cursor)
		{
			var items = [];

			cursor.each(function(error, item)
			{
				console.log('each', item);

				if(item == null)
				{
					callback(items);
				}
				items.push(new that(item));	
			});
		}