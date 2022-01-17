function Droppable ( element, callback ) {
		if ( Draggable && Compatible ){
			element.drpbl = true;
			self = this;

			//TODO: drpbl should fire custom events so we
			// don't have to rely on mouseup
			Compatible.addListener(
			  document,
				'mouseup',
				function() { 
				  self.dropped.call(element);
				});
		} 
	}