function(error){
			self.log("On-Demand error: " + error.code);
			stream.end();
		}