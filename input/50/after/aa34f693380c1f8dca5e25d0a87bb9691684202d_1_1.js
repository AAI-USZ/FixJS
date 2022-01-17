function () {
		try {
			actions[self.action].run(self);
		} catch (e) {
			console.error(util.format('Error in action "%s": %s', self.action, e.message || e));
		}
	}