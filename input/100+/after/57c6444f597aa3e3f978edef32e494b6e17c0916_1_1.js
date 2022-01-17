function(payload) {
			var event = payload.event;
			var x = CurrentEvent(event).currentX;
			var y = CurrentEvent(event).currentY;

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