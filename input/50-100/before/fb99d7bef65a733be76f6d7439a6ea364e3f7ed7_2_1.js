function(x, y)
	{
		this._moveTo = { x : x, y : y };
		var center = this.GetCenter();
		this.trigger("NewDirection", Math3D.Normalize({ x : x - center.x, y : y - center.y }));
	}