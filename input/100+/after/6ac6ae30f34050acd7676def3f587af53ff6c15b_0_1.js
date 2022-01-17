function() {
			// Make a copy of the arguments
			var args = Array.prototype.slice.call(arguments, 0);
			var originalCallback = args[0];
			if(typeof(originalCallback) === 'function') {
				args[0] = function() {
					try {
						originalCallback.apply(this, arguments);
					} catch (e) {
						TraceKit.report(e);
						throw e;
					}
				};
			} 
			// IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
			// also only supports 2 argument and doesn't care what "this" is, so we
			// can just call the original function directly.
			if (originalFn.apply) {
				return originalFn.apply(this, args);
			}
			else {
				return originalFn(args[0], args[1]);
			}
		}