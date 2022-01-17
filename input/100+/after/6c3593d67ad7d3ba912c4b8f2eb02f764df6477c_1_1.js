function Trace(type, callFrames, event) {
		this.type = type;
		this.callFrames = callFrames;
		this.event = event;
		this.date = new Date();
		this.children = [];

		// compute the location and id of the trace
		this.location = this.callFrames[0].location;
		this.location.url = ScriptAgent.scriptWithId(this.location.scriptId).url;
		var name = this.location.url.replace(/^.*\//, '');
		this.id = this.baseId = name + ":" + (this.location.lineNumber + 1);

		// connect the trace to its siblings
		_setupTraceTree(this);
	}