function(test){
			this.requestOptions.path = "/api/users/";
			this.requestOptions.port = this.port;
			this.requestOptions.method = "POST";

			var request = http.request(this.requestOptions, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					console.log(body);
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.users[0].firstName === "Mike" && 
						body.users[0].userID === "mak10");
					test.done();
				});
			});
			var query = {
				firstName: "Mike",
				lastName: "Klemarewski"
			}
			request.write(JSON.stringify({where: query}));
			request.end();
		}