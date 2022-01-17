function(x, y)
	{
		if (this._pendingPath === null || this._pendingPath.length <= 0)
			return false;

		var last = this._pendingPath[this._pendingPath.length - 1];
		return last.x === x && last.y === y;
	}