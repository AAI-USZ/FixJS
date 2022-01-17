function() {
		// closure object data for each scrollable element
		var data = {
		   scrollable : this.id,
			acceptPropagatedEvent : settings.acceptPropagatedEvent,
         preventDefault : settings.preventDefault,
         prevScrolls : []
      };
		// Set mouse initiating event on the desired descendant
		// $(settings.dragSelector).live('mousedown', data, dragscroll.mouseDownHandler);
      $(document).on('mousedown', settings.dragSelector, data, dragscroll.mouseDownHandler);
						
	}