function(pageId)
	{
		// Should probably take either an ID or an Element
		var page = $(pageId);
		if (page)
		{
			if (!iui.busy)
			{
				iui.busy = true;
				var index = pageHistory.indexOf(pageId);
				var backwards = index != -1;
				if (backwards)	// we're going back, shouldn't happen on replacePage()
					log("error: can't replace page with ancestor");
					
				pageHistory.pop();
	
				iui.showPage(page, false);
			}
		}
	}