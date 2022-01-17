function(payload) {
			var event = payload.event;
			var x = RelativeCoordEvent(event).relativeX;
			var y = RelativeCoordEvent(event).relativeY;

			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				this.shape.attr('path', path);
			}
		}