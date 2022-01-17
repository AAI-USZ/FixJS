function () {
				var scopeChain = callFrame.scopeChain;
				for (var i = 0; i < scopeChain.length; i++) {
					var vars = scopeChain[i].resolved;
					if (vars && vars[variable]) {
						resolveVariable(vars[variable]).done(result.resolve);
						return;
					}
				}
				result.reject();
			}