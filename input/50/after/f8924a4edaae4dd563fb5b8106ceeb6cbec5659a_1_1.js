function(x, y, time) {
		this._moving = true;
		this.iscroll.scrollTo(-x, -y, time || 0);
		return this;
	}