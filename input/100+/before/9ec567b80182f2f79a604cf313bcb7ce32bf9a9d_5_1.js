function(){
				console.log("created database");
				var self = this;
				this.server = express.createServer();
				this.server.use(server)
				this.server.listen(function() {
					self.port = this.address().port;
					callback();
				});
			}