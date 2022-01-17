function( e ){
				// Resize the 'begins' time.

				var $event	= e.data.event,
					data	= e.data.data,
					values	= e.data.values,
					drag	= _private.drag[e.data.i];
				
				// Calculate the new delta.
				drag.deltaY=drag.lastY-e.pageY;drag.lastY=e.pageY;drag.incY+=drag.deltaY;
												
				// Exit now if there is no Y delta change to save processing time.
				if( drag.deltaY == 0 ) return true;
				
				// Don't officially start the drag operation until 5 pixels in.
				if( !drag.started && ( drag.incY > 5 || drag.incY < -5 ) ){
					
					// Start your engines!!
					drag.started = true;
					
					// Add the dragging class to the event.
					$event.addClass('ui-dragging ui-resizing');
					
				} else if( drag.started ){
					
					// Calculate the drag movement in drag increment.
					var incrementMovement = Math.round( drag.incY / data.cache.dragHeight );
					
					// Check the increment. Don't go any further if there isn't one.
					if( incrementMovement === 0 ) return true;
					
					// get the increment.
					var testTime = drag.bTime.incrementBy( data.settings.dragincrement, 0-incrementMovement );
					var td = testTime.format('Y-m-d');
					var tt = testTime.format('H:i:s');
					
					// If we've still got a valid date.
					if( td === e.data.lockDate || tt !== data.settings.daytimestart ){
						
						if( td !== e.data.lockDate ){
							// Work out what the new time is.
							testTime = $[plugin_name].date( e.data.lockDate+' '+data.settings.daytimestart );
														
							// work out how what the increment is between this and the day start time.
							incrementMovement = Math.round( testTime.getIncrementBetween( values.begins, data.settings.dragincrement ) );
							
						}
						
						if( testTime >= values.ends ){
							// If the new time is less than or equal to the current time, calculate the difference between the end and beginning time.
							incrementMovement = Math.round( values.ends.getIncrementBetween( values.begins, data.settings.dragincrement ) );
							
							// Then set the new beginning time (1 increment's difference than the other time in the direction that we're dragging).
							testTime = values.ends.incrementBy( data.settings.dragincrement, -1 ).copy();
							
							// Now, we unbind this handler, and bind the bottom resize handler. 
							$(document).unbind('mousemove.'+plugin_name).bind('mousemove.'+plugin_name,e.data,_private.drag.resizeE);
						}
						
						// We've incremented our date, so remove this from the increment counter.
						drag.incY -= (incrementMovement*data.cache.dragHeight);
							
						// Set the new values to the testTime.
						values.begins = drag.bTime = testTime;
						
						// Store the new event time to the element.
						$event.data(plugin_name,values);
						data.cache.events[values.uid] = values;
						values.calendar.data(plugin_name,data);
						
						// Now, just position the event. DONT animate while dragging.
						_private.event.position.apply(values.elems);
					}
				}
			}