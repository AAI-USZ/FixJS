function()
	{
		var center = this.GetCenter();
		center.x = Math.floor(center.x + 0.5);
		center.y = Math.floor(center.y + 0.5);
		return center;
	}