function()
	{
		if (this._currentGoal != null && !this._isNavigationPaused)
		{
			if (this._currentGoal.target)
			{
				var newCenter = this._currentGoal.target.GetCenter();
				if (Math3D.DistanceSq(this._currentGoal._goalCenter, newCenter) > 4)
					this.NavigateTo(this._currentGoal.target, this._currentGoal.radius);
			}
		}
	}