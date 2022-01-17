function (done) {
			var client = errorCode(
				function () { return { status: { code: 400 } }; }
			);
			client({}).then(
				function (response) {
					assert.fail('success handler should not be involved');
					done();
				},
				function (response) {
					assert.equals(400, response.status.code);
					done();
				}
			);
		}