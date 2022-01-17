function(e) {
				var xDelta = e.originalEvent.wheelDeltaX / 3;
				that.dom.scroller.scrollLeft -= xDelta;
			}