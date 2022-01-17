function _onConnect() {
		Inspector.Debugger.enable();
		for (var i = 0; i < _breakEvents.length; i++) {
			Inspector.DOMDebugger.setEventListenerBreakpoint(_breakEvents[i]);
		}
		// load the script agent if necessary
		if (!LiveDevelopment.agents.script) {
			ScriptAgent.load();
		}
	}