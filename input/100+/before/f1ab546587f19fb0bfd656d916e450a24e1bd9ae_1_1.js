function(x, y) {
			if(view.chassis)
				view.chassis.remove();
			if(self.shape){
				// Extend the path
				var path = self.shape.attrs.path;
				self.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				// Create a new path
				var draw = view.draw;
				self.shape = draw.path('M '+x+' '+y + ' L ' + x + ' ' + y);
				self.shape.attr(options.shapeAttributes);
			}
		}