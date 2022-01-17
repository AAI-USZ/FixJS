function (result) {
			results.push(result);
			suitesFinished++;
			if(suitesFinished === suitesCreated) {
				//we are done with this Worker, send 
				that.logger.log(results);
				that._closeDb();
				var clusterInstance = cluster.worker;
				clusterInstance.destroy();
			}
		}