function never(done) {
		return function () {
			assert(false, 'should never be called');
			done();
		};
	}