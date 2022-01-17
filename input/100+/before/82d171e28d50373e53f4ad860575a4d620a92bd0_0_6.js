function(error, prev) {
						if (error) {
							console.log(error);
							callback && callback();
						}
						else if (prev.length) {
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
								callback && callback();								
							}
						}
						else {							
							collection.insert(job, {"safe": true}, function(error, documents) {	
								self._broadcast(owner, {"command": "scheduledJob", "params": (documents && documents[0]) || {}});
								callback && callback();
							});
						}
					}