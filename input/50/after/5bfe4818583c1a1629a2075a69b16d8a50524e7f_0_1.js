function executeInitializers() {
			return sequence(contextHandlers.init, context);
		}