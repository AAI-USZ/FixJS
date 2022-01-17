function(eventInfo) {
		var tempEventView = new TimelineEventView(eventInfo);
		tempEventView.render(eventInfo);
		var timelineEventViews = this.meta('timelineEventViews');
		timelineEventViews.push(tempEventView);
	    this.meta('timelineEventViews', timelineEventViews);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
		return this.el;
	}