function resolveVariableInTracepoint(variable, tracepoint) {
		var noGlobal = function (scope) { return scope.type !== "global"; };

		var result = new $.Deferred();

		var trace = tracepoint.trace[tracepoint.trace.length - 1];
		if (! trace || trace.callFrames.length === 0) { return result.reject(); }
		
		var callFrameIndex = 0;
		var callFrame = trace.callFrames[callFrameIndex];

		if (variable === "this" && callFrame.this) {
			resolveVariable(callFrame.this).done(result.resolve);
		}
		else {
			trace.resolveCallFrame(callFrameIndex).done(function () {
				var scopeChain = callFrame.scopeChain;
				for (var i = 0; i < scopeChain.length; i++) {
					var vars = scopeChain[i].resolved;
					if (vars && vars[variable]) {
						resolveVariable(vars[variable]).done(result.resolve);
						return;
					}
				}
				result.reject();
			});
		}

		return result.promise();
	}