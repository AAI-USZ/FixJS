function _onConnect() {
		Inspector.Debugger.enable();
		for (var i = 0; i < events.length; i++) {
			Inspector.DOMDebugger.setEventListenerBreakpoint(events[i]);
		}
		// load the script agent if necessary
		if (!LiveDevelopment.agents.script) {
			ScriptAgent.load();
		}
	}