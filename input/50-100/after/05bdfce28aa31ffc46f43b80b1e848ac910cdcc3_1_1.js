function(e){
			// summary:
			//		event processor for onmousemove
			// e: Event
			//		mouse event
			var eOrig = e;
			e = e.touches ? e.touches[0] : e;
			var x = e.clientX;
			var y = e.clientY;
			this.host.onMove(this, {dx: x - this.lastX, dy: y - this.lastY});
			this.lastX = x;
			this.lastY = y;
			evt.stop(eOrig);
		}