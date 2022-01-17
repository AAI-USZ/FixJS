function() {
		window.removeEvent('orientationchange', this.bound('_onOrientationChange'));
		this.contentWrapperElement.removeEvent('touchstart', this.bound('_onTouchStart'));
		this.contentWrapperElement.removeEvent('touchend', this.bound('_onTouchEnd'));
		this.iscroll.destroy();
		this.iscroll = null;
		return this.parent();
	}