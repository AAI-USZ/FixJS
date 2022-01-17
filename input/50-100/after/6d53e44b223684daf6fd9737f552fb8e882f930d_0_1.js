function( color, treshold ) {
		treshold = treshold !== undefined ? treshold : 0.01;
		return Math.abs( color._h - this._h ) <= treshold &&
				Math.abs( color._s - this._s ) <= treshold &&
				Math.abs( color._l - this._l ) <= treshold &&
				Math.abs( color._a - this._a ) <= treshold;
	}