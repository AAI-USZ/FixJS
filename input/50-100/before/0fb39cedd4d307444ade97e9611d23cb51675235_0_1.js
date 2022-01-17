function(e)
	{
		var frame = e.frame;

		for (var i = 0; i < this._goals.length; i++)
			this._goals[i].Update(frame);

		for (var i = 0; i < this._goals.length; i++)
		{
			var goal = this._goals[i];
			if (goal.IsActive)
			{
				goal.Behave(frame);
				break;
			}
		}
	}