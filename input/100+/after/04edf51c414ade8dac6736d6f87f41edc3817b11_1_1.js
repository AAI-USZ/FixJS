function _traceChildrenForTree(parent) {
		var children = [];

		for (var i = 0; i < parent.children.length; i++) {
			var trace = parent.children[i];
			if (!trace.script()) break;

			var child = {
				data: "[" + trace.locationName() + "] " + trace.functionName(),
				metadata: { trace: trace }
			};
			if (trace.children && trace.children.length > 0) {
				child.state = "open";
				child.children = _traceChildrenForTree(trace, false);
			}
			children.push(child);
		}

		return children;
	}