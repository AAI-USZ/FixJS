function () {
			var scopeChain = trace.callFrames[callFrameIndex].scopeChain;
			for (var i = 0; i < scopeChain.length; i++) {
				var vars = scopeChain[i].resolved;
				if (vars && vars[variable]) {
					return result.resolve(vars[variable]);
				}
			}
			result.reject();
		}