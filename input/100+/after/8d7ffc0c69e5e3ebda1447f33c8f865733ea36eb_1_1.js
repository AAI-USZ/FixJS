function (show) {
		var touchelmnts = [], xOffset, yOffset;
		if (show) {
			touchelmnts.push($('<div id="Touch1" class="touch"></div>').appendTo(document.body));
			touchelmnts.push($('<div id="Touch2" class="touch"></div>').appendTo(document.body));
			touchelmnts.push($('<div id="Touch3" class="touch"></div>').appendTo(document.body));
			xOffset = touchelmnts[0].width() / 2;
			yOffset = touchelmnts[0].height() / 2;
		}

	 	return function showTouches (event) { 
			if (event.type === 'touchstart') {
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					touchelmnts[i].css({
						left: e.clientX - xOffset,
						top: e.clientY - yOffset
					}).addClass('on');
				}	
			} else if (event.type === 'touchmove') {
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					touchelmnts[i].css({
						left: e.clientX - xOffset,
						top: e.clientY - yOffset
					});
				}
			} else if (event.type === 'touchend') {
				$('.touch').removeClass('on');
				for (var i = 0; i < event.touches.length; i++) {
					touchelmnts[i].addClass('on');
				}
			}
		}
	}