function( i, event ){
						
						var $event		= $(event),
							dayBegins	= $[plugin_name].date( values.begins.addDays(i), data.settings.daytimestart ),
							dayEnds		= $[plugin_name].date( values.begins.addDays(i), data.settings.daytimeend );
						
						// Prevent detection of overlaps if we've passed through
						// the detect flag.
						if( detect ){
							
							// Check if we were overlapping items previously.
							var wasOverlapping = values.overlap.items;
							
							// Get the event overlaps for this day.
							_private.overlaps.apply(values.calendar,[dayBegins,dayEnds,values.resource]);
							
							// Make sure we've got any update event values. In particular, the overlap data.
							values = $event.data(plugin_name);
														
							// Redraw any items that this event is overlapping.
							for( var uid in values.overlap.items ){
								_private.event.position.apply( values.overlap.items[uid].elems, [false,false,false] );
							}
							
							// Redraw any items that we were previously overlapping.
							// Double check that we haven't already re-drawn this item.
							for( var uid in wasOverlapping ){
								if( !( uid in values.overlap.items ) ){
									_private.event.position.apply( wasOverlapping[uid].elems, [false,false,true] );
								}
							}
						}
						
						// Calculate the new CSS.
						var newStylesMain = {
							top				: i>0 ? 0 : data.cache.incrementHeight * $[plugin_name].date( values.cache.begins, data.settings.daytimestart ).getIncrementBetween( values.cache.begins, data.settings.gridincrement ),
							left			: data.cache.dayWidth * ( data.settings.startdate.getDaysBetween( values.cache.begins, true ) + i ) + ( data.cache.resourceWidth * values.resource ),
							width			: ( values.resource !== null ? data.cache.resourceWidth : data.cache.dayWidth ) - 1,
							height			: Math.min( data.cache.dayHeight, data.cache.incrementHeight * ( i<1 ? values.begins : dayBegins ).getIncrementBetween( ( i==$events.length-1 ? values.cache.ends : dayEnds ), data.settings.gridincrement ) ),
							backgroundColor : $event.hasClass('selected') ? values.colors.mainSelected : values.colors.mainBackground,
							textShadow		: values.colors.mainTextShadow+' 1px 1px 1px',
							color			: values.colors.mainText
						}
						
						newStylesMain.width -= data.settings.overlapoffset*values.overlap.count;
						newStylesMain.left  += data.settings.overlapoffset*values.overlap.inset;
						
						var newStylesDetails = {
							backgroundColor	: values.colors.detailsBackground,
							textShadow		: values.colors.detailsTextShadow+' 1px 1px 1px',
							color			: values.colors.detailsText
						}
						
						// If the event display is too small to show any meaningful details area
						// Use the title attribute instead.
						if( newStylesMain.height <= 15 ){
							newStylesDetails.display = 'none';
							$event.attr('title',values.notes||'').unbind('dblclick.'+plugin_name).bind('dblclick.'+plugin_name,_private.event.edit);
						} else {
							
							newStylesDetails.display = 'block';
							$event.removeAttr('title').unbind('dblclick.'+plugin_name);
						}
						
						// Set the appointment time while dragging.
						if( !values.title ) $event.find('p.title').text( values.begins.format(data.settings.maskeventlabel) );
						
						// Choose whether to animate or not.
						if( !speed ){
							$event.css(newStylesMain);
							$event.find('pre.details').css(newStylesDetails);
						} else {
							// Animate the event.
							$event
								.stop(true, false)
								.animate(newStylesMain, speed, ease || data.settings.easing.eventupdate)
								.find('pre.details')
									.stop(true, false)
									.animate(newStylesDetails, speed, ease || data.settings.easing.eventupdate)
									.css('display',newStylesDetails.display);
	
							// If jQuery UI isn't loaded, we need to
							// manually set the colours, as they won't animate.
							if( jQuery.ui === undefined ){
								$event.css({
									backgroundColor : newStylesMain.backgroundColor,
									textShadow		: newStylesMain.textShadow,
									color			: newStylesMain.color
								});
								$event.find('pre.details').css({
									backgroundColor : newStylesDetails.backgroundColor,
									textShadow		: newStylesDetails.textShadow,
									color			: newStylesDetails.color
								});
							}
						}
					}