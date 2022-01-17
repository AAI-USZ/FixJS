function() 
	{
		var sortItems = "";

		for (var i = 0; i < this.childNodes.length; i++) 
		{
			var sortTag = $(this.childNodes[i]).data("z_sort_tag") 
			if (!sortTag && this.childNodes[i].id)
			{
				sortTag = z_drag_tag[this.childNodes[i].id];
			}
			if (sortTag)
			{
				if (sortItems != "") 
				{
					sortItems += ",";
				}
				
				sortItems += sortTag
			}
		}
		
		var sortItem = new Array({name: 'sort_items', value: sortItems});
		
		z_queue_postback(this.id, sortPostbackInfo, sortItem, true);
	}