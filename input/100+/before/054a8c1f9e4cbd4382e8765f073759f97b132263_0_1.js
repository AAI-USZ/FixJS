function buildEventsForChannelSlice(channelSliceEvents, cacheKey) {

		var i, events, event, width, left, right, startDateTime, endDateTime, category, subcategory, eventId, programmeId, channelId, eventTitle, offset, content,
			eventCollection = document.createDocumentFragment(), link = document.createElement('a'), eventElement, ids = [];

		for (i = 0; i < channelSliceEvents.length; i++) {

			event = channelSliceEvents[i];
			eventId = event.id;

			// avoid duplicate events ;)
			if (_shadow.querySelectorAll('#event-' + eventId)[0]) {
				//console.log('duplicated');
				continue;
			}

			eventTitle = event.programme.title;

			// Time data
			startDateTime = convert.parseApiDate(event.startDateTime);
			endDateTime = convert.parseApiDate(event.endDateTime);

			// size data
			width = convert.timeToPixels(endDateTime, startDateTime);
			left = convert.timeToPixels(startDateTime, g.ZERO);
			offset = left + width;

			// avoid events outside view
			if (offset < 0) {
				continue;
			}

			// adjust left 
			if (left < 0) {
				right = left + width;
				left = 0;
				width = right;
				eventTitle = "←" + event.programme.title;
			}

			// ids
			programmeId = event.programme.id;
			channelId = event.channel.id;

			// Category and subcategory
			category = event.programme.subcategory.category.name;
			subcategory = event.programme.subcategory.name;

			// define content
			eventTitle = document.createTextNode(eventTitle);

			// define element
			eventElement = link.cloneNode(false);
			eventElement.id = 'event-' + eventId;
			eventElement.className = 'grid-event';
			eventElement.href = '/programme/' + programmeId;
			eventElement.style.width = width + 'px';
			eventElement.style.left = left + 'px';
			eventElement.setAttribute('data-category', category);
			eventElement.setAttribute('data-subcategory', subcategory);
			eventElement.appendChild(eventTitle);

			// Insert			
			eventCollection.appendChild(eventElement);

		} // end loop

		return eventCollection;

	}