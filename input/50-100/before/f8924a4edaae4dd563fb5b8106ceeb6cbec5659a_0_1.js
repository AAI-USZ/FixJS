function() {

		this._scroller.removeEvent('scroll', this.bound('_onScroll'));
		this._scroller.destroy();
		this._scroller = null;

		this.parent();
	}