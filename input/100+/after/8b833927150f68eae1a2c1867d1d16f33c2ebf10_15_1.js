function(test) {
			var user_id = "A7S7F8GA7SD98A7SDF8ASD7G";
		
			var options = {
				host:config.presenterServer.host,
				port:this.port,
				method:"GET",
				path:"/api/user/" + user_id,
				headers: {
					"content-type": "application/json"
				}
			}
		
			var request = http.get(options, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.user.firstName === "Mike" && 
						body.user.userID === "mak10");
					test.done();
				});
			});
		}