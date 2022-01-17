function(shape, params){
			// summary:
			//		an object, which makes a shape moveable
			// shape: dojox/gfx/shape.Shape
			//		a shape object to be moved.
			// params: dojox.gfx.__MoveableCtorArgs
			//		an optional configuration object.
			
			this.shape = shape;
			this.delay = (params && params.delay > 0) ? params.delay : 0;
			this.mover = (params && params.mover) ? params.mover : Mover;
			this.events = [
				this.shape.connect("onmousedown", this, "onMouseDown"),
				this.shape.connect("touchstart", this, "onMouseDown")
				// cancel text selection and text dragging
				//, dojo.connect(this.handle, "ondragstart",   dojo, "stopEvent")
				//, dojo.connect(this.handle, "onselectstart", dojo, "stopEvent")
			];
		}