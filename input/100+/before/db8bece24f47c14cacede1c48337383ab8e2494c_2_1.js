function PublishOutlineViewItems(concepts, parentSelector, parentItem)
	{
		var newOrderedList;
	  	if (!parentItem)
	  	{
	  		parentItem = $(parentSelector);
	  	} 
	  	
  		$(parentItem).append("<ol></ol>");
  		newOrderedList = $(parentItem).children(":last");
	  	
	  	for (var i = 0; i < concepts.length; i++) 
	  	{
			var concept = concepts[i];
			if (concept)
			{
				$(newOrderedList).append("<li>" + concept.content + "</li>");
				var newListItem = $(newOrderedList).children(":last");
				if (concept.concepts)
				{
					PublishOutlineViewItems(concept.concepts, null, newListItem);
				}
			}
		};
	}