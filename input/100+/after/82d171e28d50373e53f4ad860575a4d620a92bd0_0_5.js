function(error, upd) {
					if (error) {
						console.log(util.inspect(error));
						return;
					}
										
					console.log("[processing] job " + job._id.toString());
					self._status = "processing";
					self._processing = upd;
					upd.o && self._broadcast(upd.o, {"command": "processJob", "params": upd});
				}