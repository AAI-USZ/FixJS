function _summarizeTrace(trace) {
		var summary = {};
		
		summary.frame    = trace.callFrames[0];
		summary.fn       = summary.frame.functionName;
		summary.location = summary.frame.location;
		summary.scriptId = summary.location.scriptId;
		summary.line     = summary.location.lineNumber;
		summary.column   = summary.location.columnNumber;
		summary.url      = ScriptAgent.scriptWithId(summary.scriptId).url;
		summary.file     = summary.url.replace(/^.*\//, '');
		if (trace.event) {
			summary.event = trace.event.data.eventName.replace(/^listener:/, '');
		}

		return summary;
	}