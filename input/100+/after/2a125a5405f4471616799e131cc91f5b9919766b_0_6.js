function( data ){
				
				var clonedMonth,
					clonedDate,
					clonedDateLabel,
					clonedDateObject,
					clonedDateFormat;
								
				data.elements.datelabel.css({
					width	: data.cache.dayWidth,
					height	: '100%'
				});
				
				data.elements.dayblock.css({
					width	: data.cache.dayWidth,
					height	: data.cache.dayHeight
				});
				
				for( var i=0; i<data.settings.daystodraw; i++ ){
				
					// Clone the time object, and increment by whatever the loop counter is.
					clonedDateObject = data.settings.startdate.addDays(i);
					clonedDateFormat = clonedDateObject.format('Y-m-d');
					
					// Clone the day element, and store the date it represents in an attribute.
					clonedDate = data.elements.dayblock.clone(true)
						.attr({
							'date'	: clonedDateFormat,
							'day'	: clonedDateObject.getDay()
						})
						.css({
							'left'	: data.cache.dayWidth * (i%7),
							'top'	: data.cache.dayHeight * Math.floor(i/7)
						})
						.toggleClass( 'non-month', clonedDateObject.getMonth()+1 != data.settings.startmonth )
						.find('p')
							.text( clonedDateObject.getDate() )
						.end();
					
					// Only create labels for the first seven (number of days in week).
					if( i<7 ){
						// Clone the date label, and store the date it represents as an attribute.
						clonedDateLabel = data.elements.datelabel.clone(true)
							.attr({
								'date'	: clonedDateFormat,
								'day'	: clonedDateObject.getDay() 
							})
							.css( 'left', data.cache.dayWidth * i )
							.find('p')
								.html( clonedDateObject.format( data.settings.maskmonthlabel ) )
							.end();
						
						data.elements.dateline.append( clonedDateLabel );
					}
					
					// Append the cloned dayblock into the container.
					data.elements.container.append( clonedDate );
				}
				
				var $this = $(this);
				
				$this // Construct the base HTML in this element.
					.append( data.elements.dateline )
					.append( data.elements.container );
			}