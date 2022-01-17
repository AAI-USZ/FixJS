function _onEventPause(res) {
		var eventName = res.data.eventName.substr(9);
		var trace = new Trace.Trace("event", res.callFrames, eventName);
		console.log(trace);
		$exports.triggerHandler("eventTrace", trace);
		_lastEvent = res;
		Inspector.Debugger.resume();
	}