function unload() {
		Inspector.off("connect", _onConnect);
		Inspector.off("Debugger.breakpointResolved", _onBreakpointResolved);
		Inspector.off("Debugger.globalObjectCleared", _onGlobalObjectCleared);
	}