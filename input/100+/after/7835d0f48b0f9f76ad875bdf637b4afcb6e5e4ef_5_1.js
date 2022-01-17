function(eventInfo) {
		var self = this;
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var dateObj = new Date(eventYear, eventMonth, eventDate);
		
		if (eventDate < 10) {
			eventDate = '0' + eventDate;
		}

		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));

		setTimeout(function(){$(self.el).fadeIn('slow');}, window.cascadeTimeout);
		window.cascadeTimeout = window.cascadeTimeout + 200;

		var tempEventView = new TimelineEventView();
		tempEventView.render(eventInfo);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);


		var today = new Date();
		if (eventYear === today.getFullYear()) {
			if (eventMonth === today.getMonth()) {
				if (eventDate === today.getDate()) {
					$(this.el).find('.dateNumber').addClass('today');
					$(this.el).find('.dateSlateBackground').addClass('today');
					$(this.el).find('.dateName').addClass('today');
				}
			}
		}
		return this.el;
	}