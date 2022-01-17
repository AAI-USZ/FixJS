function(elevation)
{
    for (var i = 1; i < 3; i++)
    {
        var cellContents = this.model.getContents(this.x - i, this.y + i);
		if (cellContents.tempParams.neverInWay)
			continue;
			
        var topData = cellContents;
        while (topData.myItems.length > 0)
        {
            topData = topData.myItems[0];
            if (topData.params.elev + topData.params.ht > 30 * (i - 1) + elevation)
            {
                // This item is in the way!
				var itemOpacity = 0;
				if (this.model.getContents(this.x - i - 1, this.y + i + 1).tempParams.avatarSees)
                	itemOpacity = 0.8;
            	
				topData.setInTheWay(itemOpacity);
            }
        }
    }
}