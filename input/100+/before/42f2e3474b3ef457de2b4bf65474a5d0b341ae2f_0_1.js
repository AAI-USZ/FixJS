function never(done) {
		return function () {
			assert(false, 'this method should never be invoked');
			done();
		};
	}