function(error, collection) {
		if (error) {
			console.log("error generating collection")
			console.log(util.inspect(error, true, 7, true));
			return;
		}
				
		// Grab the highest priority and oldest job that's been scheduled before now
		collection.findOne({"s": "s", "w": {"$lt": Date.now()}}, {}, {"sort": {"p": -1, "w": 1}}, function(error, job) {
			if (error) {
				console.log(util.inspect(error, true, 7, true));
				self.emit("error", error);
				return;
			}
			
			if (job && self._status === "idle") {
				collection.findAndModify({"_id": job._id}, [["_id", "asc"]], {"$set": {"s": "p"}}, {"safe": true}, function(error, upd) {
					if (error) {
						console.log(util.inspect(error, true, 7, true));
						return;
					}
										
					console.log("[processing] job " + job._id.toString());
					self._status = "processing";
					self._processing = upd;
					upd.o && self._broadcast(upd.o, {"command": "processJob", "params": upd});
				});
			}
		});
	}