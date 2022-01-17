function __trap(err) {
		if (err) {
			// TODO: should throw instead of logging if no error handler
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else throw err;
		}
	}