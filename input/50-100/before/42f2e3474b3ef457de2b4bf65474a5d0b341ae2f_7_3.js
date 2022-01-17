function (done) {
			var client = errorCode(
				function () { return { status: { code: 300 } }; },
				{ code: 300 }
			);
			client({}).then(
				function (response) {
					assert.fail('success handler should not be involved');
					done();
				},
				function (response) {
					assert.equals(300, response.status.code);
					done();
				}
			);
		}