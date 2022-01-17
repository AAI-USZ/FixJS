function (el, options) {
		var that = this,
			doc = document,
			i;

		that.wrapper = el.nodeType === 1 ? el.parentNode : doc.querySelector(el).parentNode;
		that.wrapper.style.overflow = 'hidden';
		that.scroller = that.wrapper.children[0];

		// Default options
		that.options = {
			hScroll: true,
			vScroll: true,
			x: 0,
			y: 0,
            /*Set bounce to false to improve scroll performance*/
			bounce: false,
			bounceLock: false,
			momentum: true,
			lockDirection: true,
			useTransform: true,
			useTransition: false,
			topOffset: 0,
			checkDOMChanges: false,		// Experimental
			mouseGestures: true,

			// Scrollbar
			hScrollbar: true,
			vScrollbar: true,
			fixedScrollbar: isAndroid,
			hideScrollbar: isIDevice,
			fadeScrollbar: isIDevice && has3d,
			scrollbarClass: '',

			// Zoom
			zoom: false,
			zoomMin: 1,
			zoomMax: 4,
			doubleTapZoom: 2,
			wheelAction: 'scroll',
			disableMouseWheel : false,

			// Snap
			snap: false,
			snapThreshold: 1,

			// Events
			onRefresh: null,
			//onBeforeScrollStart: function (e) { e.preventDefault(); },
            onBeforeScrollStart: function (e) {
                var target = null;
                if(e.target){
                    target = e.target;
                }
                else if(e.currentTarget){
                    target = e.currentTarget;
                }
                if (target != null && target.tagName && (target.tagName.toLowerCase() === "select" || target.tagName.toLowerCase() === "input" || target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "img")){
                    return;
                }
                e.preventDefault();
                //e.stopPropagation();
            },
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null,
			onZoomStart: null,
			onZoom: null,
			onZoomEnd: null
		};
		// Helpers FIX ANDROID BUG!
		// translate3d and scale doesn't work together! 
		// Ignoring 3d ONLY WHEN YOU SET that.zoom
		if ( that.zoom && isAndroid ){
			trnOpen = 'translate(';
			trnClose = ')';
		}
		// User defined options
		for (i in options) that.options[i] = options[i];
		
		// Set starting position
		that.x = that.options.x;
		that.y = that.options.y;

		// Normalize options
		that.options.useTransform = hasTransform ? that.options.useTransform : false;
		that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
		that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
		that.options.zoom = that.options.useTransform && that.options.zoom;
		that.options.useTransition = hasTransitionEnd && that.options.useTransition;
		
		// Set some default styles
		that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
		that.scroller.style[vendor + 'TransitionDuration'] = '0';
		that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
		if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
		
		if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
		else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

		if (that.options.useTransition) that.options.fixedScrollbar = true;

		that.refresh();

		that._bind(RESIZE_EV, window);
		that._bind(START_EV);
		if (!hasTouch) {
			that._bind('mouseout', that.wrapper);
			if (!that.options.disableMouseWheel) {
				that._bind(WHEEL_EV);
			}
		}

		if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
			that._checkDOMChanges();
		}, 500);
	}