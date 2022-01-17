function(eventInfo) {
		//TODO: WRITE THIS
		var tempEventView = new TimelineEventView(eventInfo);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
		return this.el;
	}