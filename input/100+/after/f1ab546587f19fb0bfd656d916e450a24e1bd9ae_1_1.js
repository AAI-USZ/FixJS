function(payload) {
			if(!this.isMyJob(payload))
				return;
			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + payload.x + ' ' + payload.y);
			}else{
				if(view.chassis)
					view.chassis.remove();
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+payload.x+' '+payload.y+' L ' + payload.x + ' ' + payload.y);
				this.shape.attr(options.shapeAttributes);
			}
		}