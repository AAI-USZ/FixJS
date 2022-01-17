function()
	{
		if (this._pendingPath == null || this._pendingPath.length == 0)
		{
			this._finishedPath();
			return;
		}

		// try to smooth the path
		if (this._pendingPath.length >= 2)
		{
			var start = this.GetTile();
			var dir = { x: 0, y : 0 };

			for (var i = 0, prev = start; i < this._pendingPath.length; i++)
			{
				var current = this._pendingPath[i];
				var dx = current.x - prev.x;
				var dy = current.y - prev.y;

				if (dx * dir.x < 0 || dy * dir.y < 0)
					break;

				dir.x += dx;
				dir.y += dy;

				prev = current;
			}
			if (i >= 2) // TODO: line check to validate
				this._pendingPath.splice(0, i - 1);
		}

		if (!this._isNavigationPaused)
			this._moveToNextPoint();
	}