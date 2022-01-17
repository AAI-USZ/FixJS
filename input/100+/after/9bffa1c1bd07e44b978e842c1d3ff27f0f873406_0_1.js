function _onBreakpointPause(callFrames) {
		// read the location from the top callframe
		var loc = callFrames[0].location;

		// find the breakpoints at that location
		var breakpoints = Breakpoint.findResolved(loc);

		// determine whether to actually halt by asking all breakpoints
		var halt = _breakOnTracepoints;
		var trace, b;
		for (var i in breakpoints) {
			b = breakpoints[i];
			b.triggerPaused(callFrames);
			if (b.haltOnPause) halt = true;
		}

		// gather some info about this pause and send the "paused" event
		_paused = { location: loc, callFrames: callFrames, breakpoints: breakpoints, halt: halt };
		$exports.triggerHandler("paused", _paused);
		
		// halt (if so determined)
		if (!halt) {
			Inspector.Debugger.resume();
		}
	}