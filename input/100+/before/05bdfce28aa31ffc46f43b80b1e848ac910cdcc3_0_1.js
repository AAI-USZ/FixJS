function(e){
			// summary:
			//		event processor for onmousedown, creates a Mover for the shape
			// e: Event
			//		mouse event
			if(this.delay){
				this.events.push(
					this.shape.connect("onmousemove", this, "onMouseMove"),
					this.shape.connect("onmouseup", this, "onMouseUp"));
				this._lastX = e.clientX;
				this._lastY = e.clientY;
			}else{
				new this.mover(this.shape, e, this);
			}
			event.stop(e);
		}