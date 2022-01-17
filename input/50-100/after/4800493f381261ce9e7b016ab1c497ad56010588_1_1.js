function unload() {
		Inspector.off("connect", _onConnect);
		Inspector.off("disconnect", _onDisconnect);
		Inspector.off("Debugger.paused", _onPaused);
		Inspector.off("Debugger.resumed", _onResumed);
		Inspector.DOMDebugger.removeEventListenerBreakpoint("click");
		$exports.off();
		_onDisconnect();
	}