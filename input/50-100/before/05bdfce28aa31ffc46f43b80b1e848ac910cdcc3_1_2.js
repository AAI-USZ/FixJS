function(){
			// summary:
			//		stops the move, deletes all references, so the object can be garbage-collected
			arr.forEach(this.events, connect.disconnect);
			// undo global settings
			var h = this.host;
			if(h && h.onMoveStop){
				h.onMoveStop(this);
			}
			// destroy objects
			this.events = this.shape = null;
		}