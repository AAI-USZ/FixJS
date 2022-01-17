function() {

		this.innerWrapperElement.removeEvent('scroll', this.bound('_onScroll'));
		this.innerWrapperElement = null;
		this.outerWrapperElement = null;

		this.scroller = null;

		window.addEvent('orientationchange', this.bound('_onOrientationChange'));

		this.parent();
	}