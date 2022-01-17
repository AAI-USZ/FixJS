function(e){
			// summary:
			//		event processor for onmousedown, creates a Mover for the shape
			// e: Event
			//		mouse event
			var eOrig = e;
			e = e.touches ? e.touches[0] : e;
			if(this.delay){
				this.events.push(
					this.shape.connect("onmousemove", this, "onMouseMove"),
					this.shape.connect("onmouseup", this, "onMouseUp"),
					this.shape.connect("touchmove", this, "onMouseMove"),
					this.shape.connect("touchend", this, "onMouseUp"));
				this._lastX = e.clientX;
				this._lastY = e.clientY;
			}else{
				new this.mover(this.shape, eOrig, this);
			}
			event.stop(eOrig);
		}