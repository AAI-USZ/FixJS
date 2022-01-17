function() {
				try {
          if(typeof(originalCallback) !== 'string') {
            return originalCallback.apply(this, arguments);
          }
				}
				catch (e) {
					TraceKit.report(e);
					throw e;
				}
			}