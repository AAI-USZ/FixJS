function(result) {
				if(result){
					that.requestOptions.method = "PUT";
					that.requestOptions.path = "/api/question/" + questionID + "/unfollow";
					var request = http.request(that.requestOptions, function(response){
						var body = "";
						response.on('data', function (chunk) {
							body += chunk;
						}).on('end', function() {
							body = JSON.parse(body);
							test.ok(body.errorcode === 0 &&
								body.question._id === questionID);
							test.done();
						});
					}).end();
				}
				else{
					test.ok(false);
					test.done();
				}
			}