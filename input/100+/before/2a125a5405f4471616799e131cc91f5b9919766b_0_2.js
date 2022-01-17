function( bData, speed, ease ){

				// Clone the event element, and set up the values.
				var $event	= $(this),
					values	= $event.data(plugin_name),
					data	= values && values.calendar ? values.calendar.data(plugin_name) : false ;

				// Make sure we've got values.
				if( data && values ){
					
					// Get each of the event elements.
					var $events = values.elems;
					
					// Set the new values.
					if( 'begins' in bData ) values.begins	= $[plugin_name].date( bData.begins );
					if( 'ends' in bData )	values.ends		= $[plugin_name].date( bData.ends );
					if( 'color' in bData )	values.colors	= bData.color ? $[plugin_name].colors.generate( bData.color ) : data.settings.defaultcolor;
					if( 'title' in bData )	values.title	= bData.title || null;
					if( 'notes' in bData )	values.notes	= bData.notes || '';
					
					// Work out the cached end date.
					values.cache.ends = ( data.cache.enddate < values.ends ? data.cache.enddate.addSeconds(-1) : values.ends );
					
					// Set the new value into the event data.
					$events.find('pre.details').text( values.notes );
					$events.find('p.title').text( values.title || values.begins.format(data.settings.maskeventlabel) );
															
					// Save the new values to the element.
					$events.data(plugin_name,values);
					data.cache.events[values.uid] = values;
					values.calendar.data(plugin_name,data);
					
					// Call the positioning code.
					_private.event.position.apply($events,[speed,ease]);
				}
			}