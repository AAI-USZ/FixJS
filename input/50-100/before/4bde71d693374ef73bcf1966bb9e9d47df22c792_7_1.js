function(eventInfo) {
		console.log('adding event from MonthView');
		var timelineItemViews = this.meta('timelineItemViews');

		var tempItemView = new TimelineItemView(eventInfo);
	    this.meta('timelineItemViews', timelineItemViews.push(tempItemView));
	    $(this.el).append(tempItemView.el);
	}