function _onPaused(res) {
		// res = {callFrames, reason, data}
		if (res.reason !== "other") return;
		res.location = res.callFrames[0].location;
		var breakpoints = Breakpoint.findResolved(res.location);
		// Halt if no breakpoints match (i.e. when clicking pause)
		var halt = breakpoints.length === 0;
		// Otherwise halt only for breakpoints autoResume == false
		for (var i in breakpoints) {
			var b = breakpoints[i];
			b.addTrace(res);
			if (!b.autoResume || _breakOnTracepoints) {
				halt = true;
			} else {
				$exports.triggerHandler("trace", b);
			}
		}
		if (halt) {
			res.location.url = ScriptAgent.scriptWithId(res.location.scriptId).url;
			_paused = res;
			$exports.triggerHandler("paused", _paused);
		} else {
			resume();
		}
	}