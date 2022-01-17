function(eventInfo) {
		var self = this;
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var dateObj = new Date(eventYear, eventMonth, eventDate);
		
		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));

		setTimeout(function(){$(self.el).fadeIn('slow');}, window.cascadeTimeout);
		window.cascadeTimeout = window.cascadeTimeout + 200;
		//setTimeout(function(){}, 1000);
		//window.cascadeTimeout = window.cascadeTimeout + 1000;

		var tempEventView = new TimelineEventView();
		tempEventView.render(eventInfo);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
		return this.el;
	}