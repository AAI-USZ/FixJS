function(error, collection) {
		// Grab the highest priority and oldest job that's been scheduled before now
		collection.findOne({"s": "s", "w": {"$lt": Date.now()}}, {}, {"sort": {"p": -1, "w": 1}}, function(error, job) {
			if (error) {
				self.emit("error", error);
			}
			else if (job && self._status === "idle") {
				collection.findAndModify({"_id": job._id}, [["_id", "asc"]], {"$set": {"s": "p"}}, {"safe": true}, function(error, upd) {
					console.log("[processing] job " + job._id.toString());
					self._status = "processing";
					self._processing = upd;
					upd.o && self._broadcast(upd.o, {"command": "processJob", "params": upd});
				});
			}
		});
	}