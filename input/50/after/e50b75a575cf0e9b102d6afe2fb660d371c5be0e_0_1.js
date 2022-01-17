function _onBreakpointResolved(res) {
		// res = {breakpointId, location}
		var breakpoint = _breakpoints[res.breakpointId];
		if (breakpoint) {
			breakpoint._addResolvedLocations([res.location]);
		}
	}