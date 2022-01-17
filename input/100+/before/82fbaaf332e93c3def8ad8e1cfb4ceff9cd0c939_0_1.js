function onDocumentTouchStart( event ) {
		
		// We're only interested in one point taps
		if (event.touches.length == 1) {
			event.preventDefault();
			
			var point = {
				x: event.touches[0].clientX,
				y: event.touches[0].clientY
			};
			
			// Define the extent of the areas that may be tapped
			// to navigate
			var wt = window.innerWidth * 0.3;
			var ht = window.innerHeight * 0.3;
			
			if( point.x < wt ) {
				navigateLeft();
			}
			else if( point.x > window.innerWidth - wt ) {
				navigateRight();
			}
			else if( point.y < ht ) {
				navigateUp();
			}
			else if( point.y > window.innerHeight - ht ) {
				navigateDown();
			}
			
			slide();
			
		}
	}