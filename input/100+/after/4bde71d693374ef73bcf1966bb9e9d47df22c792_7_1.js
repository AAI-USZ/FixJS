function(eventInfo) {
		this.meta('eventYear', eventInfo.get('eventYear'));
		this.meta('eventMonth', eventInfo.get('eventMonth'));
		var eventYear = eventInfo.get('eventYear');
		var month_number = this.getMonthName(eventInfo.get('eventMonth')) + ', ' + eventYear;
		
		var data = {'month_number': month_number};
		this.meta('month_number', month_number);
		$(this.el).append(this.template(data));
		
		var tempItemView = new TimelineItemView();
		tempItemView.render(eventInfo);
	    this.meta('timelineItemViews', [tempItemView]);
	    $(this.el).append(tempItemView.el);
	    
	    return this;
	}