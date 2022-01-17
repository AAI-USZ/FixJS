function(shape, e, host){
			// summary:
			//		an object, which makes a shape follow the mouse,
			//		used as a default mover, and as a base class for custom movers
			// shape: dojox.gfx.Shape
			//		a shape object to be moved
			// e: Event
			//		a mouse event, which started the move;
			//		only clientX and clientY properties are used
			// host: Object?
			//		object which implements the functionality of the move,
			//		 and defines proper events (onMoveStart and onMoveStop)
			this.shape = shape;
			this.lastX = e.clientX
			this.lastY = e.clientY;
			var h = this.host = host, d = document,
				firstEvent = connect.connect(d, "onmousemove", this, "onFirstMove");
			this.events = [
				connect.connect(d, "onmousemove", this, "onMouseMove"),
				connect.connect(d, "onmouseup",   this, "destroy"),
				// cancel text selection and text dragging
				connect.connect(d, "ondragstart",   evt, "stop"),
				connect.connect(d, "onselectstart", evt, "stop"),
				firstEvent
			];
			// notify that the move has started
			if(h && h.onMoveStart){
				h.onMoveStart(this);
			}
		}