function() {

	var reference = this.passages[this.passageId].getReference();

	var self = this;



	//load events from server

	$.getSafe(TIMELINE_GET_EVENTS_FROM_REFERENCE + reference, function(data, url) {

		

		//move timeline to different date

		//assuming first band is main band

		

		if(data.suggestedDate) {

			self.tl.getBand(0).setCenterVisibleDate(Timeline.DateTime.parseIso8601DateTime(data.suggestedDate));

			self.addMultipleEventsAndRefresh(data);			

		}

		

		// now that we have repositioned the timeline, we can try and 

		// get the other events within the visible time period

		self.showVisibleEvents(self.tl.getBand(0));

	});

}