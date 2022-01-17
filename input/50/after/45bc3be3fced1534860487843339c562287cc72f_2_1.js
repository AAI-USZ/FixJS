function() {
		window.removeEvent('orientationchange', this.bound('_onOrientationChange'));
		this.iscroll.destroy();
		this.iscroll = null;
		this.parent();
		return this;
	}