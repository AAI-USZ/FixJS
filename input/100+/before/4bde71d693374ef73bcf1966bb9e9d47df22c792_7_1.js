function(eventInfo) {
		this.meta('eventYear', eventInfo.eventYear);
		this.meta('eventMonth', eventInfo.eventMonth);
		var eventYear = eventInfo.eventYear;
		var month_number = this.getMonthName(eventInfo.eventMonth) + ', ' + eventYear;
		
		var data = {'month_number': month_number};
		this.meta('month_number', month_number);
		$(this.el).append(this.template(data));
		
		var tempItemView = new TimelineItemView(eventInfo);
	    this.meta('timelineItemViews', [tempItemView]);
	    $(this.el).append(tempItemView.el);
	    
	    return this;
	}