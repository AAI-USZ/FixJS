function() {
		this.parent();
		this._scroller.refresh();
		this._scroller.scrollTo(this._scroll.x, this._scroll.y);
	}