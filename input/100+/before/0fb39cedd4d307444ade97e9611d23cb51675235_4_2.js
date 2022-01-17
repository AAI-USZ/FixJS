function(start, end, box)
	{
		var min = { x : box.x, y : box.y };
		var max = { x : box.x + box.w, y : box.y + box.h };

		if ((start.x < min.x && end.x < min.x) ||
			(start.x > max.x && end.x > max.x) ||
			(start.y < min.y && end.y < min.y) ||
			(start.y > max.y && end.y > max.y))
			return false;

		if (this._insideBox(start, box) || this._insideBox(end, box))
			return true;

		if (this._lineSideIntersect(start.x, end.x, min.x, start.y, end.y, min.y, max.y) ||
			this._lineSideIntersect(start.x, end.x, max.x, start.y, end.y, min.y, max.y) ||
			this._lineSideIntersect(start.y, end.y, min.y, start.x, end.x, min.x, max.x) ||
			this._lineSideIntersect(start.y, end.y, max.y, start.x, end.x, min.x, max.x))
			return true;

		return false;
	}