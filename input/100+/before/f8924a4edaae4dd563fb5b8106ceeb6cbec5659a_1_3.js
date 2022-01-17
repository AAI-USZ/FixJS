function(contentElement, contentWrapperElement, options) {

		this.parent(contentElement, contentWrapperElement, options);

		var styles = {
			'top': 0, 'left': 0, 'bottom': 0, 'right': 0,
			'position': 'absolute',
			'overflow': 'auto',
			'overflow-scrolling': this.options.momentum ? 'touch' : 'auto'
		};

		this.outerWrapperElement = document.createElement('div');
		this.innerWrapperElement = document.createElement('div');
		this.outerWrapperElement.setStyles(styles);
		this.innerWrapperElement.setStyles(styles);
		this.outerWrapperElement.wraps(contentElement);
		this.innerWrapperElement.wraps(contentElement);
		this.innerWrapperElement.addEvent('scroll', this.bound('_onScroll'));

		this.scroller = new Fx.Scroll(this.innerWrapperElement);

		window.addEvent('orientationchange', this.bound('_onOrientationChange'));

		return this;
	}