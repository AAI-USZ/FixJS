function __trap(err) {
		if (err) {
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else __g.trampoline.queue(function() {
				throw err;
			});
		}
	}