function(test){
			
			this.requestOptions.port   = this.port;
			this.requestOptions.method = "POST";
			this.requestOptions.path   = "/api/courses/";

			var that = this;

			var newCourse = {
						"title":"Graphics",
						"section":"D300",
						"subject":"CMPT",
						"number":361,
						"instructor":"BSDF787D981234AVD34"
					}

			Course.createCourse(newCourse, function(error, course){
				if(course){
					var request = http.request(that.requestOptions, function(response){
						var body = "";
						response.on('data', function (chunk) {
							body += chunk;
						}).on('end', function() {
							console.log(body);
							body = JSON.parse(body);
							test.ok(body.errorcode === 0 &&
								body.courses[0].title === "Graphics" && 
								body.courses[0].number === 361);
							test.done();
						});
					});

					var query = {
						subject:"CMPT",
						number: 361
					}

					request.write(JSON.stringify({where:query}));
					request.end();
				}
				else{
					test.ok(false);
					test.done();
				}
			});
		}