function(contentElement, contentWrapperElement, options) {

		this.parent(contentElement, contentWrapperElement, options);

		var styles = {
			'top': 0, 'left': 0, 'bottom': 0, 'right': 0,
			'position': 'absolute',
			'overflow': 'auto',
			'overflow-scrolling': this.options.momentum ? 'touch' : 'auto'
		};

		var scrollFixOuterDiv = document.createElement('div');
		var scrollFixInnerDiv = document.createElement('div');
		scrollFixOuterDiv.setStyles(styles);
		scrollFixInnerDiv.setStyles(styles);
		scrollFixOuterDiv.wraps(contentElement);
		scrollFixInnerDiv.wraps(contentElement);

		this.contentScrollerElement = scrollFixInnerDiv;
		this.contentScrollerElement.addEvent('touchstart', this.bound('_onTouchStart'));
		this.contentScrollerElement.addEvent('touchend', this.bound('_onTouchEnd'));
		this.contentScrollerElement.addEvent('scroll', this.bound('_onScroll'));

		this.contentScroller = new Fx.Scroll(this.contentScrollerElement);

		window.addEvent('orientationchange', this.bound('_onOrientationChange'));

		return this;
	}