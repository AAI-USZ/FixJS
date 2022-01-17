function(contentElement, contentWrapperElement, options) {

		this.parent(contentElement, contentWrapperElement, options);

		this.iscroll = new iScroll(this.contentWrapperElement, {
			hScroll: this.options.scrollX,
			vScroll: this.options.scrollY,
			momentum: this.options.momentum,
			bounce: this.options.momentum,
			hScrollbar: this.options.momentum,
			vScrollbar: this.options.momentum,
			useTransform: true,
			useTransition: true,
			hideScrollbar: true,
			fadeScrollbar: true,
			checkDOMChanges: true,
			snap: false,
			onBeforeScrollStart: this.bound('_onBeforeScrollStart'),
			onAnimationEnd: this.bound('_onAnimationEnd'),
			onScrollMove: this.bound('_onScrollMove'),
			onScrollEnd: this.bound('_onScrollEnd')
		});

		this.contentWrapperElement.addEvent('touchstart', this.bound('_onTouchStart'));
		this.contentWrapperElement.addEvent('touchend', this.bound('_onTouchEnd'));

		window.addEvent('orientationchange', this.bound('_onOrientationChange'));

		return this;
	}