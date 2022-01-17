function() {
		window.removeEvent('orientationchange', this.bound('_onOrientationChange'));
		this.scroller.destroy();
		this.scroller = null;
		this.parent();
		return this;
	}