function _onEventPause(res) {
		var eventName = res.data.eventName.substr(9);
		var trace = new Trace.Trace("event", res.callFrames, eventName);
		$exports.triggerHandler("eventTrace", trace);
		Inspector.Debugger.resume();
	}