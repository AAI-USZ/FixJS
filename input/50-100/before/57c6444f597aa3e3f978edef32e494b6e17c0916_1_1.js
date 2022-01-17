function(payload) {
			var event = payload.event;
			var x = OffsetEvent(event).offsetX;
			var y = OffsetEvent(event).offsetY;

			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				this.shape.attr('path', path);
			}
		}