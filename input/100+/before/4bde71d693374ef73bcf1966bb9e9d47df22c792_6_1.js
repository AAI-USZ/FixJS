function(eventInfo) {
		var eventDate = eventInfo.eventDate;
		var eventMonth = eventInfo.eventMonth;
		var eventYear = eventInfo.eventYear;
		var dateObj = new Date(eventYear, eventMonth, eventDate);
		
		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));
		
		var tempEventView = new TimelineEventView(eventInfo);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
		return this.el;
	}