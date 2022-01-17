function(x, y, time) {
		this.iscroll.refresh();
		this.iscroll.scrollTo(-x, -y, time || 0);
		return this;
	}