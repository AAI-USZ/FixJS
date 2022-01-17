function() {
				var innerWidth;
				
				// Hack for ripple until it adds the window.orientation object
				if (!window.orientation) {
					return window.innerWidth;
				}
				
				if (bb.device.isPlayBook) {
					if (window.orientation == 0 || window.orientation == 180) {
						innerWidth = 1025;
					} else if (window.orientation == -90 || window.orientation == 90) {
						innerWidth = 600;
					}
				} else {
					if (window.orientation == 0 || window.orientation == 180) {
						innerWidth = 768;
					} else if (window.orientation == -90 || window.orientation == 90) {
						innerWidth = 1280;
					}
				}
				return innerWidth;	
			}