function(payload) {
			var event = payload.event;
			var x = RelativeCoordEvent(event).relativeX;
			var y = RelativeCoordEvent(event).relativeY;

			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+x+' '+y+' L ' + x + ' ' + y);
				this.shape.attr(view.shapeAttributes);
			}
		}