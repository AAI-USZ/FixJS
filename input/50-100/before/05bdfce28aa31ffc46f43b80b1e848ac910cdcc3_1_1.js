function(e){
			// summary:
			//		event processor for onmousemove
			// e: Event
			//		mouse event
			var x = e.clientX;
			var y = e.clientY;
			this.host.onMove(this, {dx: x - this.lastX, dy: y - this.lastY});
			this.lastX = x;
			this.lastY = y;
			evt.stop(e);
		}