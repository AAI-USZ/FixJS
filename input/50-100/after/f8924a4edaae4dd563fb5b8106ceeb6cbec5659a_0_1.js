function() {
		this.contentElement.removeEvent('touchstart', this.bound('_onTouchStart'));
		this.contentElement.removeEvent('touchend', this.bound('_onTouchEnd'));
		this._scroller.removeEvent('scroll', this.bound('_onScroll'));
		this._scroller.destroy();
		this._scroller = null;
		this.parent();
	}