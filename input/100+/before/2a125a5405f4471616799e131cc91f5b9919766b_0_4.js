function( e ){
				// Drag to move the appointment (start and end timestamp).
				
				var $event	= e.data.event,
					data	= e.data.data,
					values	= e.data.values,					
					drag	= _private.drag[e.data.i];
				
				// Calculate the new delta.
				drag.deltaX=drag.lastX-e.pageX;drag.lastX=e.pageX;drag.incX+=drag.deltaX;
				drag.deltaY=drag.lastY-e.pageY;drag.lastY=e.pageY;drag.incY+=drag.deltaY;
				
				// Don't officially start the drag operation until 5 pixels in.
				if( !drag.started && ( drag.incY > 5 || drag.incY < -5 || drag.incX > 5 || drag.incY < -5 ) ){
					
					// Start your engines!!
					drag.started = true;
					
					// Add the dragging class to the event.
					$event.addClass('ui-dragging');
					
				} else if( drag.started ){
					
					// Calculate the drag movement in drag increment.
					var incrementMovement	= Math.round( drag.incY / data.cache.dragHeight );
					var dayMovement			= Math.round( drag.incX / data.cache.dayWidth );
					
					// Check the movement. Don't go any further if there isn't any.
					if( incrementMovement === 0 && dayMovement === 0 ) return true;
					
					// Increment by the day.
					var testTimeB	= drag.bTime.addDays( 0-dayMovement ).incrementBy( data.settings.dragincrement, 0-incrementMovement );
					var testTimeE	= drag.eTime.addDays( 0-dayMovement ).incrementBy( data.settings.dragincrement, 0-incrementMovement );
					
					// We've incremented our date, so remove this from the increment counter.
					drag.incY -= (incrementMovement*data.cache.dragHeight);
					drag.incX -= (dayMovement*data.cache.dayWidth);
					
					values.begins	= drag.bTime = testTimeB;
					values.ends		= drag.eTime = testTimeE;
					values.cache.ends = ( data.cache.enddate < testTimeE ? data.cache.enddate.addSeconds(-1) : testTimeE );
					
					// Store the new event time to the element.
					$event.data(plugin_name,values);
					data.cache.events[values.uid] = values;
					values.calendar.data(plugin_name,data);
					
					// Now, just position the event. DONT animate while dragging.
					_private.event.position.apply(values.elems);
				}
			}