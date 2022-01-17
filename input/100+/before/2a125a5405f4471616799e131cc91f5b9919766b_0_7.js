function( bData ){
			/* Adds a new event object to the calendar */
			
			// Get shortcuts to calendar container and data.
			var $this = $(this), data = $this.data(plugin_name);
			
			// If the calendar has been set up already...
			if( data ){
				
				// Make sure everything we need exists in bdata.
				if( !'uid' in bData )		throw _private.errors.eventParse('Missing unique id (uid)',bData);
				if( !'begins' in bData )	throw _private.errors.eventParse('Missing start date/time (begins)',bData);
				if( !'ends' in bData )		throw _private.errors.eventParse('Missing end date/time (ends)',bData);
				
				// Clone the event element, and set up the values.
				var values	= {
					elems		: $([]),
					calendar	: $this,
					uid			: bData.uid,
					begins		: $[plugin_name].date( bData.begins ),
					ends		: $[plugin_name].date( bData.ends ),
					resource	: data.settings.resources && bData.resource ? _private.resourceIndex.apply( this, [bData.resource,data] ) : null ,
					colors		: bData.color ? $[plugin_name].colors.generate( bData.color ) : data.settings.defaultcolor,
					title		: bData.title || null,
					notes		: bData.notes || '',
					cache		: {},
					overlap		: {
						inset : [],
						depth : []
					}
				};
				
				// Throw an error if we've been passed an invalid resource.
				// Allow blank end dates... in the future we'll use event data 
				// with no end date/time to show 'all day' events.
				// For now, we just show them as minimum length.
				if( values.resource === false )			throw _private.errors.eventParse('Invalid resource id (resource)',bData);
				if( !(values.begins instanceof Date) )	throw _private.errors.eventParse('Invalid start date/time (begins)',bData);
				
				// If everything is in order, create the event data.
				var $event = fragments.event.clone(true);
				
				// Hide certain elements if some interactions aren't allowed.
				if( !data.settings.allowremove ) $event.find('span.button-remove').hide();
				if( !data.settings.allowresize ) $event.find('p.resize-top, p.resize-bottom').hide();
				if( data.settings.allowmove ){
					$event.find('pre.details').bind('selectstart.'+plugin_name,_private.prevent);
				} else {
					$event.unbind('mousedown.'+plugin_name,_private.drag.start);
				}
				
				// Add the text straight to the event details.
				$event.attr('data-id',values.uid);
				$event.find('pre.details').text( values.notes );
				$event.find('p.title').text( values.title || values.begins.format(data.settings.maskeventlabel) );
				
				// Create a collection for multiple events.
				var $events = $event;
				
				// Cache the end date (make sure for internal purposes it doesn't extend after the last displaying date.
				values.cache.ends = ( data.cache.enddate < values.ends ? data.cache.enddate.addSeconds(-1) : values.ends );
				
				// Calculate the number of elements required to render this event.
				// This would usually be one event per day * the number of resources this event is applied to.
				var daysInEvent = _private.event.calculateElementCount.apply(this, [values]);
				
				// Loop to create the number of elements required to render this event.
				while( daysInEvent > $events.length ) $events = $events.add($event.clone(true));
				
				// Set the classes for begin and end.
				$events.first().removeClass('mid').addClass('begin');
				if( data.cache.enddate >= values.ends ){
					$events.last().removeClass('mid').addClass('end');
				}
							
				// Add the event to the data array, and to the DOM.
				data.elements.container.append($events);
				
				// Store the $events elements in the event data object.
				values.elems = $events;
				data.cache.events[values.uid] = values;
				
				// Store the event values against the element.
				$events.data(plugin_name,values);
				$this.data(plugin_name,data);
				
				// Call the positioning code.
				_private.event.position.apply($events);
			}
			return $this;
		}