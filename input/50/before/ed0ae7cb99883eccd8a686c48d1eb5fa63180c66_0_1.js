function(response)
		{

			this.returnedItemsCount = response.returned_items_and_collections_count;
			this.totalItemsCount = response.items_and_collections_count;
			return response.items_and_collections;
		}