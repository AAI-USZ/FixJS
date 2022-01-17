function(pageId)
	{
		var page = $(pageId);
		if (page)
		{
			if (!iui.busy)
			{
				iui.busy = true;
				var index = pageHistory.indexOf(pageId);
				var backwards = index != -1;
				if (backwards)
				{
					// we're going back, remove history from index on
					// remember - pageId will be added again in updatePage
					pageHistory.splice(index);
				}
	
				iui.showPage(page, backwards);
			}
		}
	}