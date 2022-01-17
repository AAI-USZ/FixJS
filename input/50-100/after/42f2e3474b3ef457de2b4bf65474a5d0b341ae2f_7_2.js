function (done) {
			var client = errorCode(
				function () { return { status: { code: 400 } }; }
			);
			client({}).then(
				undefined,
				function (response) {
					assert.equals(400, response.status.code);
				}
			).always(done);
		}