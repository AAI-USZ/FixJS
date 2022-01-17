function _onEventPause(res) {
		var trace = new Trace.Trace("event", res.callFrames);
		console.log(trace);
		$exports.triggerHandler("eventTrace", trace);
		_lastEvent = res;
		Inspector.Debugger.resume();
	}