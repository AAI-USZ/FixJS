function(x, y)
	{
		if (this._pendingPath === null || this._pendingPath.length <= 0)
			return false;

		if (arguments.length === 1)
		{
			var target = this._currentGoal.target || null;
			var result = ((target != null) && (x[0] === target[0]))
			return result;
		}

		var last = this._pendingPath[this._pendingPath.length - 1];
		return last.x === x && last.y === y;
	}