function(error, cursor) {
				if (error) {
					console.log(util.inspect(error, false, 7, true));
					return callback && callback();
				}
				
				cursor.toArray(function(error, prev) {
					if (error) {
						console.log(util.inspect(error, false, 7, true));
						return callback && callback();
					}
					
					if (prev.length) {
						if (job.w > prev[0].w) {
							collection.findAndModify(
									{"_id": prev[0]._id},
									[["_id", "asc"]],
									{"$set": {"w": job.w}}, 
									{"safe": true, "multi": false, "upsert": false, "new": true},
									function(error, upd) {
								self._broadcast(owner, {"command": "scheduledJob", "params": upd || {}});
								callback && callback();
							});
						}
						else {
							self._broadcast(owner, {"command": "scheduledJob", "params": prev[0]});								
							return callback && callback();								
						}
					}
					else {							
						collection.insert(job, {"safe": true}, function(error, documents) {	
							if (error) {
								console.log(util.inspect(error, false, 7, true));
								return callback && callback();
							}
														
							self._broadcast(owner, {"command": "scheduledJob", "params": (documents && documents[0]) || {}});
							return callback && callback();
						});
					}
				});
			}