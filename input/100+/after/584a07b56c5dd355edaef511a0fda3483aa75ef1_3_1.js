function(test) {
			this.requestOptions.method = "PUT";
			this.requestOptions.path   = "/api/comment/" + commentUUID;

			var request = http.request(this.requestOptions, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0);
					test.done();
				});
			});
			request.write(JSON.stringify({ body: commentBody }));
			request.end();
		}