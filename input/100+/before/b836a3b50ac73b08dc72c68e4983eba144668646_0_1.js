function ( event ) {
				// Set movable
				self.move = true;

				// Set the position of click on the element
				self.clickX = event.pageX - self.element.offset().left;
				self.clickY = event.pageY - self.element.offset().top;

				// Set the initial coordinates
				self.prevX = event.pageX;
				self.prevY = event.pageY;

				// Bind and trigger the mouse move event to calculate previous position
				// Use document as mouse will most likely move out of element during draggable
				$(document).on( 'mousemove.draggable', function ( event ) {
					if( self.move ){
						self.onMouseMove( event );
					}
				});

				// On mouse up, STOP moving the element
				$(document).on( 'mouseup.draggable', function () {
					self.move = false;
				});

				//Prevent default 
				event.preventDefault();
			}