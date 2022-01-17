function resolveVariableInTracepoint(variable, tracepoint) {
		var noGlobal = function (scope) { return scope.type !== "global"; };

		var result = new $.Deferred();

		var trace = tracepoint.trace[tracepoint.trace.length - 1];
		if (! trace || trace.callFrames.length === 0) { return result.reject(); }
		
		var callFrameIndex = 0;
		var callFrame = trace.callFrames[callFrameIndex];

		if (variable === "this" && callFrame.this) {
			return resolveVariable(callFrame.this).done(result.resolve);
		}
		else {
			trace.resolveCallFrame(callFrameIndex, noGlobal).done(function () {
				var scopeChain = callFrame.scopeChain;
				for (var i = 0; i < scopeChain.length; i++) {
					var vars = scopeChain[i].resolved;
					if (vars && vars[variable]) {
						return resolveVariable(vars[variable]).done(result.resolve);
					}
				}
				result.reject();
			});
		}
		

		return result.promise();
	}