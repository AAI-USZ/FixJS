function (error, response, body) {
			if (self.events["look"]){
				self.events["look"](body);
			}

		  if (!error && response.statusCode == 200) {
		  	if (body != self.lastBody){
			    if (self.events["change"]){
						self.events["change"](body);
					}
				}
		  }
		  else {
		  	if (self.events["error"]){
					self.events["error"](error, response.statusCode);
				}
		  }
		}