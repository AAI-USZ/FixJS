function Trace(callFrames) {
		this.callFrames = callFrames;
		this.date = new Date();
		this.children = [];
		this._relateToTrace(_lastTrace);
		_lastTrace = this;
		console.log(this);
	}