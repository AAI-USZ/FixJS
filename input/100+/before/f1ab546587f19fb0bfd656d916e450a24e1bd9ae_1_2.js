function SketchingHandler(view, options) {
	var elem = view.elem;
	
	var self = {
		
		enable: function(){
			var events = ['mousedown', 'mousemove', 'dblclick'];
			events.forEach(function(ev){
				elem.bind(ev, function(payload){
			      payload.preventDefault();
			      self[ev](view.translateX(payload.clientX),
			      	view.translateY(payload.clientY));
			    });				
			});
		},
		
		disable: function() {
			elem.unbind();
		},
				
		mousedown: function(x, y) {
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
		},
		
		mousemove: function(x, y) {
			if(self.shape){
				// Modify the last path element
				var path = self.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				self.shape.attr('path', path);
			}
		},
		
		dblclick: function(x, y){
			if(self.shape){
				var path = self.shape.attrs.path;
				self.shape.attr('path', path +'Z');
				view.chassis = self.shape;
				self.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: self.shape});
				self.shape = null;
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}