function (done) {
			when(
				registry.lookup('application/bogus'),
				never(done),
				function () {
					assert(true);
					done();
				}
			);
		}