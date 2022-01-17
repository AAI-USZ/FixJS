function(test) {
		
			this.requestOptions.port = this.port;
			this.requestOptions.method = "GET";
			this.requestOptions.path = "/api/course/" + this.course.uuid;
		
			var request = http.get(this.requestOptions, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
					body.course.title === "Algorithms" &&
					body.course.number === 307);
					test.done();
				});
			});
		}