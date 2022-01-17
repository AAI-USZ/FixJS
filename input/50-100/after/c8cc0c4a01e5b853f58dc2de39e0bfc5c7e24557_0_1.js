function Droppable ( element, callback ) {
		if ( Draggable && Compatible ){
			element.drpbl = true;
			self = this;

			Compatible.addListener(
			  document,
				Draggable.deviceEvents.dragend,
				function() { 
					if(self.dropped.call(element)){
						callback.call(Draggable.dragging);
					}							
				}
			);
		} 
	}