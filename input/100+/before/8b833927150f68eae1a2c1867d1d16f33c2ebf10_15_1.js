function(test) {
		var course_id = "A827346H7ASDFG9";
	
		var options = {
			host:config.presenterServer.host,
			port:config.presenterServer.port,
			method:"GET",
			path:"/api/course/" + course_id,
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
				body.course.title === "Networking" &&
				body.course.number === 371);
				test.done();
			});
		});
	}