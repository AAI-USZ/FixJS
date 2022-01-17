function _onConnect() {
		Inspector.Debugger.enable();
		// load the script agent if necessary
		if (!LiveDevelopment.agents.script) {
			ScriptAgent.load();
		}
	}