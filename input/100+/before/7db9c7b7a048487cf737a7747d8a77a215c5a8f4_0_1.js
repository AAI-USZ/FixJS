function locate (iframe, target, isFullscreen) {
		function isFixedPosition (element) {
			var isFixed = false;
			for (var tmp = element; tmp && tmp != document.documentElement; tmp = tmp.parentNode) {
				var s = document.defaultView.getComputedStyle(tmp, '');
				if (s && s.position == 'fixed') {
					isFixed = true;
					break;
				}
			}
			return isFixed;
		}
		if (isFullscreen) {
			var rect = {
				left:FULLSCREEN_MARGIN,
				top:FULLSCREEN_MARGIN,
				width:document.documentElement.clientWidth - FULLSCREEN_MARGIN * 2,
				height:document.documentElement.clientHeight - FULLSCREEN_MARGIN * 2
			};
			iframe.style.position = 'fixed';
			iframe.style.left = rect.left + 'px';
			iframe.style.top = rect.top + 'px';
			iframe.style.width = rect.width + 'px';
			iframe.style.height = rect.height + 'px';
		}
		else {
			var rect = target.getBoundingClientRect();
			var isFixed = isFixedPosition(target);
			iframe.style.position = isFixed ? 'fixed' : 'absolute';
			iframe.style.left = (
				rect.left + 
				(isFixed ? 0 : document.documentElement.scrollLeft)
			) + 'px';
			iframe.style.top = (
				rect.top + 
				(isFixed ? 0 : document.documentElement.scrollTop)
			) + 'px';
			iframe.style.width = rect.width + 'px';
			iframe.style.height = rect.height + 'px';
		}
		return rect;
	}