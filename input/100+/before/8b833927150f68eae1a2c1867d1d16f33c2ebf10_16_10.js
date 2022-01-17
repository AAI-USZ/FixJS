function() {
				body = JSON.parse(body);
				test.ok(body.errorcode === 1);
				test.done();
			}