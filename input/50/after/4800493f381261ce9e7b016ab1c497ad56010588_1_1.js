function _onConnect() {
		Inspector.Debugger.enable();
		Inspector.DOMDebugger.setEventListenerBreakpoint("click");
		// load the script agent if necessary
		if (!LiveDevelopment.agents.script) {
			ScriptAgent.load();
		}
	}