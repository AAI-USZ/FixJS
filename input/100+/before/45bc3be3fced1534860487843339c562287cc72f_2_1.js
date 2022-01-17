function(content, options) {

		this.parent(content, options);

		this.wrapperElement.addClass('scroller-engine-iscroll');

		var options = {
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
			onScrollStart: this.bound('_onScrollStart'),
			onScrollMove: this.bound('_onScrollMove'),
			onScrollEnd: this.bound('_onScrollEnd'),
			onBeforeScrollStart: function (e) {
				var target = e.target.get('tag');
				if (target !== 'input' && target !== 'select') {
					e.preventDefault();	// This fixes an Android issue where the content would not scroll
				}
			}
		};

		this.scroller = new iScroll(this.wrapperElement, options);

		window.addEvent('orientationchange', this.bound('_onOrientationChange'));

		return this;
	}