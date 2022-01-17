function next() {
		var step = steps[pos++];
		if (!step) {
			if (callback) {
				callback.apply(null, arguments);
			} else {
				// if there was an unhandled error, handle it globally
				arguments[0] && ff.onerror.apply(null, arguments);
			}
			return;
		}
		var group = new Group(next);
		try {
			// make sure next function isnt applied
			// until current function has completed
			group.left++;
			step.apply(group, arguments);
			group.left--;
		} catch (e) {
			group.left--;
			if (e === DONE_EXCEPTION) {
				return; // don't call anything else.
			}
			group.error(e); // try-catch added by mcav
		}
		if (group.left === 0) group.done();
	}