function(data) {
		var nodes = data.nodes;
		for (var i=0; i<nodes.length;i++) {
			var event = nodes[i].node;
			// convert date and offset it
			var date = gsappFetcher.createDateObject(event.field_event_date_value);

			var five_hour_offset = 60000 * 300;
			date = new Date(date-five_hour_offset);

			var date_string = gsappFetcher.formatDate(date);
			var date_string_for_box = gsappFetcher.formatDateForBox(date);

			// parse locations and assign css classes for color
			var locations_array = gsappFetcher.getLocationsFromHTML(
				event.field_event_location_value);

			var css_class_for_location = 
				gsappFetcher.getCSSColorClassForLocations(
					locations_array);
			
			// parse event types
			var types_array = gsappFetcher.getEventTypesFromHTML(event.field_event_taxonomy_type_value);
			
			// get the path to the node
			// TODO UPDATE path to prod
			var path = ['http://events.postfog.org/node/', event.nid].join('');
			
			// parse the body tag
			var event_description = gsappFetcher.parseEventBodyHTML(event.body);
			
			// for now we only care about the first 2 paragraphs if they are not empty
			var event_description_string = [
				event_description[0], event_description[1]].join(''); 
			
			// build the div
			var event_div = ['<div class="embedded-event">',
				'<a target="_blank" class="region" href="', path, '">', 
				'<div class="embedded-event-top-area">',
				'<div class="embedded-event-date-box ',
				css_class_for_location, '"><div>',
				date_string_for_box, '</div></div>',
				'<div class="embedded-event-title">', event.title, '</div>',
				'</div></a>', // end top area
				'<div class="embedded-event-body-area">',
				'<div class="embedded-event-type">', types_array[0], '</div>',
				'<div class="embedded-event-date">', date_string, '</div>',
				'<div class="embedded-event-location ',
				css_class_for_location, '">',
				locations_array[1], '</div>',
				'<div class="embedded-event-description">', event_description_string,
				'</div>',
				'<div class="embedded-event-description-more"><a href="', path, 
				'" target="_blank" alt="More information">...</a></div>',
				'<div class="embedded-event-image">', event.field_event_poster_fid,
				'</div>',
				'</div>', '</div>'].join('');
			$(elementName).append(event_div);
		}
		
		$("#tmpltzr .content #event-output .embedded-event-top-area").hover(function() {
			$(this).children(".embedded-event-date-box").addClass('filled');
		}, 
		function() {
			$(this).children(".embedded-event-date-box").removeClass('filled');
		});

		
		
		
	}