function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.comment.user === userUid &&
						body.comment.body === questionBody);
					test.done();
				});
			}