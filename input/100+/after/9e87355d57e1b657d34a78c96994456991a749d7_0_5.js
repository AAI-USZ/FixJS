function(events, rowStartDate, rowEndDate, celDate) {
			var instance = this;

			var key = String(celDate.getTime());

			if (!instance.evtRenderedStack[key]) {
				instance.evtRenderedStack[key] = [];
			}

			for (var i = 0; i < events.length; i++) {
				var evt = events[i];

				var startDate = evt.get(START_DATE);

				var isEventDateContinuation = DateMath.after(celDate, startDate) && !DateMath.isDayOverlap(celDate, rowStartDate);
				var isEventStartDateDay = !DateMath.isDayOverlap(startDate, celDate);

				var isRendered = A.Array.indexOf(instance.evtRenderedStack[key], evt) > -1;

				if (!isRendered && (isEventStartDateDay || isEventDateContinuation)) {
					return evt;
				}
			}

			return null;
		}