function Draggable2D(object2D) {
	// handling events of svg by triggering events defined by us
	object2D.elem.drag(function(dx, dy, x, y, event){
		object2D.trigger(UserEvents.dragMove, {dx: dx, dy: dy, x: x, y: y, event: event});
	}, function(x, y, event){
		object2D.trigger(UserEvents.dragStart, {x: x, y: y, event: event});
	}, function(){
		object2D.trigger(UserEvents.dragEnd, {event: event});
	});
	
	/* 
	 * As a click event occurs whenever there is a drag operation,
	 * in order to avoid this click event propagate to any ancestor
	 * element (bubble effect), it needs to be handled here and
	 * stopped from propagation. 
	 */
	object2D = Selectable(object2D);
	
	return object2D;
}