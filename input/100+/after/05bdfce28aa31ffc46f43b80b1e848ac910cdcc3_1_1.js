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
			var eOrig = e;
			e = e.touches ? e.touches[0] : e;
			this.shape = shape;
			this.lastX = e.clientX
			this.lastY = e.clientY;
			var h = this.host = host, d = document,
				firstEvent = on(d, "mousemove", lang.hitch(this, "onFirstMove")),
				firstTouchEvent = on(d, "touchmove", lang.hitch(this, "onFirstMove"));
			this.events = [
				on(d, "mousemove", lang.hitch(this, "onMouseMove")),
				on(d, "mouseup",   lang.hitch(this, "destroy")),
				//Handle Touch Events.
				on(d, "touchmove", lang.hitch(this, "onMouseMove")),
				on(d, "touchend",  lang.hitch(this, "destroy")),
				// cancel text selection and text dragging
				on(d, "dragstart",   lang.hitch(evt, "stop")),
				on(d, "selectstart", lang.hitch(evt, "stop")),
				firstTouchEvent,
				firstEvent
			];
			// notify that the move has started
			if(h && h.onMoveStart){
				h.onMoveStart(this);
			}
		}