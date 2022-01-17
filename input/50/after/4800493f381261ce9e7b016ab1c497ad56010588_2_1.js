function Trace(callFrames, event) {
		this.callFrames = callFrames;
		// if (event && _compareCallFrames(callFrames, event.callFrames) >= 1) {
		this.event = event;
		// }
		this.date = new Date();
		this.children = [];
		this._relateToTrace(_lastTrace);
		_lastTrace = this;
	}