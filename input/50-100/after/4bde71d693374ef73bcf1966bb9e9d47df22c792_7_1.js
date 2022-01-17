function(eventInfo) {
		var timelineItemViews = this.meta('timelineItemViews');

		var tempItemView = new TimelineItemView();
		tempItemView.render(eventInfo);
		timelineItemViews.push(tempItemView);
	    this.meta('timelineItemViews', timelineItemViews);
	    $(this.el).append(tempItemView.el);
	}