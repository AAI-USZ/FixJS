function setTracepoint(location) {
		var breakpoint = new Breakpoint.Breakpoint(location, undefined, true);
		breakpoint.set();
		return breakpoint;
	}