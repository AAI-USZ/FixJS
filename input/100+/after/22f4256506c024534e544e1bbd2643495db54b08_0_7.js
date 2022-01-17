function()
	{
		for(var mkr in this.markers)
		{
			this.markers[mkr].setMap(null);
		}
		this.markers = {};
	}