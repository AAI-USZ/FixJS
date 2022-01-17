function(callback) {

			var that = this;

			this.requestOptions = {
				host:config.presenterServer.host,
				headers: {
					"content-type": "application/json"
				}
			}

			queries.dropDB(config.mysqlDatabase["db-name"], function(){
				queries.createDB(config.mysqlDatabase["db-name"], function(){
					
					var newCourse = {
						"title":"Algorithms",
						"section":"D100",
						"subject":"CMPT",
						"number":307,
						"instructor":"BSDF787D98A7SDF8ASD7G"
					}

					Course.createCourse(newCourse, function(error, course){
						if(course){
							that.course = course;
							that.server = express.createServer();
							that.server.use(server);
							that.server.listen(function() {

								that.port = this.address().port;
								callback();
							});
						}
						else{
							callback();
						}
					});

				});
			});
/*
			queries.createDB(config.mysqlDatabase["db-name"], function(){
				console.log("created database");
				var self = this;
				this.server = express.createServer();
				this.server.use(server)
				this.server.listen(function() {
					self.port = this.address().port;
					callback();
				});
			});
*/
		}