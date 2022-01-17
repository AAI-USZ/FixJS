function(response) {
		var docs = response.response.docs;
		console.log(response);
		if(docs.length > 0 ) {
			//console.log('ColEvents.parse', docs);
			for (var i = 0; i < docs.length; i++) {
			/*
				$('#calendar').fullCalendar( 'renderEvent', {
					title: docs[i].name_primary,
					start: DateUtil.convertToDateObject(docs[i].event_date_time_local),
					allDay: false
				}, true );
			*/
			}
			console.log(this);
			return docs;
		} else {
			console.log('ColEvents: no event found for query');
			return {};
		}
	}