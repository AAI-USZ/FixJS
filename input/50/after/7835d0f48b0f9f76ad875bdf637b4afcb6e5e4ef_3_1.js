function(eventDateObj) {
		this.set({
			eventYear: eventDateObj.getFullYear(),
			eventMonth: eventDateObj.getMonth(),
			eventDate: eventDateObj.getDate(),
		});
	}