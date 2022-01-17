function DraggingHandler(view, options) {
	
	var dragStartX, dragStartY;
	
	var self = {
		enable: function() {
			self.bindAll(['DRAG_START', 'DRAG_MOVE', 'DRAG_END', 'MOUSEOVER', 'MOUSEOUT']);			
		},
		
		disable: function() {
			// TODO waiting for a way to unbind event handlers from EventBus
		},
		
		drag_start: function(payload) {
			if(self.isMyJob(payload)){
				// remember the starting coordinates
				dragStartX = view.attrs.cx;
				dragStartY = view.attrs.cy;
			}
		},
		
		drag_move: function(payload) {
			if(self.isMyJob(payload)){
				/* calculate the new coordinates from the
				 * starting coordinates and the offset
				 */ 
				var newX = dragStartX+payload.dx, newY = dragStartY+payload.dy;
				// move the circle
				view.attr({cx: newX, cy: newY});
				// modify the chassis shape
				var path = view.chassis.attrs.path;
				path[view.path_index][1] = newX;
				path[view.path_index][2] = newY;
				view.chassis.attr({path: path});
				
			}
		},
		
		drag_end: function(payload) {
			self.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: view.chassis});
		},
		
		mouseover: function(payload) {
			if(self.isMyJob(payload)){
				view.attr({r: 6});
			}
		},
		
		mouseout: function(payload) {
			if(self.isMyJob(payload)){
				view.attr({r: 4});
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}