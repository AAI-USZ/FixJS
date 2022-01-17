function update_dates_for_event_on_the_server(theEvent, startDate, endDate, band, title, description) {
  saveCenterDate();
	if (!typeof description === "undefined") { 
		$.put("/events/" + theEvent,
	    { 'event':
	      {
	        'start_date': startDate.toString(),
	        'end_date': endDate.toString(),
			'band': band.toString(),
			'title': title.toString(),
			'description': description.toString()
	      }
	    });
	}
	else { 
		$.put("/events/" + theEvent,
	    { 'event':
	      {
	        'start_date': startDate.toString(),
	        'end_date': endDate.toString(),
			'band': band.toString(),
			'title': title.toString()
	      }
	    });	
	}
}