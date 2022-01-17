function (done) {
			var client = errorCode(
				function () { return { status: { code: 300 } }; },
				{ code: 300 }
			);
			client({}).then(
				undefined,
				function (response) {
					assert.equals(300, response.status.code);
				}
			).always(done);
		}