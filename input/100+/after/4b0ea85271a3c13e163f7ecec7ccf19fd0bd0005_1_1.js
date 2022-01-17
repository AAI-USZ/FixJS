function _onPaused(res) {
		// res = {callFrames, reason, data}

		// ignore breaks that are not related to breakpoints (event / DOM)
		if (res.reason !== "other") return;

		// read the location from the top callframe
		var loc = res.callFrames[0].location;

		// find the breakpoints at that location
		var breakpoints = Breakpoint.findResolved(loc);

		// determine whether to actually halt by asking all breakpoints
		var halt = _breakOnTracepoints;
		for (var i in breakpoints) {
			var b = breakpoints[i];
			b.triggerPaused(res.callFrames);
			if (b.haltOnPause) halt = true;
		}

		// halt (if so determined)
		if (!halt) {
			Inspector.Debugger.resume();
		}

		// gather some info about this pause and send the "paused" event
		_paused = { location: loc, callFrames: res.callFrames, breakpoints: breakpoints, halt: halt };
		$exports.triggerHandler("paused", _paused);
	}