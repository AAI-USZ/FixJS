function (done) {
			when(
				registry.lookup('application/bogus'),
				undefined,
				function () {
					assert(true);
				}
			).always(done);
		}