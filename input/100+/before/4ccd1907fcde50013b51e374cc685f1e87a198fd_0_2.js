function resolveVariable(tracepoint, variable) {
		var noGlobal = function (scope) { return scope.type !== "global"; };

		var result = $.Deferred();

		var trace = tracepoint.trace[tracepoint.trace.length - 1];
		if (! trace || trace.callFrames.length === 0) { return result.reject(); }
		var callFrameIndex = 0;
		trace.resolveCallFrame(callFrameIndex, noGlobal).done(function () {
			var scopeChain = trace.callFrames[callFrameIndex].scopeChain;
			for (var i = 0; i < scopeChain.length; i++) {
				var vars = scopeChain[i].resolved;
				if (vars && vars[variable]) {
					return result.resolve(vars[variable]);
				}
			}
			result.reject();
		});

		return result.promise();
	}