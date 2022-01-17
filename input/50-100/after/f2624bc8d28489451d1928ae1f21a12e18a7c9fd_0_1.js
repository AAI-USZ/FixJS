function () {
				if (!opened) { // Only when slideout is closed
					var newPosition = $('#wb-core-in').offset().left;

					if (newPosition <= borderWidth) {
						newPosition = 0;
					}

					// Vertical
					wrapper.css('top', $('#wb-core-in').offset().top);
					// Horizontal
					wrapper.css('right', newPosition);
				}
			}