function($, $$) {
	window.CHUIVersion = '1.1.4';
	var UIExpectedChocolateChipJSVersion = '1.3.8'; 

	var UICheckChocolateChipJSVersion = function() {
		if ($.version !== UIExpectedChocolateChipJSVersion) {
			console.error('This version of ChocolateChip-UI requries ChococlateChip.js version ' + UIExpectedChocolateChipJSVersion + '!');
			console.error('The version of ChocolateChip.js which you are using is: ' + $.version);
			console.error('ChocolateChip.js has been disabled until this problem is resolved.');
			window.$ = null;
		}
	};
	UICheckChocolateChipJSVersion();

	$(function() {
		$.body = $('body');
		$.app = $('app');
		$.main = $('#main');
		$.views = $$('view');
		if (!$.touchEnabled) {
			var stylesheet = $('head').find('link[rel=stylesheet]').href;
			var stylesheet1 = stylesheet.replace(/chui\.css/, 'chui.desktop.css');
			$('head').append('<link rel="stylesheet" href="' + stylesheet1 + '">');
		}
		if ($.touchEnabled) $.userAction = 'touchstart';
	});
	$.tablet = false;
	if ( window.innerWidth > 600 ) {
		$.tablet = true;
	}
	
	$.extend({
		UIUuidSeed : function ( seed ) {
			if (seed) {
				return (((1 + Math.random()) * 0x10000) | 0).toString(seed).substring(1);
			} else {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
		},
		AlphaSeed : function ( ) {
			var text = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			text += chars.charAt(Math.floor(Math.random() * chars.length));
			return text;
		},
		UIUuid : function() {
			return ($.AlphaSeed() + $.UIUuidSeed(20) + $.UIUuidSeed() + '-' + $.UIUuidSeed() + '-' + $.UIUuidSeed() + '-' + $.UIUuidSeed() + '-' + $.UIUuidSeed() + $.UIUuidSeed() + $.UIUuidSeed());
		},
		resetApp : function ( hard ) {
			if (hard === 'hard') {
				window.location.reload(true);
			} else {
				$.views.each(function(view) {
					view.setAttribute('ui-navigation-status', 'upcoming');
				});
				$.main.setAttribute('ui-navigation-status', 'current');
				$.UINavigationHistory = ['#main'];
			}
		}
	});
	$.extend(HTMLElement.prototype, {
		UIIdentifyChildNodes : function ( ) {
			var kids = this.childElementCount;
			for (var i = 0; i < kids; i++) {
				this.children[i].setAttribute('ui-child-position', i);
			}
		}
	});
	
	$.extend(HTMLElement.prototype, {
		UIHandleTouchState : function(delay) {
			if ($.UIScrollingActive) return;
			delay = delay || 200;
			var $this = this;
			if ($.mobile) {
				this.addClass('touched');
				setTimeout(function() {
					$this.removeClass('touched');
				}, delay);
			}
		},
		
		UIToggleButtonLabel : function ( label1, label2 ) {
			if ($('label', this).text() === label1) {
				$('label', this).text(label2);
			} else {
				$('label', this).text(label1);
			}
		}
	});
	
	$(function() {
		$.app.delegate('uibutton', 'touchstart', function(button) {
			if (button.hasClass('disabled')) {
				return false;
			} else {
				if (!$.UIScrollingActive) {
					button.UIHandleTouchState();
				}
			}
		});
	});
	
	$.extend({
		UINavigationHistory : ['#main'],
		UINavigateBack : function() {
			var parent = $.UINavigationHistory[$.UINavigationHistory.length-1];
			$.UINavigationHistory.pop();
			$($.UINavigationHistory[$.UINavigationHistory.length-1])
			.setAttribute('ui-navigation-status', 'current');
			$(parent).setAttribute('ui-navigation-status', 'upcoming');
			if ($.app.getAttribute('ui-kind')==='navigation-with-one-navbar' && $.UINavigationHistory[$.UINavigationHistory.length-1] === '#main') {
				$('navbar > uibutton[ui-implements=back]', $.app).css('display','none');
			}
		},
		UINavigateToNextView : function(viewID) {
			$.UINavigationListExits = true;
			$($.UINavigationHistory[$.UINavigationHistory.length-1])
				.setAttribute('ui-navigation-status','traversed');
			$(viewID).setAttribute('ui-navigation-status','current');
			$.UINavigationHistory.push(viewID);
			if ($.app.getAttribute('ui-kind') === 'navigation-with-one-navbar') {
				$('navbar uibutton[ui-implements=back]').css({'display':'block'});
			}
		},
		
		UIDoubleTapDelta : 700,
		UIDoubleTapTimer : null,
		UIDoubleTapFunction1 : null,
		UIDoubleTapFunction2 : null,
		UIDoubleTapTimeout : function ( ) {
			$.UIDoubleTapFunction1();
			$.UIDoubleTapTimer = null;
		},
		UIDoubleTap : function (firstTap, secondTap) {
			if ($.UIDoubleTapTimer === null) {
				$.UIDoubleTapTimer = setTimeout($.UIDoubleTapTimeout, $.UIDoubleTapDelta);
				$.UIDoubleTapFunction1 = firstTap;
				$.UIDoubleTapFunction2 = secondTap;
			} else {
				$.UIDoubleTapTimer = null;
				$.UIDoubleTapFunction2();
			}
		},
		
		UINavigationListExits : false,

		UINavigationEvent : false,
		
		UINavigationEnabled : false,
		
		UINavigationList : function() {
			var navigateList = function(item) {
				try {
					if ($.app.getAttribute('ui-kind')==='navigation-with-one-navbar') {
						$('navbar > uibutton[ui-implements=back]', $.app).css('display: block;');
					}
					$(item.getAttribute('href')).setAttribute('ui-navigation-status', 'current');
					$($.UINavigationHistory[$.UINavigationHistory.length-1]).setAttribute('ui-navigation-status', 'traversed');
					if ($('#main').getAttribute('ui-navigation-status') !== 'traversed') {
						$('#main').setAttribute('ui-navigation-status', 'traversed');
					}
					$.UINavigationHistory.push(item.getAttribute('href'));
				} catch(err) {} 
			};
			$.app.delegate('tablecell', $.userAction, function(item) {
				if (item.hasAttribute('href')) {
					$.UINavigationListExits = true;
					setTimeout(function() {
						if ($.UIScrollingActive) return;
						item.UIHandleTouchState();
						if ($.UINavigationEvent) {
							return;
						} else {
							$.UINavigationEnabled = true;
							$.UINavigationEvent = false;
							navigateList(item);
							$.UINavigationEvent = true;
						}
					},100);
				}
			});
		},

		UITouchedTableCell : null
	});
	$(function() {
		$.app.delegate('uibutton', $.userAction, function(item) {
			if (item.getAttribute('ui-implements') === 'back') {
			   if ($.UINavigationListExits) {
			   	   $.UINavigateBack();
			   }
			}
		});
		$.UINavigationList();

		$.app.delegate('view','webkitTransitionEnd', function() {
			if (!$('view[ui-navigation-status=current]')) {
				$($.UINavigationHistory[$.UINavigationHistory.length-2])	 
					.setAttribute('ui-navigation-status', 'current');
				$.UINavigationHistory.pop(); 
			}	
			$.UINavigationEvent = false;
		});
	});
$.UIScrollingActive = false;
/*!
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(){
	var m = Math,
		mround = function (r) { return r >> 0; },
		vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
			(/firefox/i).test(navigator.userAgent) ? 'Moz' :
			(/trident/i).test(navigator.userAgent) ? 'ms' :
			'opera' in window ? 'O' : '',
	
		// Browser capabilities
		isAndroid = (/android/gi).test(navigator.appVersion),
		isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
		isPlaybook = (/playbook/gi).test(navigator.appVersion),
		isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
	
		has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
		hasTouch = 'ontouchstart' in window && !isTouchPad,
		hasTransform = vendor + 'Transform' in document.documentElement.style,
		hasTransitionEnd = isIDevice || isPlaybook,
	
		nextFrame = (function() {
			return window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame
				|| function(callback) { return setTimeout(callback, 1); }
		})(),
		cancelFrame = (function () {
			return window.cancelRequestAnimationFrame
				|| window.webkitCancelAnimationFrame
				|| window.webkitCancelRequestAnimationFrame
				|| window.mozCancelRequestAnimationFrame
				|| window.oCancelRequestAnimationFrame
				|| window.msCancelRequestAnimationFrame
				|| clearTimeout
		})(),
	
		// Events
		RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
		START_EV = hasTouch ? 'touchstart' : 'mousedown',
		MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
		END_EV = hasTouch ? 'touchend' : 'mouseup',
		CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
		WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
	
		// Helpers
		trnOpen = 'translate' + (has3d ? '3d(' : '('),
		trnClose = has3d ? ',0)' : ')',
	
		// Constructor
		iScroll = function (el, options) {
			var that = this,
				doc = document,
				i;
	
			that.wrapper = typeof el == 'object' ? el : doc.querySelector(el);
			that.wrapper.style.overflow = 'hidden';
			that.scroller = that.wrapper.children[0];
	
			// Default options
			that.options = {
				hScroll: true,
				vScroll: true,
				x: 0,
				y: 0,
				bounce: true,
				bounceLock: false,
				momentum: true,
				lockDirection: true,
				useTransform: true,
				useTransition: false,
				topOffset: 0,
				checkDOMChanges: false,		// Experimental
	
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
	
				// Snap
				snap: false,
				snapThreshold: 1,
	
				// Events
				onRefresh: null,
				onBeforeScrollStart: function (e) { e.preventDefault(); },
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
	
			// Helpers FIX ANDROID BUG!
			// translate3d and scale doesn't work together! 
			// Ignoring 3d ONLY WHEN YOU SET that.options.zoom
			if ( that.options.zoom && isAndroid ){
				trnOpen = 'translate(';
				trnClose = ')';
			}
			
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
				if (that.options.wheelAction != 'none')
					that._bind(WHEEL_EV);
			}
	
			if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
				that._checkDOMChanges();
			}, 500);
		};
	
	// Prototype
	iScroll.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		currPageX: 0, currPageY: 0,
		pagesX: [], pagesY: [],
		aniTime: null,
		wheelZoomCount: 0,
		
		handleEvent: function (e) {
			var that = this;
			switch(e.type) {
				case START_EV:
					if (!hasTouch && e.button !== 0) return;
					if (e.target.tagName === "TEXTAREA") return;
					if (e.target.tagName === "INPUT") return;
					if (e.target.tagName === "SELECT") return;
					that._start(e);
					break;
				case MOVE_EV: that._move(e); break;
				case END_EV:
				case CANCEL_EV: that._end(e); break;
				case RESIZE_EV: that._resize(); break;
				case WHEEL_EV: that._wheel(e); break;
				case 'mouseout': that._mouseout(e); break;
				case 'webkitTransitionEnd': that._transitionEnd(e); break;
			}
		},
		
		_checkDOMChanges: function () {
			if (this.moved || this.zoomed || this.animating ||
				(this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;
	
			this.refresh();
		},
		
		_scrollbar: function (dir) {
			var that = this,
				doc = document,
				bar;
	
			if (!that[dir + 'Scrollbar']) {
				if (that[dir + 'ScrollbarWrapper']) {
					if (hasTransform) that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
					that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
					that[dir + 'ScrollbarWrapper'] = null;
					that[dir + 'ScrollbarIndicator'] = null;
				}
	
				return;
			}
	
			if (!that[dir + 'ScrollbarWrapper']) {
				// Create the scrollbar wrapper
				bar = doc.createElement('div');
	
				if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
				else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');
	
				bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');
	
				that.wrapper.appendChild(bar);
				that[dir + 'ScrollbarWrapper'] = bar;
	
				// Create the scrollbar indicator
				bar = doc.createElement('div');
				if (!that.options.scrollbarClass) {
					bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';-' + vendor + '-border-radius:3px;border-radius:3px';
				}
				bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform;-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + trnOpen + '0,0' + trnClose;
				if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
	
				that[dir + 'ScrollbarWrapper'].appendChild(bar);
				that[dir + 'ScrollbarIndicator'] = bar;
			}
	
			if (dir == 'h') {
				that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
				that.hScrollbarIndicatorSize = m.max(mround(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
				that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
				that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
				that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
			} else {
				that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
				that.vScrollbarIndicatorSize = m.max(mround(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
				that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
				that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
				that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
			}
	
			// Reset position
			that._scrollbarPos(dir, true);
		},
		
		_resize: function () {
			var that = this;
			setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
		},
		
		_pos: function (x, y) {
			x = this.hScroll ? x : 0;
			y = this.vScroll ? y : 0;
	
			if (this.options.useTransform) {
				this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
			} else {
				x = mround(x);
				y = mround(y);
				this.scroller.style.left = x + 'px';
				this.scroller.style.top = y + 'px';
			}
	
			this.x = x;
			this.y = y;
	
			this._scrollbarPos('h');
			this._scrollbarPos('v');
		},
	
		_scrollbarPos: function (dir, hidden) {
			var that = this,
				pos = dir == 'h' ? that.x : that.y,
				size;
	
			if (!that[dir + 'Scrollbar']) return;
	
			pos = that[dir + 'ScrollbarProp'] * pos;
	
			if (pos < 0) {
				if (!that.options.fixedScrollbar) {
					size = that[dir + 'ScrollbarIndicatorSize'] + mround(pos * 3);
					if (size < 8) size = 8;
					that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
				}
				pos = 0;
			} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
				if (!that.options.fixedScrollbar) {
					size = that[dir + 'ScrollbarIndicatorSize'] - mround((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
					if (size < 8) size = 8;
					that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
					pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
				} else {
					pos = that[dir + 'ScrollbarMaxScroll'];
				}
			}
	
			that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
			that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
			that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
		},
		
		_start: function (e) {
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				matrix, x, y,
				c1, c2;
	
			if (!that.enabled) return;
	
			if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
	
			if (that.options.useTransition || that.options.zoom) that._transitionTime(0);
	
			that.moved = false;
			that.animating = false;
			that.zoomed = false;
			that.distX = 0;
			that.distY = 0;
			that.absDistX = 0;
			that.absDistY = 0;
			that.dirX = 0;
			that.dirY = 0;
	
			// Gesture start
			if (that.options.zoom && hasTouch && e.touches.length > 1) {
				c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
				c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
				that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);
	
				that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
				that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;
	
				if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
			}
	
			if (that.options.momentum) {
				if (that.options.useTransform) {
					// Very lame general purpose alternative to CSSMatrix
					matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
					x = matrix[4] * 1;
					y = matrix[5] * 1;
				} else {
					x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
					y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
				}
				
				if (x != that.x || y != that.y) {
					if (that.options.useTransition) that._unbind('webkitTransitionEnd');
					else cancelFrame(that.aniTime);
					that.steps = [];
					that._pos(x, y);
				}
			}
	
			that.absStartX = that.x;	// Needed by snap threshold
			that.absStartY = that.y;
	
			that.startX = that.x;
			that.startY = that.y;
			that.pointX = point.pageX;
			that.pointY = point.pageY;
	
			that.startTime = e.timeStamp || Date.now();
	
			if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
	
			that._bind(MOVE_EV);
			that._bind(END_EV);
			that._bind(CANCEL_EV);
		},
		
		_move: function (e) {
			$.UIScrollingActive = true;
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				deltaX = point.pageX - that.pointX,
				deltaY = point.pageY - that.pointY,
				newX = that.x + deltaX,
				newY = that.y + deltaY,
				c1, c2, scale,
				timestamp = e.timeStamp || Date.now();
	
			if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
	
			// Zoom
			if (that.options.zoom && hasTouch && e.touches.length > 1) {
				c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
				c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
				that.touchesDist = m.sqrt(c1*c1+c2*c2);
	
				that.zoomed = true;
	
				scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;
	
				if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
				else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);
	
				that.lastScale = scale / this.scale;
	
				newX = this.originX - this.originX * that.lastScale + this.x,
				newY = this.originY - this.originY * that.lastScale + this.y;
	
				this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';
	
				if (that.options.onZoom) that.options.onZoom.call(that, e);
				return;
			}
	
			that.pointX = point.pageX;
			that.pointY = point.pageY;
	
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < that.maxScrollX) {
				newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
			}
			if (newY > that.minScrollY || newY < that.maxScrollY) { 
				newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
			}
	
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = m.abs(that.distX);
			that.absDistY = m.abs(that.distY);
	
			if (that.absDistX < 6 && that.absDistY < 6) {
				return;
			}
	
			// Lock direction
			if (that.options.lockDirection) {
				if (that.absDistX > that.absDistY + 5) {
					newY = that.y;
					deltaY = 0;
				} else if (that.absDistY > that.absDistX + 5) {
					newX = that.x;
					deltaX = 0;
				}
			}
	
			that.moved = true;
			that._pos(newX, newY);
			that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
	
			if (timestamp - that.startTime > 300) {
				that.startTime = timestamp;
				that.startX = that.x;
				that.startY = that.y;
			}
			
			if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
		},
		
		_end: function (e) {
			$.UIScrollingActive = false;
			if (hasTouch && e.touches.length != 0) return;
	
			var that = this,
				point = hasTouch ? e.changedTouches[0] : e,
				target, ev,
				momentumX = { dist:0, time:0 },
				momentumY = { dist:0, time:0 },
				duration = (e.timeStamp || Date.now()) - that.startTime,
				newPosX = that.x,
				newPosY = that.y,
				distX, distY,
				newDuration,
				snap,
				scale;
	
			that._unbind(MOVE_EV);
			that._unbind(END_EV);
			that._unbind(CANCEL_EV);
	
			if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
	
			if (that.zoomed) {
				scale = that.scale * that.lastScale;
				scale = Math.max(that.options.zoomMin, scale);
				scale = Math.min(that.options.zoomMax, scale);
				that.lastScale = scale / that.scale;
				that.scale = scale;
	
				that.x = that.originX - that.originX * that.lastScale + that.x;
				that.y = that.originY - that.originY * that.lastScale + that.y;
				
				that.scroller.style[vendor + 'TransitionDuration'] = '200ms';
				that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
				
				that.zoomed = false;
				that.refresh();
	
				if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
				return;
			}
	
			if (!that.moved) {
				if (hasTouch) {
					if (that.doubleTapTimer && that.options.zoom) {
						// Double tapped
						clearTimeout(that.doubleTapTimer);
						that.doubleTapTimer = null;
						if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
						that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
						if (that.options.onZoomEnd) {
							setTimeout(function() {
								that.options.onZoomEnd.call(that, e);
							}, 200); // 200 is default zoom duration
						}
					} else {
						that.doubleTapTimer = setTimeout(function () {
							that.doubleTapTimer = null;
	
							// Find the last touched element
							target = point.target;
							while (target.nodeType != 1) target = target.parentNode;
	
							if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
								ev = document.createEvent('MouseEvents');
								ev.initMouseEvent('click', true, true, e.view, 1,
									point.screenX, point.screenY, point.clientX, point.clientY,
									e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
									0, null);
								ev._fake = true;
								target.dispatchEvent(ev);
							}
						}, that.options.zoom ? 250 : 0);
					}
				}
	
				that._resetPos(200);
	
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
	
			if (duration < 300 && that.options.momentum) {
				momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
				momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
	
				newPosX = that.x + momentumX.dist;
				newPosY = that.y + momentumY.dist;
	
				if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
				if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
			}
	
			if (momentumX.dist || momentumY.dist) {
				newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
	
				// Do we need to snap?
				if (that.options.snap) {
					distX = newPosX - that.absStartX;
					distY = newPosY - that.absStartY;
					if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
					else {
						snap = that._snap(newPosX, newPosY);
						newPosX = snap.x;
						newPosY = snap.y;
						newDuration = m.max(snap.time, newDuration);
					}
				}
	
				that.scrollTo(mround(newPosX), mround(newPosY), newDuration);
	
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
	
			// Do we need to snap?
			if (that.options.snap) {
				distX = newPosX - that.absStartX;
				distY = newPosY - that.absStartY;
				if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
				else {
					snap = that._snap(that.x, that.y);
					if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
				}
	
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
	
			that._resetPos(200);
			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
		},
		
		_resetPos: function (time) {
			var that = this,
				resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
				resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
	
			if (resetX == that.x && resetY == that.y) {
				if (that.moved) {
					that.moved = false;
					if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
				}
	
				if (that.hScrollbar && that.options.hideScrollbar) {
					if (vendor == 'webkit') that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
					that.hScrollbarWrapper.style.opacity = '0';
				}
				if (that.vScrollbar && that.options.hideScrollbar) {
					if (vendor == 'webkit') that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
					that.vScrollbarWrapper.style.opacity = '0';
				}
	
				return;
			}
	
			that.scrollTo(resetX, resetY, time || 0);
		},
	
		_wheel: function (e) {
			var that = this,
				wheelDeltaX, wheelDeltaY,
				deltaX, deltaY,
				deltaScale;
	
			if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 12;
				wheelDeltaY = e.wheelDeltaY / 12;
			} else if('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail * 3;
			} else {
				return;
			}
			
			if (that.options.wheelAction == 'zoom') {
				deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
				if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
				if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
				
				if (deltaScale != that.scale) {
					if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
					that.wheelZoomCount++;
					
					that.zoom(e.pageX, e.pageY, deltaScale, 400);
					
					setTimeout(function() {
						that.wheelZoomCount--;
						if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
					}, 400);
				}
				
				return;
			}
			
			deltaX = that.x + wheelDeltaX;
			deltaY = that.y + wheelDeltaY;
	
			if (deltaX > 0) deltaX = 0;
			else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;
	
			if (deltaY > that.minScrollY) deltaY = that.minScrollY;
			else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
	
			that.scrollTo(deltaX, deltaY, 0);
		},
		
		_mouseout: function (e) {
			var t = e.relatedTarget;
	
			if (!t) {
				this._end(e);
				return;
			}
	
			while (t = t.parentNode) if (t == this.wrapper) return;
			
			this._end(e);
		},
	
		_transitionEnd: function (e) {
			var that = this;
	
			if (e.target != that.scroller) return;
	
			that._unbind('webkitTransitionEnd');
			
			that._startAni();
		},
	
	
		/**
		 *
		 * Utilities
		 *
		 */
		_startAni: function () {
			var that = this,
				startX = that.x, startY = that.y,
				startTime = Date.now(),
				step, easeOut,
				animate;
	
			if (that.animating) return;
			
			if (!that.steps.length) {
				that._resetPos(400);
				return;
			}
			
			step = that.steps.shift();
			
			if (step.x == startX && step.y == startY) step.time = 0;
	
			that.animating = true;
			that.moved = true;
			
			if (that.options.useTransition) {
				that._transitionTime(step.time);
				that._pos(step.x, step.y);
				that.animating = false;
				if (step.time) that._bind('webkitTransitionEnd');
				else that._resetPos(0);
				return;
			}
	
			animate = function () {
				var now = Date.now(),
					newX, newY;
	
				if (now >= startTime + step.time) {
					that._pos(step.x, step.y);
					that.animating = false;
					if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
					that._startAni();
					return;
				}
	
				now = (now - startTime) / step.time - 1;
				easeOut = m.sqrt(1 - now * now);
				newX = (step.x - startX) * easeOut + startX;
				newY = (step.y - startY) * easeOut + startY;
				that._pos(newX, newY);
				if (that.animating) that.aniTime = nextFrame(animate);
			};
	
			animate();
		},
	
		_transitionTime: function (time) {
			time += 'ms';
			this.scroller.style[vendor + 'TransitionDuration'] = time;
			if (this.hScrollbar) this.hScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
			if (this.vScrollbar) this.vScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
		},
	
		_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
			var deceleration = 0.0006,
				speed = m.abs(dist) / time,
				newDist = (speed * speed) / (2 * deceleration),
				newTime = 0, outsideDist = 0;
	
			// Proportinally reduce speed if we are outside of the boundaries 
			if (dist > 0 && newDist > maxDistUpper) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistUpper = maxDistUpper + outsideDist;
				speed = speed * maxDistUpper / newDist;
				newDist = maxDistUpper;
			} else if (dist < 0 && newDist > maxDistLower) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistLower = maxDistLower + outsideDist;
				speed = speed * maxDistLower / newDist;
				newDist = maxDistLower;
			}
	
			newDist = newDist * (dist < 0 ? -1 : 1);
			newTime = speed / deceleration;
	
			return { dist: newDist, time: mround(newTime) };
		},
	
		_offset: function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
				
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			
			if (el != this.wrapper) {
				left *= this.scale;
				top *= this.scale;
			}
	
			return { left: left, top: top };
		},
	
		_snap: function (x, y) {
			var that = this,
				i, l,
				page, time,
				sizeX, sizeY;
	
			// Check page X
			page = that.pagesX.length - 1;
			for (i=0, l=that.pagesX.length; i<l; i++) {
				if (x >= that.pagesX[i]) {
					page = i;
					break;
				}
			}
			if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
			x = that.pagesX[page];
			sizeX = m.abs(x - that.pagesX[that.currPageX]);
			sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
			that.currPageX = page;
	
			// Check page Y
			page = that.pagesY.length-1;
			for (i=0; i<page; i++) {
				if (y >= that.pagesY[i]) {
					page = i;
					break;
				}
			}
			if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
			y = that.pagesY[page];
			sizeY = m.abs(y - that.pagesY[that.currPageY]);
			sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
			that.currPageY = page;
	
			// Snap with constant speed (proportional duration)
			time = mround(m.max(sizeX, sizeY)) || 200;
	
			return { x: x, y: y, time: time };
		},
	
		_bind: function (type, el, bubble) {
			(el || this.scroller).addEventListener(type, this, !!bubble);
		},
	
		_unbind: function (type, el, bubble) {
			(el || this.scroller).removeEventListener(type, this, !!bubble);
		},
	
	
		/**
		 *
		 * Public methods
		 *
		 */
		destroy: function () {
			var that = this;
	
			that.scroller.style[vendor + 'Transform'] = '';
	
			// Remove the scrollbars
			that.hScrollbar = false;
			that.vScrollbar = false;
			that._scrollbar('h');
			that._scrollbar('v');
	
			// Remove the event listeners
			that._unbind(RESIZE_EV, window);
			that._unbind(START_EV);
			that._unbind(MOVE_EV);
			that._unbind(END_EV);
			that._unbind(CANCEL_EV);
			
			if (!that.options.hasTouch) {
				that._unbind('mouseout', that.wrapper);
				that._unbind(WHEEL_EV);
			}
			
			if (that.options.useTransition) that._unbind('webkitTransitionEnd');
			
			if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
			
			if (that.options.onDestroy) that.options.onDestroy.call(that);
		},
	
		refresh: function () {
			var that = this,
				offset,
				i, l,
				els,
				pos = 0,
				page = 0;
	
			if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
			that.wrapperW = that.wrapper.clientWidth || 1;
			that.wrapperH = that.wrapper.clientHeight || 1;
	
			that.minScrollY = -that.options.topOffset || 0;
			that.scrollerW = mround(that.scroller.offsetWidth * that.scale);
			that.scrollerH = mround((that.scroller.offsetHeight + that.minScrollY) * that.scale);
			that.maxScrollX = that.wrapperW - that.scrollerW;
			that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
			that.dirX = 0;
			that.dirY = 0;
	
			if (that.options.onRefresh) that.options.onRefresh.call(that);
	
			that.hScroll = that.options.hScroll && that.maxScrollX < 0;
			that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
	
			that.hScrollbar = that.hScroll && that.options.hScrollbar;
			that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;
	
			offset = that._offset(that.wrapper);
			that.wrapperOffsetLeft = -offset.left;
			that.wrapperOffsetTop = -offset.top;
	
			// Prepare snap
			if (typeof that.options.snap == 'string') {
				that.pagesX = [];
				that.pagesY = [];
				els = that.scroller.querySelectorAll(that.options.snap);
				for (i=0, l=els.length; i<l; i++) {
					pos = that._offset(els[i]);
					pos.left += that.wrapperOffsetLeft;
					pos.top += that.wrapperOffsetTop;
					that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
					that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
				}
			} else if (that.options.snap) {
				that.pagesX = [];
				while (pos >= that.maxScrollX) {
					that.pagesX[page] = pos;
					pos = pos - that.wrapperW;
					page++;
				}
				if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];
	
				pos = 0;
				page = 0;
				that.pagesY = [];
				while (pos >= that.maxScrollY) {
					that.pagesY[page] = pos;
					pos = pos - that.wrapperH;
					page++;
				}
				if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
			}
	
			// Prepare the scrollbars
			that._scrollbar('h');
			that._scrollbar('v');
	
			if (!that.zoomed) {
				that.scroller.style[vendor + 'TransitionDuration'] = '0';
				that._resetPos(200);
			}
		},
	
		scrollTo: function (x, y, time, relative) {
			var that = this,
				step = x,
				i, l;
	
			that.stop();
	
			if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
			
			for (i=0, l=step.length; i<l; i++) {
				if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
				that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
			}
	
			that._startAni();
		},
	
		scrollToElement: function (el, time) {
			var that = this, pos;
			el = el.nodeType ? el : that.scroller.querySelector(el);
			if (!el) return;
	
			pos = that._offset(el);
			pos.left += that.wrapperOffsetLeft;
			pos.top += that.wrapperOffsetTop;
	
			pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
			pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
			time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;
	
			that.scrollTo(pos.left, pos.top, time);
		},
	
		scrollToPage: function (pageX, pageY, time) {
			var that = this, x, y;
			
			time = time === undefined ? 400 : time;
	
			if (that.options.onScrollStart) that.options.onScrollStart.call(that);
	
			if (that.options.snap) {
				pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
				pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;
	
				pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
				pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;
	
				that.currPageX = pageX;
				that.currPageY = pageY;
				x = that.pagesX[pageX];
				y = that.pagesY[pageY];
			} else {
				x = -that.wrapperW * pageX;
				y = -that.wrapperH * pageY;
				if (x < that.maxScrollX) x = that.maxScrollX;
				if (y < that.maxScrollY) y = that.maxScrollY;
			}
	
			that.scrollTo(x, y, time);
		},
	
		disable: function () {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
	
			// If disabled after touchstart we make sure that there are no left over events
			this._unbind(MOVE_EV);
			this._unbind(END_EV);
			this._unbind(CANCEL_EV);
		},
		
		enable: function () {
			this.enabled = true;
		},
		
		stop: function () {
			if (this.options.useTransition) this._unbind('webkitTransitionEnd');
			else cancelFrame(this.aniTime);
			this.steps = [];
			this.moved = false;
			this.animating = false;
		},
		
		zoom: function (x, y, scale, time) {
			var that = this,
				relScale = scale / that.scale;
	
			if (!that.options.useTransform) return;
	
			that.zoomed = true;
			time = time === undefined ? 200 : time;
			x = x - that.wrapperOffsetLeft - that.x;
			y = y - that.wrapperOffsetTop - that.y;
			that.x = x - x * relScale + that.x;
			that.y = y - y * relScale + that.y;
	
			that.scale = scale;
			that.refresh();
	
			that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
			that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
	
			that.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
			that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
			that.zoomed = false;
		},
		
		isReady: function () {
			return !this.moved && !this.zoomed && !this.animating;
		}
	};
	
	if (typeof exports !== 'undefined') exports.iScroll = iScroll;
	else window.iScroll = iScroll;
	
	})();


	$.extend({
		UIScrollers : {},

		UIEnableScrolling : function ( options ) {
			var whichScroller;
			try {
				var scrollpanels = $$('scrollpanel');
				scrollpanels.each(function(item) {
					if (item.hasAttribute('ui-scroller')) {
						whichScroller = item.getAttribute('ui-scroller');
						$.UIScrollers[whichScroller] = new iScroll(item.parentNode, options);
					} else {
						item.setAttribute('ui-scroller', $.UIUuid());
						whichScroller = item.getAttribute('ui-scroller');
						$.UIScrollers[whichScroller] = new iScroll(item.parentNode, options);
					}
				});
			} catch(e) { }
		}
	});
	$(function() {
		$.UIEnableScrolling();
	});
	$.extend({
		UIPaging : function( selector, opts ) {
			var myPager = new iScroll( selector, opts );
			var stack = null;
			if (selector.nodeType === 1) {
				stack = $('stack', selector);
				selector.parentNode.setAttribute('ui-scroller', 'myPager');
			} else {
				stack = $('stack', $(selector));
				selector = $(selector);
				selector.parentNode.setAttribute('ui-scroller', 'myPager');
			}
			var indicatorsWidth = selector.parentNode.css('width');
			var indicators = '<stack ui-implements="indicators" style="width:"' + indicatorsWidth + ';">';
			[].slice.apply(stack.children).each(function(kid, idx) {
				if (idx === 0) {
					indicators += '<indicator class="active"></indicator>';
				} else {
					indicators += "<indicator></indicator>";
				}
			});
			indicators += "</stack>";
			// The maximum number of indicators in portrait view is 17.
			selector.parentNode.insert(indicators);
		},
	 	UISetupPaging : function() {
			if ($("stack[ui-implements=paging]")) {
				$.UIPaging("stack[ui-implements=paging]", {
					snap: true,
					momentum: false,
					hScrollbar: false,
					onScrollEnd: function () {
						$('stack[ui-implements="indicators"] > indicator.active').removeClass('active');
						$('stack[ui-implements="indicators"] > indicator:nth-child(' + (this.currPageX+1) + ')').addClass('active');
					}
				});
			}
		}
	});
	$(function() {
		$.UISetupPaging();
	});

	$.extend({
		UIDeletableTableCells : [],
		UIDeleteTableCell : function( options ) {
			/* options = {
				selector: selector,
				editButton: [label1, label2],
				deleteButton: label3,
				toolbar: toolbar,
				callback: callback
			} */
			var label1;
			if (options.editButton) {
				label1 = options.editButton[0];
			} else {
				label1 = 'Edit';
			}
			var label2;
			if (options.editButton) {
				label2 = options.editButton[1];
			} else {
				label2 = 'Done';
			}
			var label3;
			if (options.deleteButton) {
				label3 = options.deleteButton;
			} else {
				label3 = 'Delete';
			}
			var callback = options.callback || function() {};
			this.deletionList = [];
			var listEl = $(options.selector);
			var toolbarEl = $(options.toolbar);
			if ((toolbarEl.first().nodeName) === 'UIBUTTON') {
				toolbarEl.first().setAttribute('ui-contains','uibutton');
			}
			var deleteButtonTemp = '<uibutton ui-kind="deletionListDeleteButton" ui-bar-align="left" ui-implements="delete" class="disabled" style="display: none;"><label>' + label3 + '</label></uibutton>';
			var editButtonTemp = '<uibutton ui-kind="deletionListEditButton" ui-bar-align="right"  ui-implements="edit" ui-button-labels="' + label1 + ',' + label2 +  '"><label>' + label1 + '</label></uibutton>';
			toolbarEl.prepend(deleteButtonTemp);
			toolbarEl.append(editButtonTemp);
			var deleteDisclosure = '<deletedisclosure><span>&#x2713</span></deletedisclosure>';
			$$(options.selector + " > tablecell").each(function(item) {
				item.insertAdjacentHTML("afterBegin", deleteDisclosure);
			});
	
			listEl.setAttribute('data-deletable-items', 0);
			var UIEditExecution = function() {
			   $(options.toolbar + ' > uibutton[ui-implements=edit]').bind($.userAction, function() {
			   	   var buttonLabels = this.getAttribute('ui-button-labels');
				   if ($('label', this).text() === label1) {
					   this.UIToggleButtonLabel(label1, label2);
					   this.setAttribute('ui-implements', 'done');
					   listEl.addClass('ui-show-delete-disclosures');
					   
					   this.parentNode.firstElementChild.style.display = '-webkit-inline-box';
					   if (/uibutton/i.test(toolbarEl.children[1].nodeName)) {
						   toolbarEl.children[1].css('display', 'none;');
					   }
					   $$('tablecell > img', listEl).each(function(img) {
						img.css('-webkit-transform: translate3d(40px, 0, 0)');
					   });
				   } else {
					   this.UIToggleButtonLabel(label1, label2);
					   this.removeAttribute('ui-implements');
					   this.parentNode.firstElementChild.style.display = 'none';
					   listEl.removeClass('ui-show-delete-disclosures');
					   $$('deletedisclosure').each(function(disclosure) {
						   disclosure.removeClass('checked');
						   disclosure.ancestor('tablecell').removeClass('deletable');
					   });
					   if (/uibutton/i.test(toolbarEl.children[1].nodeName)) {
						   toolbarEl.children[1].css('display', '-webkit-inline-box');
					   }
					   $('uibutton[ui-implements=delete]').addClass('disabled');
			   
					   $$('tablecell > img', listEl).each(function(img) {
						img.css('-webkit-transform: translate3d(0, 0, 0)');
					   });
				   }
			   });
			};
			var UIDeleteDisclosureSelection = function() {
				$$('deletedisclosure').each(function(disclosure) {
					disclosure.bind($.userAction, function() {
						disclosure.toggleClass('checked');
						disclosure.ancestor('tablecell').toggleClass('deletable');
						$('uibutton[ui-implements=delete]').removeClass('disabled');
						if (!disclosure.ancestor('tablecell').hasClass('deletable')) {
							listEl.setAttribute('data-deletable-items', parseInt(listEl.data('deletable-items'), 10) - 1);
							if (parseInt(listEl.data('deletable-items'), 10) === 0) {
								toolbarEl.firstElementChild.addClass('disabled');
							}
						} else {
							listEl.data('deletable-items', parseInt(listEl.data('deletable-items'), 10) + 1);
						}
					}); 
				});
			};
	
			var UIDeletionExecution = function() {
			   $('uibutton[ui-implements=delete]').bind($.userAction, function() {
				   if (this.hasClass('disabled')) {
					   return;
				   }
				   $$('.deletable').each(function(item) {
					   listEl.data('deletable-items', parseInt(listEl.data('deletable-items'), 10) - 1);
					   $.UIDeletableTableCells.push(item.id);
					   if (!!callback) {
						   callback.call(this, item);
					   }
					   item.remove();
					   $.UIDeletableTableCells = [];
					   listEl.setAttribute('data-deletable-items', 0);
				   });
				   this.addClass('disabled');
				$.UIScrollers[$('scrollpanel', $(options.selector).ancestor('view')).getAttribute('ui-scroller')].refresh();
			   });
			};
			UIEditExecution();
			UIDeleteDisclosureSelection();
			UIDeletionExecution();
		},
		
		UIResetDeletionList : function(node, toolbar) {
			node = $(node);
			toolbar = $(toolbar);
			if (node.hasClass('ui-show-delete-disclosures')) {
				node.setAttribute('data-deletable-items', 0);
				$.slice.apply(node.children).forEach(function(item) {
					item.firstElementChild.removeClass('checked');
				});
				node.removeClass('ui-show-delete-disclosures');
				var resetLabel = toolbar.find('uibutton[ui-kind=deletionListEditButton]').getAttribute('ui-button-labels');
				resetLabel = resetLabel.split(',');
				resetLabel = resetLabel[0];
				toolbar.find('uibutton[ui-kind=deletionListEditButton] > label').text(resetLabel);
				toolbar.find('uibutton[ui-kind=deletionListEditButton]').setAttribute('ui-implements', 'edit');
				toolbar.find('uibutton[ui-kind=deletionListDeleteButton]').css('display', 'none');
				toolbar.find('uibutton[ui-kind=deletionListDeleteButton]').toggleClass('disabled');
			}
			node.findAll('tablecell').forEach(function(cell) {
				cell.removeClass('deletable');
			});
		}		
	});

	$.extend({
		/*
			option values:
			selector:
			name: 
			range: {start:, end:, values: }
			step:
			defaultValue:
			buttonClass:
			indicator:
		*/
		UISpinner : function (opts) {
			var spinner = $(opts.selector);
			var defaultValue = null;
			var range = null;
			var step = opts.step;
			if (opts.range.start >= 0) {
				var rangeStart = opts.range.start || "";
				var rangeEnd = opts.range.end || "";
				var tempNum = rangeEnd - rangeStart;
				tempNum++;
				range = [];
				if (step) {
					var mod = ((rangeEnd-rangeStart)/step);
					if (opts.range.start === 0) {
						range.push(0);
					} else {
						range.push(rangeStart);
					}
					for (var i = 1; i < mod; i++) {
						range.push(range[i-1] + step);
					}
					range.push(range[range.length-1] + step);
				} else {
					for (var j = 0; j < tempNum; j++) {
						range.push(rangeStart + j);				
					}
				}
			}
			var icon = (opts.indicator === "plus") ? "<icon class='indicator'></icon>" : "<icon></icon>";
			var buttonClass = opts.buttonClass ? " class='" + opts.buttonClass + "' " : "";
			var decreaseButton = "<uibutton " + buttonClass + "ui-implements='icon'>" + icon + "</uibutton>";
			var increaseButton = "<uibutton " + buttonClass + "ui-implements='icon'>" + icon + "</uibutton>";
			var spinnerTemp = decreaseButton + "<label ui-kind='spinner-label'></label><input type='text'/>" + increaseButton;
			spinner.insert(spinnerTemp);
			if (opts.range.values) {
				spinner.data('range-value', opts.range.values.join(','));
			}
			if (!opts.defaultValue) {
				if (!!opts.range.start || opts.range.start === 0) {
					defaultValue = opts.range.start === 0 ? '0': opts.range.start;
				} else if (opts.range.values instanceof Array) {
					defaultValue = opts.range.values[0];
					$('uibutton:first-of-type', opts.selector).addClass('disabled');
				}
			} else {
				defaultValue = opts.defaultValue;
			}
			if (range) {
				spinner.data('range-value', range.join(','));
			}
	
			$('label[ui-kind=spinner-label]', spinner).text(defaultValue);
			$('input', spinner).value = defaultValue;
			if (opts.namePrefix) {
				var namePrefix = opts.namePrefix + '.' + spinner.id;
				$('input', spinner).setAttribute('name', namePrefix);
			} else {
				$('input', spinner).setAttribute('name', spinner.id);
			}
	
			if (defaultValue === opts.range.start) {
				$('uibutton:first-of-type', spinner).addClass('disabled');
			}
			if (defaultValue == opts.range.end) {
				$('uibutton:last-of-type', spinner).addClass('disabled');
			}
			$('uibutton:first-of-type', opts.selector).bind($.userAction, function(button) {
				$.decreaseSpinnerValue.call(this, opts.selector);
			});
			$('uibutton:last-of-type', opts.selector).bind($.userAction, function(button) {
				$.increaseSpinnerValue.call(this, opts.selector);
			});
		},

		decreaseSpinnerValue : function(selector) {
			var values = $(selector).data('range-value');
			values = values.split(',');
			var defaultValue = $('label', selector).text().trim();
			var idx = values.indexOf(defaultValue);
			if (idx !== -1) {
				$('uibutton:last-of-type', selector).removeClass('disabled');
				$('[ui-kind=spinner-label]', selector).text(values[idx-1]);
				$('input', selector).value = values[idx-1];
				if (idx === 1) {
					this.addClass('disabled');
				} 
			}	
		},

		increaseSpinnerValue : function(selector) {
			var values = $(selector).data('range-value');
			values = values.split(',');
			var defaultValue = $('label', selector).text().trim();
			var idx = values.indexOf(defaultValue);
			if (idx !== -1) {
				$('uibutton:first-of-type', selector).removeClass('disabled');
				$('label[ui-kind=spinner-label]', selector).text(values[idx+1]);
				$('input', selector).value = values[idx+1];
				if (idx === values.length-2) {
					this.addClass('disabled');
				}
			}
		},
	
		resetSpinner : function(selector) {
			var value = $(selector).data('range-value');
			value = value.split(',')[0];
			$(selector).find('label').text(value);
			$(selector).find('uibutton:first-of-type').addClass('disabled');
			$(selector).find('uibutton:last-of-type').removeClass('disabled');
			
		}
	});
	$(function() {
		$.extend($, {
			UIPopUpIsActive : null,
			UIPopUpIdentifier : null,

			UIPopUp : function( opts ) {
				var id = opts.id || $.UIUuid();
				var title = opts.title || 'Alert!';
				var message = opts.message || '';
				var cancelUIButton = opts.cancelUIButton || 'Cancel';
				var continueUIButton = opts.continueUIButton || 'Continue';
				var callback = opts.callback || function() {};
				var popup = '<popup id=' + id + ' ui-visible-state="hidden">\
					<panel>\
						<toolbar ui-placement="top">\
							<h1>' + title + '</h1>\
						</toolbar>\
						<p>' + message + '</p>\
						<toolbar ui-placement="bottom">\
							<uibutton ui-kind="action" ui-implements="cancel">\
								<label>' + cancelUIButton + '</label>\
							</uibutton>\
							<uibutton ui-kind="action" ui-implements="continue">\
								<label>' + continueUIButton + '</label>\
							</uibutton>\
						</toolbar>\
					</panel>\
				</popup>';
				$('app').append(popup);
				var popupID = '#' + id;
				$(popupID).UIBlock('0.5');
				var popupBtn = '#' + id + ' uibutton';
				$$(popupBtn).each(function(button) {
					button.bind($.userAction, cancelClickPopup = function(e) {
						if (button.getAttribute('ui-implements')==='continue') {
							callback.call(callback, this);
						}
						e.preventDefault();
						$.UIClosePopup('#' + id);
					});
					$.UIPopUpIsActive = false;
					$.UIPopUpIdentifier = null;
					button.bind('touchend', cancelTouchPopup = function(e) {		
					if (button.getAttribute('ui-implements')==='continue') {
							callback.call(callback, this);
						}
						e.preventDefault();
						$.UIClosePopup('#' + id);
					}); 
					$.UIPopUpIsActive = false;
					$.UIPopUpIdentifier = null;
				});
			}
		});
	});

	$.extend({
		UIPopUpIsActive : false,
		UIPopUpIdentifier : null,
		UIShowPopUp : function( options ) {
			$.UIPopUp(options);
			$.UIPopUpIsActive = true;
			$.UIPopUpIdentifier = '#' + options.id;
			var screenCover = $('mask');
			screenCover.bind('touchmove', function(e) {
				e.preventDefault();
			});
			$.UIPositionPopUp('#' + options.id);
			screenCover.setAttribute('ui-visible-state', 'visible');
			$('#' + options.id).setAttribute('ui-visible-state', 'visible');
		},
		UIPositionPopUp : function(selector) {
			$.UIPopUpIsActive = true;
			$.UIPopUpIdentifier = selector;
			var popup = $(selector);
			var str = 'top:';
			str += ((window.innerHeight /2) + window.pageYOffset) - (popup.clientHeight /2) + 'px;';
			popup.css(str);
			str = 'left:';
			str += (window.innerWidth / 2) - (popup.clientWidth / 2) + 'px';
			popup.css(str); 
		},
		UIRepositionPopupOnOrientationChange : function ( ) {
			$.body.bind('orientationchange', function() {
				if (window.orientation === 90 || window.orientation === -90) {
					if ($.UIPopUpIsActive) {
						$.UIPositionPopUp($.UIPopUpIdentifier);
					}
				} else {
					if ($.UIPopUpIsActive) {
						$.UIPositionPopUp($.UIPopUpIdentifier);
					}
				}
			});
			window.addEventListener('resize', function() {
				if ($.UIPopUpIsActive) {
					$.UIPositionPopUp($.UIPopUpIdentifier);
				}
			}, false);	
		},
		UIClosePopup : function ( selector ) {
			$(selector + ' uibutton[ui-implements=cancel]').UIRemovePopupBtnEvents($.userAction, 'cancelClickPopup');
				$(selector + ' uibutton[ui-implements=continue]').UIRemovePopupBtnEvents($.userAction, 'cancelTouchPopup');
			$(selector).UIUnblock();
			$(selector).remove();
			$.UIPopUpIdentifier = null;
			$.UIPopUpIsActive = false;
		}
	});
	$.extend(HTMLElement.prototype, {
		UIRemovePopupBtnEvents : function(eventType, eventName) {
			this.removeEventListener(eventType, eventName, false);
		}
	});
	$(function() {
		$.UIRepositionPopupOnOrientationChange();
	});

	$.extend(HTMLElement.prototype, {
		UISelectionList : function ( callback ) {
			var listitems = $.slice.apply(this.children);
			listitems.each(function(item) {
				if (item.nodeName.toLowerCase() === 'tablecell') {
					var checkmark = '<checkmark>&#x2713</checkmark>';
					item.insert(checkmark);
					item.bind($.userAction, function() {
						var $this = this;
						setTimeout(function() {
							if ($.UIScrollingActive) return;
							listitems.each(function(check) {
								check.removeClass('selected');
								check.removeClass('touched');
							});
							$this.addClass('selected');
							$this.UIHandleTouchState();
							$this.find('input').checked = true; 
							if (callback) {
								callback.call(callback, $this.find('input'));
							}
						},100);
					});
				}
			});
		}
	});

	$.extend(HTMLElement.prototype, {
		UICreateSwitchControl : function( opts ) {
			/*
				{
					id : "anID",
					namePrefix : "customer",
					customClass : "specials",
					status : "on",
					kind : "traditional",
					labelValue : ["on","off"],
					value : "$1000",
					callback : function() {console.log('This is great!');},	
				}
			*/
			var id = opts.id;
			var namePrefix = '';
			if (opts.namePrefix) {
				namePrefix = "name='" + opts.namePrefix + "." + opts.id + "'";
			} else {
				namePrefix = "name='" + id + "'";
			}
			var customClass = " ";
			customClass += opts.customClass ? opts.customClass : "";
			var status = opts.status || "off";
			var kind = opts.kind ? " ui-kind='" + opts.kind + "'" : "";
			var label1 = "ON";
			var label2 = "OFF";
			if (opts.kind === "traditional") {
				if (!!opts.labelValue) {
					label1 = opts.labelValue[0];
					label2 = opts.labelValue[1];
				}
			}
			var value = opts.value || "";
			var callback = opts.callback || function() { return false; };
			var label = (opts.kind === "traditional") ? '<label ui-implements="on">'+ label1 + '</label><thumb></thumb><label ui-implements="off">' + label2 + '</label>' : "<thumb></thumb>";
			var uiswitch = '<switchcontrol ' + kind + ' class="' + status + " " + customClass + '" id="' + id + '"' + '>' + label + '<input type="checkbox" ' + namePrefix + ' style="display: none;" value="' + value + '"></switchcontrol>';
			if (this.css("position")  !== "absolute") {
				this.css("position: relative;");
			}
			this.insert(uiswitch);
			var newSwitchID = '#' + id;
			$(newSwitchID).find('input').checked = status === 'on' ? true : false;
			$(newSwitchID).bind($.userAction, function() {
				this.UISwitchControl(callback(this));
				this.UIHandleTouchState(400);
			});
		}
	}); 

	$.extend(HTMLElement.prototype, {
		UISwitchControl : function (callback) {
			callback = callback || function() { return false; };
			if (this.nodeName.toLowerCase()==='switchcontrol') {
				callback.call(this);
				if (this.hasClass('off')) {
					this.toggleClass('on', 'off');
					this.find('input').checked = true;
					this.querySelector('thumb').focus();
				} else {
					this.toggleClass('on', 'off');
					this.find('input').checked = false;
				}
			} else {
				return;
			}
		}
	});

	$.extend(HTMLElement.prototype, {
		UIInitSwitchToggling : function() {
			$$('switchcontrol', this).each(function(item) {
				if (item.hasClass('on')) {
					item.checked = true;
					item.find("input[type='checkbox']").checked = true;
				} else {
					item.checked = false;
					item.find("input[type='checkbox']").checked = false;
				}
				item.bind($.userAction, function(e) {
					this.UIHandleTouchState(400);
					this.parentNode.style.backgroundImage = 'none';
					e.preventDefault();
					item.UISwitchControl();
				});
			});
		}
	});
	$(function() {
		$.app.UIInitSwitchToggling();
	});

	$.extend(HTMLElement.prototype, {
		UICreateSegmentedControl : function(opts, position) {
			position = position || null;
			var segmentedControl = "<segmentedcontrol";
			if (opts.id) {
				segmentedControl += " id='" + opts.id + "'";
			}
			if (opts.placement) {
				segmentedControl += " ui-bar-align='" + opts.placement + "'";
			}
			if (opts.selectedSegment) {
				segmentedControl += " ui-selected-index='" + opts.selectedSegment + "'";
			} else {
				segmentedControl += " ui-selected-index=''";
			}
			if (opts.container) {
				segmentedControl += " ui-segmented-container='#" + opts.container + "'";
			}
			var segClass = opts.cssClass || "";
			segmentedControl += ">";
			if (opts.numberOfSegments) {
				segments = opts.numberOfSegments;
				var count = 1;
				for (var i = 0; i < segments; i++) {
					segmentedControl += "<uibutton";
					segmentedControl += " id='" + $.UIUuid() + "'";
					segmentedControl += " class='" + segClass[count-1];
					if (opts.selectedSegment) {
						if (opts.selectedSegment === i) {
							segmentedControl += " selected'";
						}
					}
					if (opts.disabledSegment) {
						if (opts.disabledSegment === i) {
							segmentedControl += " disabled'";
						}
					}
					segmentedControl += "'";
			
					segmentedControl += " ui-kind='segmented'";
					if (opts.placementOfIcons) {
						segmentedControl += " ui-icon-alignment='" + opts.placementOfIcons[count-1] + "'";
					}
					segmentedControl += ">";
					if (opts.iconsOfSegments) {
						if (!!opts.iconsOfSegments[i]) {
						segmentedControl += "<icon ui-implements='icon-mask' style='-webkit-mask-box-image: url(icons/" + opts.iconsOfSegments[count-1] +"." + opts.fileExtension[count-1] + ")'  ui-implements='icon-mask'></icon>";
						}
					}
					if (opts.titlesOfSegments) {
						segmentedControl += "<label>" + opts.titlesOfSegments[count-1] + "</label>";
					}
					segmentedControl += "</uibutton>";
					count++;
				}
				segmentedControl += "</segmentedcontrol>";
				if (position) {
					this.insert(segmentedControl, position);
				} else {
					this.insert(segmentedControl);
				}
				$("#" + opts.id).UISegmentedControl();
			}
		}
	});

	$.extend(HTMLElement.prototype, {
		UISegmentedControl : function( container, callback ) {
			var that = this;
			var val = null;
			callback = callback || function(){};
			var buttons = $.slice.apply(this.children);
			var kids = $.slice.apply(this.children);
			if (!this.hasAttribute('ui-selected-segment')) {
				this.setAttribute('ui-selected-segment', '');
			}
			if (this.getAttribute('ui-selected-index')) {
				val = this.getAttribute('ui-selected-index');
				var seg = this.children[val];
				try {
					seg = seg.getAttribute('id');
					this.setAttribute('ui-selected-segment', seg);
					this.children[val].addClass('selected');
				} catch(e) {}
			} else {
				var checkChildNodesForAttr = -1;
				for (var i = 0, len = this.children.length; i < len; i++) {
					if (this.children[i].hasClass('selected')) {
						this.setAttribute('ui-selected-index', i);
					} else {
						checkChildNodesForAttr++;
					}
				} 
				if (checkChildNodesForAttr === this.children.length-1) {
					this.setAttribute('ui-selected-index', 0);
					this.firstElementChild.addClass('selected');
				}
			}
			if (container) {
				container = $(container);
				if (val) { 
					container.setAttribute('ui-selected-index', val);
				} else {
					container.setAttribute('ui-selected-index', 0);
				}
				var containerChildren = $.slice.apply(container.children);
				containerChildren.forEach(function(child) {
					child.css('display','none');
				});
				containerChildren[val].css('display','block');
				that.setAttribute('ui-segmented-container', ('#' + container.id));
				var selectedIndex = this.getAttribute('ui-selected-index');
				var whichScroller = container.ancestor('scrollpanel').getAttribute('ui-scroller');
				$.UIScrollers[whichScroller].refresh();
				
			}
	
			buttons.each(function(button) {
				if (!button.hasAttribute('id')) {
					button.setAttribute('id', $.UIUuid());
				}
				if (!that.getAttribute('ui-selected-segment')) {
					if (button.hasClass('selected')) {
						that.setAttribute('ui-selected-segment', button.getAttribute('id'));
					}
				}
				button.bind($.userAction, function() {
					if (button.hasClass('disabled')) return false;
					var selectedSegment = that.getAttribute('ui-selected-segment');
					var selectedIndex = that.getAttribute('ui-selected-index');
					var childPosition = null;
					var container = null;
					var ancestor = this.ancestor('segmentedcontrol');
					if (ancestor.hasAttribute('ui-segmented-container')) {
						container = ancestor.getAttribute('ui-segmented-container');
					}
					var oldSelection = null;
					if (ancestor.hasAttribute('ui-selected-index')) {
						oldSelection = ancestor.getAttribute('ui-selected-index');
					}
					var uisi = null;
					if (!selectedSegment) {
						uisi = this.getAttribute('ui-child-position');
						that.setAttribute('ui-selected-index', uisi);
						that.setAttribute('ui-selected-segment', this.getAttribute('id'));
						this.addClass('selected');
						childPosition = this.getAttribute('ui-child-position');
						container.children[val].css('display: none;');
						container.children[childPosition].css('display: none;');
					} 
					if (selectedSegment) {
						uisi = this.getAttribute('ui-child-position');
						that.setAttribute('ui-selected-index', uisi);
						var oldSelectedSegment = $(('#' + selectedSegment));
						oldSelectedSegment.removeClass('selected');
						that.setAttribute('ui-selected-segment', this.getAttribute('id'));
						this.addClass('selected');
						childPosition = this.getAttribute('ui-child-position');
						if (that.getAttribute('ui-segmented-container')) {
							container = $(that.getAttribute('ui-segmented-container'));
							container.children[oldSelection].css('display: none;');
							container.children[uisi].css('display: -webkit-box;');
							container.children[oldSelectedSegment.getAttribute('ui-child-position')].css('{display','none}');
							var scrollpanel = container.ancestor('scrollpanel');
							whichScroller = scrollpanel.getAttribute('ui-scroller');
							$.UIScrollers[whichScroller].refresh();
						}
					}
					this.addClass('selected');
						callback.call(callback, button);
				});
			});
			this.UIIdentifyChildNodes();
		}
	});

	$(function() {	 
		$$('segmentedcontrol').each(function(segmentedcontrol) {
			if (segmentedcontrol.getAttribute('ui-implements') !== 'segmented-paging') {
				segmentedcontrol.UISegmentedControl();
				var scroller = segmentedcontrol.ancestor('scrollpanel').getAttribute('ui-scroller');
				$.UIScrollers[scroller].destroy();
				$.UIScrollers[scroller] = new iScroll(segmentedcontrol.ancestor('scrollpanel').parentNode); 
			}
		});
	});

	$.extend(HTMLElement.prototype, {
		UISegmentedPagingControl : function ( ) {
			var segmentedPager = $('segmentedcontrol[ui-implements=segmented-paging]');
			var pagingOrientation = segmentedPager.getAttribute('ui-paging');
			segmentedPager.setAttribute('ui-paged-subview', 0);
			segmentedPager.first().addClass('disabled');
			var subviews = $$('subview', this);
			segmentedPager.setAttribute('ui-pagable-subviews', subviews.length);
			var childPosition = 0;
			subviews.each(function(item) {
				item.setAttribute('ui-navigation-status', 'upcoming');
				item.setAttribute('ui-child-position', childPosition);
				childPosition++;
				item.setAttribute('ui-paging-orient', pagingOrientation);
			});
			subviews[0].setAttribute('ui-navigation-status', 'current');
			segmentedPager.delegate('uibutton', $.userAction, function(button) {
				var pager = button.ancestor('segmentedcontrol');
				if (button.isSameNode(button.parentNode.firstElementChild)) {
					if (pager.getAttribute('ui-paged-subview') === 1) {
						button.addClass('disabled');
						pager.setAttribute('ui-paged-subview', 0);
						subviews[0].setAttribute('ui-navigation-status', 'current');
						subviews[1].setAttribute('ui-navigation-status', 'upcoming');
					} else {
						subviews[pager.getAttribute('ui-paged-subview') - 1 ].setAttribute( 'ui-navigation-status', 'current');
						subviews[pager.getAttribute('ui-paged-subview')].setAttribute('ui-navigation-status', 'upcoming');
						pager.setAttribute('ui-paged-subview', pager.getAttribute('ui-paged-subview')-1);
						button.next().removeClass('disabled');
						if (pager.getAttribute('ui-paged-subview') <= 0) {
							button.addClass('disabled');
						}
					}
				} else {
					var pagableSubviews = pager.getAttribute('ui-pagable-subviews');
					var pagedSubview = pager.getAttribute('ui-paged-subview');
					if (pager.getAttribute('ui-paged-subview') == pagableSubviews-1) {
						button.addClass('disabled');
					} else {
						button.previous().removeClass('disabled');
						subviews[pagedSubview].setAttribute('ui-navigation-status', 'traversed');
						subviews[++pagedSubview].setAttribute('ui-navigation-status', 'current');
						pager.setAttribute('ui-paged-subview', (pagedSubview));
						if (pager.getAttribute('ui-paged-subview') == pagableSubviews-1) {
							button.addClass('disabled');
						}
					}
				}
			});
		}
	});

	$.extend(HTMLElement.prototype, {
		UICreateTabBar : function ( opts ) {
			var id = opts.id || $.UIUuid();
			var imagePath = opts.imagePath || 'icons\/';
			var numberOfTabs = opts.numberOfTabs || 1;
			var tabLabels = opts.tabLabels;
			var iconsOfTabs = opts.iconsOfTabs;
			var selectedTab = opts.selectedTab || 0;
			var disabledTab = opts.disabledTab || null;
			var tabbar = "<tabbar ui-selected-tab='" + selectedTab + "'>";
			this.setAttribute("ui-tabbar-id", id);
			for (var i = 0; i < numberOfTabs; i++) {
				tabbar += "<uibutton ui-implements='tab' ";
				if (i === selectedTab || i === disabledTab) {
					tabbar += "class='";
					if (i === selectedTab) {
						tabbar += "selected";
					}
					if (i === disabledTab) {
						tabbar += "disabled";
					}
					tabbar += "'";
				}
				tabbar += "><icon style='-webkit-mask-box-image: url(" + imagePath;
				tabbar += iconsOfTabs[i] + ".svg);'></icon>";
				tabbar += "<label>" + tabLabels[i] + "</label></uibutton>";
			}
			tabbar += "</tabbar>";
			this.insert(tabbar);
			var subviews = $$("subview", this);
			subviews[selectedTab].addClass("selected");
			this.UITabBar();
		},

		UITabBar : function ( ) {
			var tabs = $$('tabbar > uibutton[ui-implements=tab]', this);
			$('tabbar', this).UIIdentifyChildNodes();
			var tabbar = $('tabbar', this);
			var subviews = $$('subview', this);
			subviews.each(function(subview) {
				subview.addClass('unselected');
			});
			var selectedTab = tabbar.getAttribute('ui-selected-tab') || 0;
			subviews[selectedTab].toggleClass('unselected','selected');
			tabs[selectedTab].addClass('selected');
			tabs.each(function(tab) {
				tab.bind($.userAction, function() {
					if (tab.hasClass('disabled') || tab.hasClass('selected')) {
						return;
					}
					var whichTab = tab.ancestor('tabbar').getAttribute('ui-selected-tab');
					tabs[whichTab].removeClass('selected');
					tab.addClass('selected');
					subviews[whichTab].removeClass('selected');
					subviews[whichTab].addClass('unselected');
					subviews[tab.getAttribute('ui-child-position')].addClass('selected');
					subviews[tab.getAttribute('ui-child-position')].removeClass('unselected');
					tabbar.setAttribute('ui-selected-tab', tab.getAttribute('ui-child-position'));
				});
			});
		},

		UITabBarForViews : function ( ) {
			var tabs = $$('tabbar > uibutton[ui-implements=tab]', this);
			$('tabbar', this).UIIdentifyChildNodes();
			var tabbar = $('tabbar', this);
			var views = $$('view[ui-implements=tabbar-panel]', this);
			views.each(function(subview) {
				subview.setAttribute('ui-navigation-status','upcoming');
			});
			var selectedTab = tabbar.getAttribute('ui-selected-tab') || 0;
			views[selectedTab].setAttribute('ui-navigation-status','current');
			tabs[selectedTab].addClass('selected');
			tabs.each(function(tab) {
				tab.bind($.userAction, function() {
					if (tab.hasClass('disabled') || tab.hasClass('selected')) {
						return;
					}
					var whichTab = tab.ancestor('tabbar').getAttribute('ui-selected-tab');
					tabs[whichTab].removeClass('selected');
					tab.addClass('selected');
					views[whichTab].setAttribute('ui-navigation-status', 'upcoming');
					views[tab.getAttribute('ui-child-position')].setAttribute('ui-navigation-status', 'current');
					tabbar.setAttribute('ui-selected-tab', tab.getAttribute('ui-child-position'));
				});
			});
		}
	});

	$.extend(HTMLElement.prototype, {
		UIActionSheet : function(opts) {
			var that = this;
			var actionSheetID = opts.id;
			var actionSheetColor = 'undefined';
			var actionSheetUuid = $.UIUuid();
			if (!!opts.color) {
				actionSheetColor = opts.color;
			}
			var title = '';
			if (opts.title) {
				title = '<p>' + opts.title + '</p>';
			}
			var createActionSheet = function() {
				var actionSheetStr = "<actionsheet id='" + actionSheetID + "' class='hidden' ui-contains='action-buttons'";
				if (actionSheetColor) {
					actionSheetStr += " ui-action-sheet-color='" + actionSheetColor + "'";
				}
				actionSheetStr += "><scrollpanel ui-scroller='" + actionSheetUuid + "'><panel>";
				actionSheetStr += title;
				var uiButtons = "", uiButtonObj, uiButtonImplements, uiButtonTitle, uiButtonCallback;
				if (!!opts.uiButtons) {
					opts.uiButtons.each(function(button, idx) {
						uiButtons += "<uibutton ui-kind='action' ";
						uiButtonTitle = button.title;
						uiButtonImplements = button.uiButtonImplements || "";
						uiButtonCallback = button.callback;
						actionSheetID.trim();
						actionSheetID.capitalize();
						uiButtons += ' ui-implements="' + uiButtonImplements + '" class="stretch" onclick="' + uiButtonCallback + '(\'#' + actionSheetID + '\')"><label>';
						uiButtons += uiButtonTitle;
						uiButtons +=	"</label></uibutton>"	;			
					});
				}
				actionSheetStr += uiButtons + "<uibutton ui-kind='action' ui-implements='cancel' class='stretch' onclick='$.UIHideActionSheet(\"#" + actionSheetID + "\")'><label>Cancel</label></uibutton></panel></scrollpanel></actionsheet>";
				var actionSheet = $.make(actionSheetStr);
				that.insert(actionSheet, "last");
				var scrollpanel = $('#'+actionSheetID);
				$.UIScrollers[actionSheetUuid] = new iScroll(scrollpanel);
			};
			createActionSheet();
			var actionSheetUIButtons = "#" + actionSheetID + " uibutton";
			$$(actionSheetUIButtons).each(function(button) {
				button.bind("click", function() {
					$.UIHideActionSheet();
				});
			});
		}
	});
	$.extend({

		UIShowActionSheet : function(actionSheetID) {
			$.app.data('ui-action-sheet-id', actionSheetID);
			$(actionSheetID).UIBlock();
			var screenCover = $('mask');
			screenCover.css('width: ' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px; opacity: .5;');
			screenCover.setAttribute('ui-visible-state', 'visible');
			$(actionSheetID).removeClass('hidden');
			screenCover.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false );
			var scroller = $(actionSheetID).find('scrollpanel').getAttribute('ui-scroller');
			$.UIScrollers[scroller].refresh();
		},
		UIHideActionSheet : function() {
			var actionSheet = $.app.data('ui-action-sheet-id');
			try{ 
				$(actionSheet).addClass('hidden');
				$(actionSheet).UIUnblock();
			 } catch(e) {}
			$.app.removeData('ui-action-sheet-id');
		},
		UIReadjustActionSheet : function() {
			var actionSheetID = '';
			if ($.app.data('ui-action-sheet-id')) {
				actionSheetID = $.app.data('ui-action-sheet-id');
				$(actionSheetID).css('right: 0; bottom: 0; left: 0;');
				if ($.iphone || $.ipod) {
					if ($.standalone) {
						$(actionSheetID).css('right: 0; bottom: 0px; left: 0;');
					} else {
						if (window.innerWidth > window.innerHeight) {
						$(actionSheetID).css('right: 0; bottom: 0; left: 0; -webkit-transform: translate3d(0,70px,0);');
						} else {
							$(actionSheetID).css('right: 0; bottom: 0; left: 0; -webkit-transform: translate3d(0,0,0);');
						}
					}
				} else {
					$(actionSheetID).css('right: 0; bottom: 0; left: 0;');
				}
			}
			$.UIPositionMask();
		}
	});
	document.addEventListener('orientationchange', function() {
		$.UIReadjustActionSheet();
	}, false);

	$.extend(HTMLElement.prototype, {
		UIExpander : function ( opts ) {
			opts = opts || {};
			var status = opts.status || 'expanded';
			var title = opts.title || 'Open';
			var altTitle = opts.altTitle || 'Close';
			var expander = this;
			var panel = $('panel', this);
			var header = '<header><label></label></header>';
			this.insert(header, 'first');
			panel.setAttribute('ui-height', parseInt(panel.css('height'), 10));
			if (status === 'expanded') {
				expander.toggleClass('ui-status-expanded', 'ui-status-collapsed');
				$('label', this).text(altTitle);
				panel.style.height = panel.getAttribute('ui-height') + 'px';
				panel.css('opacity: 1;');
			} else {
				$('label', this).text(title);
				panel.css('height: 0px; opacity: 0;');
				expander.toggleClass('ui-status-collapsed', 'ui-status-expanded');
			}
			$('header', expander).bind($.userAction, function() {
				if (panel.style.height === '0px') {
					panel.style.height = panel.getAttribute('ui-height') + 'px';
					panel.style.opacity = 1;
					$('label', this).text(altTitle);
					expander.toggleClass('ui-status-collapsed', 'ui-status-expanded');
			
				} else {
					panel.css('height: 0px; opacity: 0;');
					$('label', this).text(title);
					expander.toggleClass('ui-status-expanded', 'ui-status-collapsed');
				}
			});
		}
	});
	$.extend(HTMLElement.prototype, {
		UICalculateNumberOfLines : function () {
			var lineHeight = parseInt(this.css('line-height'), 10);
			var height = parseInt(this.css('height'), 10);
			var lineNums = Math.floor(height / lineHeight);
			return lineNums;
		},
		UIParagraphEllipsis : function () {
			var lines = this.UICalculateNumberOfLines();
			this.css('-webkit-line-clamp:' + lines);
		}
	});
	$.extend(HTMLElement.prototype, {
		UIProgressBar : function ( opts ) {
			opts = opts || {};
			var className = opts.className || false;
			var width = opts.width || 100;
			var speed = opts.speed || 5;
			var position = opts.position || 'after';
			var margin = opts.margin || '10px auto';
			var bar = '<progressbar';
			if (className) {
				bar += " class='" + className + "'";
			}
			bar += " style='width: " + width + "px;";
			bar += " -webkit-animation-duration: " + speed +"s;";
			bar += " margin: " + margin + ";'";
			bar += "></progressbar>";
			this.insert(bar);
		},
		UIHideNavBarHeader : function ( ) {
			this.css('visibility: hidden; position: absolute;');
		},
		UIShowNavBarHeader : function ( ) {
			this.css('visibility: visible; position: static;');
		}
	});
	$.extend({
		UIAdjustToolBarTitle : function() {
			$$('navbar h1').each(function(title) {
				var availableSpace = window.innerWidth - 20;
				var siblingLeftWidth = 0;
				var siblingRightWidth = 0;
				var subtractableWidth = 0;
				siblingLeftWidth = title.previousElementSibling ? title.previousElementSibling.clientWidth : 0;
				siblingRightWidth = title.nextElementSibling ? title.nextElementSibling.clientWidth : 0;
				if (siblingLeftWidth > siblingRightWidth) {
					subtractableWidth = siblingLeftWidth * 2;
				} else {
					subtractableWidth = siblingRightWidth * 2;
				}
				if((availableSpace - subtractableWidth) < 40) {
					title.css('display: none;');
				} else {
					title.css({display: 'block', width: (availableSpace - subtractableWidth - 20) + 'px'});
				}
			});
		}
	});
	document.addEventListener('DOMContentLoaded', function() {
		if (!$('splitview')) {
			$.UIAdjustToolBarTitle();
		}
	}, false);
	document.addEventListener('orientationchange', function() {
		if (!$('splitview')) {
			$.UIAdjustToolBarTitle();
		}
	}, false);
	window.addEventListener('resize', function() {
		if (!$('splitview')) {
			$.UIAdjustToolBarTitle();
		}
	}, false);
	$.UIActivityIndicator = function() {};
	$.extend($.UIActivityIndicator.prototype, {
		id : null,
		color : null,
		shadow : null,
		container : null,
		size : null,
		init : function(opts) {
			if (opts) {
				this.id = opts.id || 'UIActivityIndicator';
				this.color = opts.color || 'gray';
				if (!!opts.shadow) {
					this.shadow = opts.shadow;
				}
				this.container = opts.container;
				this.size = opts.size || '75%';
			}
			$(this.container).css('background-position: center 70%; background-repeat: no-repeat; background-image: -webkit-canvas(' + this.id + '); background-size: ' + this.size + ' ' + this.size);
			this.context = document.getCSSCanvasContext('2d', this.id, 37, 37);
			this.context.lineWidth = 3;
			this.context.lineCap = 'round';
			this.context.strokeStyle = this.color;
			if (this.shadow) {
				this.context.shadowOffsetX = 1;
				this.context.shadowOffsetY = 1;
				this.context.shadowBlur = 2;
				this.context.shadowColor = this.shadow;
			}
			this.step = 0;
			this.timer = null;
		},
		draw : function() {
			this.context.clearRect(0, 0, 137, 37);
			this.context.save();
			this.context.translate(18, 18);
			this.context.rotate(this.step * Math.PI / 180);
			for (var i = 0; i < 12; i++) {
				this.context.rotate(30 * Math.PI / 180);
				this.drawLine(i);
			}
			this.context.restore();
			this.step += 30;
			if (this.step === 360) {
				this.step = 0;
			}
		},
		drawLine : function(i) {
			this.context.beginPath();
			this.context.globalAlpha = i / 12;
			this.context.moveTo(0, 8 + 1);
			this.context.lineTo(0, 16 - 1);
			this.context.stroke();
		},
		stop : function() {
			if (this.timer) {
				this.context.clearRect(0, 0, 37, 37);
				window.clearInterval(this.timer);
				this.timer = null;
			}
		},
		animate : function() {
			if (this.timer) {
				return;
			}
			var that = this;
			this.timer = window.setInterval(function() {
				that.draw();
			}, 100);
		}
	});

	$.extend(HTMLElement.prototype, {
		UIInsertActivityIndicator : function ( opts ) {
			this.insert("<panel style='height: " + opts.size + "; width: " + opts.size + ";" + opts.style + "'></panel>");
			var ai = new $.UIActivityIndicator();
			ai.init(opts);
			ai.animate();
		}
	});

	$.extend({
		UICurX : null,
		UICurY : null,
		UISliderThumbWidth : null,
		UISliderValue : null,
		UISlider : function( selector, opts ) {
			var startValue = null;
			var callback = opts.callback || function() {};
			if (opts.startValue) {
				startValue = opts.startValue;
			}
			var sliderLength = $(selector).clientWidth;
			if (startValue) {
				$('thumb', selector).css('left: ' + startValue + 'px;');
				$(selector).css('background-size: ' + (startValue + 2) + 'px 9px, 100% 9px;');				
			}
			$(selector).setAttribute('ui-slider-length', sliderLength);
			if ('createTouch' in document) {
				 var thumb = $(selector + ' > thumb');
				 thumb.bind('touchmove', function(thumb) {
					 this.UISliderTouch(event);
					 this.UIUpdateSliderTouch(callback);
				 }); 
			} else {
				$.UISliderForMouse(selector, opts);
			}
		}
	});

	$.extend(HTMLElement.prototype, {
		UISliderTouch : function( event ) {
			event.preventDefault();
			var sliderLength = this.parentNode.getAttribute('ui-slider-length');
			var touch = event.touches[0];
			$.UICurX = touch.pageX - this.parentNode.offsetLeft - $.UISliderThumbWidth;
			var sliderThumbWidth = this.css('width');
			sliderThumbWidth = parseInt(sliderThumbWidth, 10);
			$.UISliderValue = $.UICurX + sliderThumbWidth;
			if ($.UICurX <= 0 - (sliderThumbWidth/2)) { 
				$.UICurX = 0 - (sliderThumbWidth/2);
			}
			if ($.UICurX > sliderLength - 12) {
				$.UICurX = sliderLength -12;
			} 
		},

		UIUpdateSliderTouch : function( callback ) {
			callback = callback || function() {};
			this.style.left = $.UICurX - $.UISliderThumbWidth + 'px'; 
			callback();
			this.parentNode.css('-webkit-background-size:' + ($.UICurX + 1) + 'px 9px, 100% 9px;');
			this.parentNode.css('background-size:' + ($.UICurX + 1) + 'px 9px, 100% 9px;');
		}
	});

	$.UIDrag = {
		obj: null,
		init: function(elem, elemParent, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef) {
			elem.onmousedown = $.UIDrag.start;
			elem.hmode = bSwapHorzRef ? false : true ;
			elem.vmode = bSwapVertRef ? false : true ;
			elem.root = elemParent && elemParent !== null ? elemParent : elem ;
			if (elem.hmode && isNaN(parseInt(elem.root.style.left, 10))) {
			   elem.root.style.left = elem.root.css('left');
			}
			if (elem.vmode && isNaN(parseInt(elem.root.style.top, 10))) {
			   elem.root.style.top = elem.root.css('top');
			}
			if (!elem.hmode && isNaN(parseInt(elem.root.style.right, 10))) {
			   elem.root.style.right = elem.root.css('right');
			}
			if (!elem.vmode && isNaN(parseInt(elem.root.style.bottom, 10))) {
			   elem.root.style.bottom = elem.root.css('bottom');
			}
			elem.minX = typeof minX !== 'undefined' ? minX : null;
			elem.minY = typeof minY !== 'undefined' ? minY : null;
			elem.maxX = typeof maxX !== 'undefined' ? maxX : null;
			elem.maxY = typeof maxY !== 'undefined' ? maxY : null;
			elem.root.onDragStart = function() {};
			elem.root.onDragEnd	 = function() {};
			elem.root.onDrag = function() {};
		},
		start: function(e) {
			var elem = $.UIDrag.obj = this;
			e = $.UIDrag.fixE(e);
			$.UIDrag.y = parseInt(elem.vmode ? elem.root.style.top	: elem.root.style.bottom, 10);
			$.UIDrag.x = parseInt(elem.hmode ? elem.root.style.left : elem.root.style.right, 10);
			elem.root.onDragStart($.UIDrag.x, $.UIDrag.y);
			elem.lastMouseX = e.clientX;
			elem.lastMouseY = e.clientY;
			if (elem.hmode) {
				if (elem.minX !== null) elem.minMouseX	  = e.clientX - $.UIDrag.x + elem.minX;
				if (elem.maxX !== null) elem.maxMouseX	  = elem.minMouseX + elem.maxX - elem.minX;
			} else {
				if (elem.minX !== null) elem.maxMouseX = -elem.minX + e.clientX + $.UIDrag.x;
				if (elem.maxX !== null) elem.minMouseX = -elem.maxX + e.clientX + $.UIDrag.x;
			}
			if (elem.vmode) {
				if (elem.minY !== null) elem.minMouseY	  = e.clientY - $.UIDrag.y + elem.minY;
				if (elem.maxY !== null) elem.maxMouseY	  = elem.minMouseY + elem.maxY - elem.minY;
			} else {
				if (elem.minY !== null) elem.maxMouseY = -elem.minY + e.clientY + $.UIDrag.y;
				if (elem.maxY !== null) elem.minMouseY = -elem.maxY + e.clientY + $.UIDrag.y;
			}
	
			document.onmousemove = $.UIDrag.drag;
			document.onmouseup = $.UIDrag.end;
			return false;
		},
		drag: function(e) {
			e = $.UIDrag.fixE(e);
			var elem = $.UIDrag.obj;
			var ey = e.clientY;
			var ex = e.clientX;
			$.UIDrag.y = parseInt(elem.vmode ? elem.root.style.top	: elem.root.style.bottom, 10);
			$.UIDrag.x = parseInt(elem.hmode ? elem.root.style.left : elem.root.style.right, 10);
			var nx, ny;
			if (elem.minX !== null) ex = elem.hmode ? 
				Math.max(ex, elem.minMouseX) : Math.min(ex, elem.maxMouseX);
			if (elem.maxX !== null) ex = elem.hmode ? 
				Math.min(ex, elem.maxMouseX) : Math.max(ex, elem.minMouseX);
			if (elem.minY !== null) ey = elem.vmode ? 
				Math.max(ey, elem.minMouseY) : Math.min(ey, elem.maxMouseY);
			if (elem.maxY !== null) ey = elem.vmode ? 
				Math.min(ey, elem.maxMouseY) : Math.max(ey, elem.minMouseY);
			nx = $.UIDrag.x + ((ex - elem.lastMouseX) * (elem.hmode ? 1 : -1));
			ny = $.UIDrag.y + ((ey - elem.lastMouseY) * (elem.vmode ? 1 : -1));
			$.UICurX = nx;
			$.UISliderValue = nx + (Math.round($.UISliderThumbWidth));
			$.UICurY = ny;
			$.UIDrag.obj.root.style[elem.hmode ? 'left' : 'right'] = nx + 'px';
			$.UIDrag.obj.root.style[elem.vmode ? 'top' : 'bottom'] = ny + 'px';
			$.UIDrag.obj.lastMouseX = ex;
			$.UIDrag.obj.lastMouseY = ey;
			$.UIDrag.obj.root.onDrag(nx, ny);
			$.UIDrag.updateSliderProgressIndicator($.UICurX);
			return false;
		},

		end: function() {
			document.onmousemove = null;
			document.onmouseup = null;
			$.UIDrag.obj.root.onDragEnd( 
				parseInt($.UIDrag.obj.root.style[$.UIDrag.obj.hmode ? 'left' : 'right'], 10), 
				parseInt($.UIDrag.obj.root.style[$.UIDrag.obj.vmode ? 'top' : 'bottom'], 10));
			$.UIDrag.obj = null;
		},

		fixE: function(e) {
			if (typeof e.elemX === 'undefined') e.elemX = e.offsetX;
			if (typeof e.elemY === 'undefined') e.elemY = e.offsetY;
			return e;
		}, 
		updateSliderProgressIndicator : function() {
			$.UIDrag.obj.parentNode.css('-webkit-background-size:' + ($.UICurX + 1) + 'px 9px, 100% 9px;');
			$.UIDrag.obj.parentNode.css('background-size:' + ($.UICurX + 1) + 'px 9px, 100% 9px;');
		}
	};	

	$.extend({
		UISliderForMouse : function ( selector, opts ) {
			opts = opts || {};
			var thumb = $('thumb', selector);
			var slider = $(selector);
			var thumbWidth = parseInt(thumb.css('width'),10);
			var sliderWidth = parseInt(slider.css('width'),10);
			var sliderHeight = parseInt(slider.css('height'),10);
			var padding = parseInt(slider.css('padding-right'),10);
			var border = parseInt(slider.css('border-right-width'),10);
			sliderWidth -= padding;
			sliderWidth -= border;
			sliderWidth -= $.UISliderThumbWidth;
	
	
			var thumbDetuct = Math.round(thumbWidth/2);
			$.UISliderThumbWidth = thumbDetuct;
			var negLeft = (0 - $.UISliderThumbWidth);
			$.UIDrag.init(thumb, null, -$.UISliderThumbWidth, sliderWidth - (Math.round(thumbWidth/2)), opts.top, opts.top);
			thumb.onDrag = function() {
				if (opts.callback) {
					opts.callback();
					slider.UIUpdateSliderTouch();
				}
				// Temporary fix for horizontal slider thumb drag:
				this.style.top = -sliderHeight + 'px';
			};
		}
	});

	$.extend(HTMLElement.prototype, {
		UISetTranstionType : function( transition ) {
			this.setAttribute('ui-transition-type', transition);
		},
		UIFlipSubview : function ( direction ) {
			var view = this.ancestor('view');
			view.UISetTranstionType('flip-' + direction);
			this.bind($.userAction, function() {
				switch (direction) {
					case 'right':
						$('subview:nth-of-type(1)', view).toggleClass('flip-right-front-in','flip-right-front-out');
						$('subview:nth-of-type(2)', view).toggleClass('flip-right-back-in','flip-right-back-out');
						break;
					case 'left':
						$('subview:nth-of-type(1)', view).toggleClass('flip-left-front-in','flip-left-front-out');
						$('subview:nth-of-type(2)', view).toggleClass('flip-left-back-in','flip-left-back-out');
						break;
					case 'top':
						$('subview:nth-of-type(2)', view).toggleClass('flip-top-front-in','flip-top-front-out');
						$('subview:nth-of-type(1)', view).toggleClass('flip-top-back-in','flip-top-back-out');
						break;
					case 'bottom':
						$('subview:nth-of-type(2)', view).toggleClass('flip-bottom-front-in','flip-bottom-front-out');
						$('subview:nth-of-type(1)', view).toggleClass('flip-bottom-back-in','flip-bottom-back-out');
						break;
					default:
						$('subview:nth-of-type(1)', view).toggleClass('flip-right-front-in','flip-right-front-out');
						$('subview:nth-of-type(2)', view).toggleClass('flip-right-back-in','flip-right-back-out');
				}
			});
		},
		UIPopSubview : function ( ) {
			var view = this.ancestor('view');
			view.UISetTranstionType('pop');
			this.bind($.userAction, function() {
				$('subview:nth-of-type(2)', view).toggleClass('pop-in','pop-out');	
			});
		},

		UIFadeSubview : function ( ) {
			var view = this.ancestor('view');
			view.UISetTranstionType('fade');
			view.setAttribute('ui-transition-type', 'fade');
			this.bind($.userAction, function() {
				$('subview:nth-of-type(2)', view).toggleClass('fade-in', 'fade-out');
			});
		},
		UISpinSubview : function ( direction ) {
			var view = this.ancestor('view');
			view.UISetTranstionType('spin');
			if (!direction || direction === 'left') {
				this.UISetTranstionType('left');
				this.bind($.userAction, function() {
					$('subview:nth-of-type(2)', view).toggleClass('spin-left-in', 'spin-left-out');
				});
			} else if (direction === 'right') {
				this.UISetTranstionType('right');
				this.bind($.userAction, function() {
					$('subview:nth-of-type(2)', view).toggleClass('spin-right-in', 'spin-right-out');
				});
			} else {
				this.UISetTranstionType('left');
				this.bind($.userAction, function() {
					$('subview:nth-of-type(2)', view).toggleClass('spin-left-in', 'spin-left-out');
				});
			}
		}
	});
	$(function() {
		$.extend($, {
			UICancelSplitViewToggle : function () {
				$.body.addClass('SplitViewFixed');
			},
			UISplitViewScroller1 : null,
			UISplitViewScroller2 : null,
			rootview : $('rootview'),
			resizeEvt : ('onorientationchange' in window ? 'orientationchange' : 'resize'),
			UISplitView : function ( ) {
				if ($.body.hasClass('SplitViewFixed')) {
					return;
				}	
				$.UISplitViewScroller1 = new iScroll('#scroller1 > scrollpanel');
				$.UISplitViewScroller2 = new iScroll('#scroller2 > scrollpanel');		
				var buttonLabel = $('rootview > panel > view[ui-navigation-status=current] > navbar').text();
				$('detailview > navbar').insert("<uibutton id ='showRootView'  class='navigation' ui-bar-align='left'>"+buttonLabel+"</uibutton>", "first");
				if (window.innerWidth > window.innerHeight) {
					$.rootview.css("display: block; height: 100%; margin-bottom: 1px;");
					$("#scroller1").css("overflow: hidden; height: " + ($.rootview.innerHeight - 45) + "px;");
				} else {
					$.rootview.css("display: none; height: " + (window.innerHeight - 100) + "px;");
					$("#scroller1").css("overflow: hidden; height: " + (window.innerHeight - 155) + "px;");
				}
				$("detailview navbar h1").text($("tableview[ui-implements=detail-menu] > tablecell").text().trim());
			},
	
			UISetSplitviewOrientation : function() {
				if ($.body.hasClass('SplitViewFixed')) {
					return;
				}
				if ($.resizeEvt) {
					if (window.innerWidth > window.innerHeight) {
						$.app.UIUnblock();
						$.rootview.css('display: block; height: 100%; margin-bottom: 1px;');
						$('#scroller1').css('overflow: hidden; height: 100%;');
					} else {
						$.app.UIUnblock();
						$.rootview.css('display: none; height: ' + (window.innerHeight - 100) + 'px;');
						$('#scroller1').css('overflow: hidden; height:' + (window.innerHeight - 155) + 'px;');
					}
					$.UIEnableScrolling({desktopCompatibility:true});
				}
			},
	
			UIToggleRootView : function() {
				if ($.body.hasClass('SplitViewFixed')) {
					return;
				}
				if ($.rootview.style.display === 'none') {
					$.rootview.css('display: block;');
					$.rootview.UIBlock('.01');
					$.UISplitViewScroller1.refresh();
					$.UISplitViewScroller2.refresh();
				} else {
					$.rootview.style.display = 'none';
					$.rootview.UIUnblock();
					$.UISplitViewScroller1.refresh();
					$.UISplitViewScroller2.refresh();
				}
			},
	
			UICheckForSplitView : function ( ) {
				if ($.body.hasClass('SplitViewFixed')) {
					return;
				}
				if ($('splitview')) {
					$.UISplitView();
					$('#showRootView').bind($.userAction, function() {
						$.UIToggleRootView();
					});
					$.body.onorientationchange = function(){
						$.UISetSplitviewOrientation();
					};
					window.onresize = function() {
						$.UISetSplitviewOrientation();
					};
				}
			},
			UICurrentSplitViewDetail : null
		});
		$.UICheckForSplitView();
		if ($('detailview > subview')) {
			$.UICurrentSplitViewDetail = '#';
			$.UICurrentSplitViewDetail += $('detailview > subview').getAttribute('id');
			$$('tableview[ui-implements=detail-menu] > tablecell').each(function(cell) {
				cell.bind($.userAction, function() {
					var rootview = this.ancestor('rootview');
					if (rootview.css('position') === 'absolute') {
						rootview.css('display: none;');
						$.app.UIUnblock();
					}
					var uiHref = this.getAttribute('ui-href');
					uiHref = '#' + uiHref;
					if (uiHref === $.UICurrentSplitViewDetail) {
						return;
					} else {
						$($.UICurrentSplitViewDetail).css('display: none;');
						$(uiHref).css('display: block;');
						$.UICurrentSplitViewDetail = uiHref;
						$('detailview navbar h1').text(cell.text().trim());
						$.UIEnableScrolling({desktopCompatibility:true});
					}
				});
			});
			$.app.delegate('mask', $.userAction, function() {
				$.rootview.css('display: none;');
				$.rootview.UIUnblock();
			});
		}
	});
	$.extend({
		determineMaxPopoverHeight : function() {
			var screenHeight = window.innerHeight;
			var toolbarHeight;
			if ($('navbar')) {
				toolbarHeight = $('navbar').clientHeight;
			}
			if ($('toolbar')) {
				if (!$('toolbar').getAttribute('ui-placement')) {
					toolbarHeight = $('toolbar').clientHeight;
				}
			}
				screenHeight = screenHeight - toolbarHeight;
				return screenHeight; 
		},
		determinePopoverWidth : function() {
			var screenWidth = window.innerWidth;
		},
		adjustPopoverHeight : function( popover ) {
			var availableVerticalSpace = $.determineMaxPopoverHeight();
			$(popover + " > section").css("max-height:" + (availableVerticalSpace - 100) + "px; overflow: hidden;}");
			var popoverID = popover.split("#");
			popoverID = popoverID[1];
		},
		determinePopoverPosition : function( triggerElement, popoverOrientation, pointerOrientation ) {
	
			popoverOrientation = popoverOrientation.toLowerCase();
			pointerOrientation = pointerOrientation.toLowerCase();
			var trigEl = $(triggerElement);
			var pos = '';
			var popoverPos = null;
			switch (popoverOrientation) {
				case 'top' : 
					if (pointerOrientation === 'left') {
						popoverPos = trigEl.offsetLeft;
						popoverPos = 'left: ' + popoverPos;
					} else if (pointerOrientation === 'center') {
						popoverPos = (trigEl.offsetLeft + (trigEl.offsetWidth/2) - 160);
						popoverPos = 'left: ' + popoverPos;
					} else {
						popoverPos = (trigEl.offsetLeft + trigEl.offsetWidth) - 320;
						popoverPos = 'left: ' + popoverPos;
					}
					pos = trigEl.offsetTop + trigEl.offsetHeight;
					pos += 20;
					pos =  popoverPos + 'px; top: ' + pos + 'px;';
					break;
				case 'right' :
					if (pointerOrientation === 'top') {
						popoverPos = trigEl.getTop() + 2;
						popoverPos = 'top: ' + popoverPos + 'px;';
					} else if (pointerOrientation === 'center') {
						popoverPos = (trigEl.getTop() - (trigEl.offsetHeight/2) - 20);
						popoverPos = 'top: ' + popoverPos + 'px;';
					} else {
						popoverPos = trigEl.getTop() - trigEl.offsetHeight - 20;
						popoverPos = 'top: ' + popoverPos + 'px;';
					}
					pos = trigEl.getLeft() - 330;
					pos -= 20;
					pos = popoverPos + ' left: ' + pos + 'px';
					break;
				case 'bottom' :
					if (pointerOrientation === 'left') {
						popoverPos = trigEl.offsetLeft;
						popoverPos = 'left: ' + popoverPos;
					} else if (pointerOrientation === 'center') {
						popoverPos = (trigEl.offsetLeft + (trigEl.offsetWidth/2) - 160);
						popoverPos = 'left: ' + popoverPos;
					} else {
						popoverPos = (trigEl.offsetLeft + trigEl.offsetWidth) - 320;
						popoverPos = 'left: ' + popoverPos;
					}
					pos = trigEl.offsetTop + trigEl.offsetHeight;
					pos += 20;
					pos =  popoverPos + 'px; bottom: ' + pos + 'px;';
					break;
					break;
				case 'left' :
					if (pointerOrientation === 'top') {
						popoverPos = trigEl.getTop() + 2;
						popoverPos = 'top: ' + popoverPos + 'px;';
					} else if (pointerOrientation === 'center') {
						popoverPos = (trigEl.getTop() - (trigEl.offsetHeight/2) - 20);
						popoverPos = 'top: ' + popoverPos + 'px;';
					} else {
						popoverPos = trigEl.getTop() - trigEl.offsetHeight - 20;
						popoverPos = 'top: ' + popoverPos + 'px;';
					}
					pos = trigEl.offsetLeft + trigEl.offsetWidth;
					pos += 20;
					pos = popoverPos + ' left: ' + pos + 'px';
					break;
				default :
					pos = trigEl.getTop() + trigEl.offsetHeight;
					popoverPos = 'left: ' + popoverPos;
					pos += 20;
					pos = popoverPos + 'px; top: ' + pos + 'px;';
					break;
			}
			return pos;
		},
		UIPopover : function( opts ) {
			var title;
			var triggerElement = opts.triggerElement;
			var popoverOrientation = opts.popoverOrientation;
			var pointerOrientation = opts.pointerOrientation;
			var popoverID;
			if (opts) { 
				popoverID = 'id="' + opts.id + '"' || $.UIUuid();
				title = '<h3>'+ opts.title + '</h3>' || "";
			} else {
				popoverID = "";
				title = "";
			}
			var trigEl = $(triggerElement);
			var pos = this.determinePopoverPosition(triggerElement, popoverOrientation, pointerOrientation);
			pos = " style='" + pos + "'";
			var popoverShell = 
				'<popover ' + popoverID + ' ui-pointer-position="' + popoverOrientation + '-' + pointerOrientation + '"' 
				+ pos + ' data-popover-trigger="#' + trigEl.id + '" data-popover-orientation="' + popoverOrientation + '" data-popover-pointer-orientation="' + pointerOrientation + '">\n' + 
					'<header>'+ title 
			
					+ '</header>\n'
					+ '<section><scrollpanel class="popover-content"></scrollpanel></section>\n'
				+'</popover>';
			var newPopover = $.make(popoverShell);
	
			$.app.insert(newPopover, "last");
			// Adjust the left or bottom position of the popover if it is beyond the viewport:
			if (!!opts.id) {
				$.adjustPopoverHeight("#" + opts.id);
				$("#" + opts.id).adjustPopoverPosition();
			}
		},
		UICancelPopover : function (popover) {
			$.UIHidePopover(popover);
		},
		UIHidePopover : function (popover) {
			$.UIPopover.activePopover = null;
			$(popover).css("opacity: 0; -webkit-transform: scale(0);");
			popover.UIUnblock();
		},
		UIEnablePopoverScrollpanels : function ( options ) {
			try {
				var count = 0;
				$$("popover scrollpanel").each(function(item) {
					item.setAttribute("ui-scroller", $.UIUuid());
					var whichScroller = item.getAttribute("ui-scroller");
					$.UIScrollers[whichScroller] = new iScroll(item.parentNode, options);
				});
			} catch(e) { }
		}
	});
	$.extend($.UIPopover, {
		activePopover : null,
		show : function ( popover ) {
			if ($.UIPopover.activePopover === null) {
				popover.UIBlock(".01");
				popover.repositionPopover();
				popover.css("opacity: 1; -webkit-transform: scale(1);");
				$.UIPopover.activePopover = popover.id;
		
				$.UIEnableScrolling({ desktopCompatibility: true });
			} else {
				return;
			}
			$.UIEnablePopoverScrollpanels();
		},
		hide : function ( popover ) {
			if ($.UIPopover.activePopover) {
				popover.css("opacity: 0; -webkit-transform: scale(0);");
				$.UIPopover.activePopover = null;
			}
		}
	});
	$.extend(HTMLElement.prototype, {
		repositionPopover : function() {
			var triggerElement = this.getAttribute("data-popover-trigger"); 
			var popoverOrientation = this.getAttribute("data-popover-orientation");
			var pointerOrientation = this.getAttribute("data-popover-pointer-orientation");
			var popoverPos = $.determinePopoverPosition(triggerElement, popoverOrientation, pointerOrientation);
			this.css(popoverPos);
		},
		adjustPopoverPosition : function() {
			var screenHeight = window.innerHeight;
			var screenWidth = window.innerWidth;
			var popoverHeight = this.offsetHeight;
			var popoverWidth = this.offsetWidth;
			var popoverTop = this.getTop();
			var popoverLeft = this.getLeft();
			var bottomLimit = popoverTop + popoverHeight;
			var rightLimit = popoverLeft + popoverWidth;
			if (bottomLimit > screenHeight) {
				this.style.top	= screenHeight - popoverHeight - 10 + "px";
			}
			if (rightLimit > screenWidth) {
				this.style.left = screenWidth - 10 + "px";
			}
		},
		UIBlock : function ( opacity ) {
			opacity = opacity ? " style='opacity:" + opacity + "'" : "";
			this.before($.make("<mask" + opacity + "></mask>"));
		},
		UIUnblock : function ( ) {
			if ($("mask")) {
				$("mask").remove();
			}
		}
	});
	$.extend({
		UIPositionMask : function() {
			if ($("mask")) {
				$("mask").css("height:" + (window.innerHeight + window.pageYOffset) + "px; width: " + window.innerWidth + "px;");
			}
		}
	});
	// Reposition any visible popovers when orientation changes.
	window.addEventListener("orientationchange", function() {
		var availableVerticalSpace = $.determineMaxPopoverHeight();
		$$("popover").each(function(popover) {
			popover.find("section").css("max-height:" + (availableVerticalSpace - 100) + "px;");
			//popover.style.cssText = "opacity: 0; -webkit-transform: scale(0);";
			popover.repositionPopover();
			$.adjustPopoverHeight("#" + popover.id);
		});
		if ($("rootview")) {
			$("rootview").UIUnblock();
		}
	}, false);

	// Reposition any visible popovers when window resizes.
	window.addEventListener("resize", function() {
		var availableVerticalSpace = $.determineMaxPopoverHeight();
		$$("popover").each(function(popover) {
			popover.find("section").css("max-height:" + (availableVerticalSpace - 100) + "px;");
	
			popover.repositionPopover();
		});
		$.UIPositionMask();
	}, false);

	$(function() {
		$.app.delegate("mask", "click", function() {
			if ($.UIPopover.activePopover) {
				$.UIPopover.hide($("#"+$.UIPopover.activePopover));
				if ($("mask")) {
					$("mask").UIUnblock();
				}
			}
			if ($.rooview && $.rootview.css("position") === "absolute") {
				$.rootview.style.display = "none";
				$.rootview.UIUnblock();
			}
		});
	});
	$.extend({
		UIAlphabeticalList : function() {
			if ($("tableview[ui-kind='titled-list alphabetical']")) {
				var tableview = $("tableview[ui-kind='titled-list alphabetical']");
				var titles = [];
				var uuidSeed = $.UIUuidSeed();
				var counter = 0;
				var alphabeticalList = '<stack ui-kind="alphabetical-list">';
				var alphabeticalListItems = "";
				tableview.findAll("tableheader").each(function(title){
					titles.push(title.text());
					counter++;
					title.setAttribute("id", "alpha_" + title.text() + uuidSeed + counter);
					alphabeticalListItems += '<span href="#alpha_' + title.text() + uuidSeed + counter + ' ">' + title.text() + '</span>';
				});
				alphabeticalList += alphabeticalListItems + '</stack>';
				tableview.ancestor("scrollpanel").after(alphabeticalList);
			} else {
				return;
			}
			if ($("stack[ui-kind='alphabetical-list']")) {
				$("stack[ui-kind='alphabetical-list']").css({height: window.innerHeight-45 + "px"});

				window.addEventListener("resize", function() {
					$("stack[ui-kind='alphabetical-list']").css({height: window.innerHeight-45 + "px"});
				});
			} else {
				console.log("no alphabetic list!");
			}
			var scroller = $("tableview[ui-kind='titled-list alphabetical']")
				.ancestor("scrollpanel");
			var myScrollie = scroller.getAttribute("ui-scroller");
			$.UIScrollers[myScrollie].destroy();
			$.UIScrollers[myScrollie] = new iScroll(scroller.parentNode, {snap:true});
			$.app.delegate("stack[ui-kind='alphabetical-list'] > span", "click", function(alpha) { 
				$.UIScrollers[myScrollie].scrollToElement(alpha.getAttribute("href"));
			}); 
		}
	});

	$(function() {
		if ("stack[ui-kind='titled-list alphabetical']") {
			$.UIAlphabeticalList(); 
		}
	}})($chocolatechip, $$chocolatechip);
