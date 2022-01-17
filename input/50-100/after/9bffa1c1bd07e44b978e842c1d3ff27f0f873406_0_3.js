function unload() {
		Inspector.off("connect", _onConnect);
		Inspector.off("disconnect", _onDisconnect);
		Inspector.off("Debugger.paused", _onPaused);
		Inspector.off("Debugger.resumed", _onResumed);
		Inspector.off("Debugger.globalObjectCleared", _onGlobalObjectCleared);
		for (var i = 0; i < events.length; i++) {
			Inspector.DOMDebugger.removeEventListenerBreakpoint(events[i]);
		}
		$exports.off();
		_onDisconnect();
	}