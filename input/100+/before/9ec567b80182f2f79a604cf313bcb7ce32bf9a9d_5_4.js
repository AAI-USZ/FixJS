function(test) {
		
			var newCourse = {
				"title":"Algorithms",
				"section":"D100",
				"subject":"CMPT",
				"number":307,
				"instructor":"BSDF787D98A7SDF8ASD7G"
			}

			Course.createCourse(newCourse, function(error, course){
				if(course){

					var options = {
						host:config.presenterServer.host,
						port:this.port,
						method:"GET",
						path:"/api/course/" + course.uuid,
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
							body.course.title === "Algorithms" &&
							body.course.number === 307);
							test.done();
						});
					});
				}
			});	
		}