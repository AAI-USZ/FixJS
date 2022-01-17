function setTracepoint(location) {
		var breakpoint = new Breakpoint.Breakpoint(location);
		breakpoint.autoResume = true;
		breakpoint.trace = [];
		breakpoint.set();
		return breakpoint;
	}