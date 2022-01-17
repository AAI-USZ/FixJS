function( ray ) {
		var i,
		    j,
		    parameters = [
		    	[],
		    	[]
		    ],
		    inv_direction = [],
		    sign = [],
		    omin,
		    omax,
		    tmin,
		    tmax,
		    new_rs = [];

		// Initialize values
		for (i = 0; i < this._numDimensions; i++) {
			parameters[0][i] = this.min[i];
			parameters[1][i] = this.max[i];
			j = 1 / ray[i].b;
			inv_direction[i] = j;
			sign[i] = (j <= 0) ? 1 : 0;
		}

		omin = (parameters[sign[0]][0] - ray[0].a) * inv_direction[0];
		omax = (parameters[1 - sign[0]][0] - ray[0].a) * inv_direction[0];

		for (i = 1; i < this._numDimensions; i++) {
			tmin = (parameters[sign[i]][i] - ray[i].a) * inv_direction[i];
			tmax = (parameters[1 - sign[i]][i] - ray[i].a) * inv_direction[i];

			if ((omin > tmax) || (tmin > omax)) return false;

			if (tmin > omin) omin = tmin;

			if (tmax < omax) omax = tmax;
		}

		if (omin >= Infinity || omax <= -Infinity) return false;

		if (omin < 0 && omax < 0) return false;

		if (omin < 0) omin = 0;
		if (omax > 1) omax = 1;

		for (i = 0; i < this._numDimensions; i++) {
			new_rs[i] = {
				a : ray[i].a + ray[i].b * omin,
				b : ray[i].a + ray[i].b * omax
			};
		}

		return new_rs;
	}