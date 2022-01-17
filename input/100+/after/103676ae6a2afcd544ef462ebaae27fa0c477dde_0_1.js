function onEventTrace(e, trace) {
		var summary = _summarizeTrace(trace);
		
		var $event = $('<div class="fresh event">')
			.data('trace', trace)
			.append($('<div class="time">').text(_formatTime(trace.date)))
			.append($('<div class="type">').text(summary.event))
			.prependTo($events)
			.removeClassDelayed("fresh");
	}