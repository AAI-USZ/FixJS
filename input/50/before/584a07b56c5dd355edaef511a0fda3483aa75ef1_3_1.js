function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.comment.body &&
						body.comment.user);
					test.done();
				}