function (result) {
			results.push(result);
			suitesFinished++;
			if(suitesFinished === suitesCreated) {
				//we are done with this Worker, send 
				that.logger.log(result);
				that._closeDb();
			}
		}