function(){
			var originalUsage, i, callStack;
			for(i=0; i<arguments.length; i++) {
				if (typeof arguments[i] == "function" || (arguments[i] && typeof arguments[i] == "object") || arguments[i] === false) {
					if (arguments[i] !== jQuery) {
						// fix for jQuery 1.6 .one() + .unbind()
						if (typeof arguments[i] == "function" && jQuery.guid) {
							arguments[i].guid = arguments[i].guid || jQuery.guid++;
						}
						originalUsage = !originalUsage;
					}
					break;
				}
			}
			if (originalUsage) {
				return original.apply(this, arguments);
			}
			callStack = {};
			arguments[i] = function(){
				return (createTimedInvocationChain(jQuery(this), callStack))();
			};
			arguments.length = Math.max(arguments.length, i+1);
			return createPlaceholder(original.apply(this, arguments), callStack);
		}