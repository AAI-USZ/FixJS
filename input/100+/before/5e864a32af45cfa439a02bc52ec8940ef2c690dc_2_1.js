function(e) {
		
			if (e.originalEvent.touches) {
				var touches = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				e.pageX = touches.pageX;
				e.pageY = touches.pageY;
			}
		
			// call click
			_this.click(e );
		}