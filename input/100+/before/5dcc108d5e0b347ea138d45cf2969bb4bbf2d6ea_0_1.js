function(/*DOMEvent*/e){
			// summary:
			//		Occurs when the user releases the mouse
			//		Calls the onDragEnd method.
			// e:
			//		a DOM event
	
			if (this._isDragging){
				dojo.stopEvent(e);
				this._isDragging = false;
				if(this.autoScroll){
					this.autoScroll.stopAutoScroll();
				}
				delete this.onMove;
				this.onDragEnd(this.node);
				this.node.focus();
			}
			dojo.disconnect(this.events.pop());
			dojo.disconnect(this.events.pop());
		}