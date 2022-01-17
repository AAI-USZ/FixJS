function(error, collection) {
			if (error) {
				console.log(util.inspect(error, false, 7, true));
				return callback && callback();
			}
			
			collection.findAndModify({"_id": new self._store.bson_serializer.ObjectID(params.id), "s": "p"}, [["id", "asc"]], {"$set": {"s": "f"}}, {"safe": true, "upsert": false}, function(error, upd) {
				if (error) {
					console.log(util.inspect(error, false, 7, true));
					return callback && callback();
				}
								
				if (upd) {
					console.log("[finished] job " + ((upd && upd._id && upd._id.toString()) || ""));
					upd.o && self._broadcast(owner, {"command": "finishedJob", "params": upd || {}});
					
					if (upd && upd.r) {
						// Reschdule this job for the fuuuuuture
						self.schedule(owner, {"when": Date.now() + upd.r, "reschedule": upd.r, "xid": upd.xid, "ext": upd.x || {}, "type": upd.t});
					}
				}
				
				return callback && callback();
			});
		}