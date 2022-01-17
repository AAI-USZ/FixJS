function _setupTraceTree(trace) {

		// close a function
		if (trace.type === "function.end") {
			_lastParent = _lastParent.parent;
			return;
		}

		// connect the trace to the last parent
		if (trace.type !== "event" && _lastParent) {
			_lastParent.children.push(trace);
			trace.parent = _lastParent;
		}

		// track root traces
		if (trace.type === "event" || !_lastParent) {
			_rootTraces.push(trace);
		}

		// make this trace the last parent
		_lastParent = trace;
	}