function (point, bounds) {
		var d;
		//Works for 2D, 3D, and nD! Please, please feed in bounds generated like the line below.
		//var bounds = nGetBounds(pointList);
		//d stands for dimention
		for (d = 0; d < point.length; d += 1) {
			//dimentional value check
			if (point[d] < bounds[0][d] || point[d] > bounds[1][d]) {
				return false;
			}
		}
		return true;
	}