function(component, adjWidth, adjHeight)
	{
		var width,
			bodyWidth = component.bodyEl.getWidth();
		
		if(component.iframeEl)
		{
			width = bodyWidth - component.iframeEl.getBorderWidth('lr') - 2;
			component.iframeEl.setWidth(width);
		}
		
		if(component.tableEl)
		{
			width = bodyWidth - component.tableEl.getBorderWidth('lr') - 2;
			component.tableEl.setWidth(width);
		}
	}