function()
	{
		if (this._moveTo != null)
		{
			return Math3D.Direction(this.GetCenter(), this._moveTo);
		}
		else if (this._velocity != null)
		{
			return Math3D.GetNormal(this._velocity);
		}
		else
		{
			return { x : 0, y : 0 };
		}
	}