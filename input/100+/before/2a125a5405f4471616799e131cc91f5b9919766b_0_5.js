function( data ){
				
				// Initialise variables for the loops below.
				var clonedTime;
				var clonedDate;
				var clonedTimeObject;
				var clonedDateObject;
				var clonedResourceLabel;
				var clonedTimeLabel;
				var clonedDateLabel;
				var clonedDateFormat;
				var todayDate = $[plugin_name].date().format('Y-m-d');
				
				// Apply the CSS to the master element.
				// This will automatically get cloned with the element.
				data.elements.timeblock.css({
					width	: '100%',
					height	: data.cache.incrementHeight
				});
				
				data.elements.timelabel.css({
					width	: '100%',
					height	: data.cache.incrementHeight
				});
				
				// Loop through each increment to create a standard day fragment we can
				// clone for each of the days we want to display.
				for( var i=0, mPast, mTime; i<data.cache.incrementsInDay; i++ ){
					
					// Clone the time object, and increment by whatever the loop counter is.
					clonedTimeObject = data.settings.startdate.incrementBy( data.settings.gridincrement, i )
					mTime = clonedTimeObject.format( 'H:i:s' );
					mPast = clonedTimeObject.format( 'i' );
					
					// Clone the time, and store the start time it represents in an attribute. 
					clonedTime = data.elements.timeblock.clone(true);
					clonedTime.attr( 'time', mTime );
					clonedTime.attr( 'past', mPast );
					
					// Clone the time label, and store the time it represents as an attribute.
					clonedTimeLabel = data.elements.timelabel.clone(true);
					clonedTimeLabel.attr( 'time', mTime );
					clonedTimeLabel.attr( 'past', mPast );
					
					// Choose the format type, depending on what's been defined.
					if( mTime == '12:00:00' && 'noon' in data.settings.masktimelabel ){
						clonedTimeLabel.find('p:first').html( clonedTimeObject.format( data.settings.masktimelabel['noon'] ) );
					} else if( mPast in data.settings.masktimelabel ){
						clonedTimeLabel.find('p:first').html( clonedTimeObject.format( data.settings.masktimelabel[mPast] ) );
					}
					
					// Append the cloned time element into the dayblock.
					data.elements.dayblock.append( clonedTime );
					data.elements.timeline.append( clonedTimeLabel );
				}
				
				// Get the first timeblock element, and remove the border from the top.
				data.elements.dayblock.find('div.ui-'+plugin_name+'-time:first').css('border-top','0')
				data.elements.timeline.find('div.ui-'+plugin_name+'-label-time:first').html('');
				
				// Apply the CSS to the master element.
				// This will automatically get cloned with the element.
				data.elements.dayblock.css({
					width	: data.cache.resourceWidth,
					height	: data.cache.dayHeight
				});
				
				data.elements.resourcelabel.css({
					width	: data.cache.resourceWidth,
					height	: '100%'
				})
				
				data.elements.datelabel.css({
					width	: data.cache.dayWidth,
					height	: '100%'
				});
				
				// Loop through each day, and append the dayblocks into the container.
				for( var i=0; i<data.settings.daystodisplay; i++ ){
					
					// Clone the time object, and increment by whatever the loop counter is.
					clonedDateObject = data.settings.startdate.addDays(i);
					clonedDateFormat = clonedDateObject.format('Y-m-d');
					
					for( var r=0; r<data.cache.resourcecount; r++ ){
					
						// Clone the day element, and store the date it represents in an attribute.
						clonedDate = data.elements.dayblock.clone(true)
							.css( 'left', ( data.cache.dayWidth * i ) + ( data.cache.resourceWidth * r ) )
							.attr({
								'date'		: clonedDateFormat,
								'day'		: clonedDateObject.getDay(),
								'resource'	: _private.resource.apply(this,[r,data]).id
							});
						
						if( r<(data.cache.resourcecount-1) ) clonedDate.addClass('ui-'+plugin_name+'-resource');
						if( clonedDateFormat === todayDate ) clonedDate.addClass('ui-'+plugin_name+'-today')
						
						// Append the cloned dayblock into the container.
						data.elements.container.append( clonedDate );
						
						if( data.settings.resources ){
							clonedResourceLabel = data.elements.resourcelabel.clone(true)
								.css( 'left', ( data.cache.dayWidth * i ) + ( data.cache.resourceWidth * r ) )
								.attr({
									'date'		: clonedDateFormat,
									'day'		: clonedDateObject.getDay(),
									'resource'	: _private.resource.apply(this,[r,data]).id
								})
								.find('p')
									.html( _private.resource.apply(this,[r,data]).name )
								.end();
							
							data.elements.resourceline.append( clonedResourceLabel );
						}
					}
					
					// Clone the date label, and store the date it represents as an attribute.
					clonedDateLabel = data.elements.datelabel.clone(true)
						.css( 'left', data.cache.dayWidth * i )
						.attr({
							'date'	: clonedDateFormat,
							'day'	: clonedDateObject.getDay(),
						})
						.find('p')
							.html( clonedDateObject.format( data.settings.maskdatelabel ) )
						.end();
					
					if( clonedDateFormat === todayDate ) clonedDateLabel.addClass('ui-'+plugin_name+'-today');
					
					// Append the cloned daylabel into the container.
					data.elements.dateline.append( clonedDateLabel );
					
				}
				
				// Make an allocation for the scrollbars.
				data.elements.dateline.add(data.elements.resourceline).css({right:data.cache.scrollbarSize});
				
				// Get $this...
				var $this = $(this);
				
				$this // Construct the base HTML in this element.
					.append( data.elements.timeline )
					.append( data.elements.dateline )
					.append( data.elements.datelinefill )
					.append( data.elements.container );
				
				// If the user has defined resources, set those.
				if( $.isArray( data.settings.resources ) || typeof data.settings.resources == 'object' ){
					
					$this // Append these elements to the DOM.
						.append( data.elements.resourceline )
						.append( data.elements.resourcelinefill );
				}
				
				// For the purposes of this demo, we've also included a little bit of code to scroll
				// the calendar so noon displays in the middle of the page.
				var scrollPos = (data.cache.dayHeight/2) - (data.elements.container.height()/2) ;
				data.elements.container.scrollTop(scrollPos);
			}