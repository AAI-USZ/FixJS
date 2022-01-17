function(error, job) {
			if (error) {
				console.log(util.inspect(error, false, 7, true));
				self.emit("error", error);
				return;
			}
			
			if (job && self._status === "idle") {
				collection.findAndModify({"_id": job._id}, [["_id", "asc"]], {"$set": {"s": "p"}}, {"safe": true}, function(error, upd) {
					if (error) {
						console.log(util.inspect(error, false, 7, true));
						return;
					}
										
					console.log("[processing] job " + job._id.toString());
					self._status = "processing";
					self._processing = upd;
					upd.o && self._broadcast(upd.o, {"command": "processJob", "params": upd});
				});
			}
		}