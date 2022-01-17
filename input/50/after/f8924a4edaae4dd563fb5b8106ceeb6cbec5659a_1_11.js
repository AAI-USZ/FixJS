function() {
		this.parent();
		this._scroller.refresh();
		this._scroller.scrollTo(this._offset.x, this._offset.y);
	}