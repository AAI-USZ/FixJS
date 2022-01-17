function(test){

			var that = this;

			this.requestOptions.path = "/api/user/" + this.user.uuid + "/profile";
			this.requestOptions.port = this.port;
			this.requestOptions.method = "GET";

			var request = http.get(this.requestOptions, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.profile.user === that.user.uuid);
					test.done();
				});
			});
		}