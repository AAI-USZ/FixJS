function DraggingHandler(view, options) {
	var deviationX, deviationY;
	
	var self = {
		enable: function() {
			var events = ['dragStart', 'dragMove', 'dragEnd'];
			var thisHandler = this;
			events.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});
		},
		
		disable: function() {
			// TODO waiting for a way to unbind event handlers from EventBus
		},
		
		dragStart: function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the initial position of view
			deviationX = view.getPosition().x - payload.x;
			deviationY = view.getPosition().y - payload.y;
		},
		
		dragMove: function(payload) {
			payload.event.stopPropagation();
			/* calculate the new coordinates from the
			 * current mouse position and initial deviation
			 */ 
			var newX = payload.x + deviationX, newY = payload.y + deviationY;
			// move the circle
			view.setPosition(newX, newY);
		},

		dragEnd: function(payload) {
			payload.event.stopPropagation();
		}
		
		
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}