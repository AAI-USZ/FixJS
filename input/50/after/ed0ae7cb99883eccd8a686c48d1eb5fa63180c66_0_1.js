function(response)
		{

			this.returnedItemsCount = response.returned_items_count;
			this.totalItemsCount = response.items_count;
			return response.items;
		}