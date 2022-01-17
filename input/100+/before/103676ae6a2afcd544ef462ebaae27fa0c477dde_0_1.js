function onEventTrace(e, trace) {
		var summary = _summarizeTrace(trace);
		
		var $event = $('<div class="event">')
			.data('trace', trace)
			.append($('<div class="time">').text(_formatTime(trace.date)))
			.append($('<div class="function">').text(summary.fn))
			.append($('<div class="type">').text(summary.event))
			.append($('<div class="file">').text(summary.file + ":" + (summary.line + 1)))
			.prependTo($events);
	}