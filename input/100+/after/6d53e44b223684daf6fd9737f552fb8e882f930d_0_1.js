function( color ) {
		color = new Color( color );
		return color._h === this._h &&
				color._s === this._s &&
				color._l === this._l &&
				color._a === this._a;
	}