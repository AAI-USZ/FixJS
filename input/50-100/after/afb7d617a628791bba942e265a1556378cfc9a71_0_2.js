function updateTimeText(minuteDelta) {
			var newStart = addMinutes(cloneDate(event.start), minuteDelta);
			var newEnd;
			if (event.end) {
				newEnd = addMinutes(cloneDate(event.end), minuteDelta);
			}
			timeElement.text(formatDates(newStart, newEnd, opt('timeFormat')));
			console.log("!!!!");
		}