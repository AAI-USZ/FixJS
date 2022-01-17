function() {
				try {
					return originalCallback.apply(this, arguments);
				}
				catch (e) {
					TraceKit.report(e);
					throw e;
				}
			}