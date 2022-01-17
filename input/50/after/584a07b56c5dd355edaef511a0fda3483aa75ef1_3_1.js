function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.comment._source.body &&
						body.comment._source.user);
					test.done();
				}