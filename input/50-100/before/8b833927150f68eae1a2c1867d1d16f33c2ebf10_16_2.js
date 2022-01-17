function() {
				body = JSON.parse(body);
				test.ok(body.errorcode === 0);
				test.done();
			}