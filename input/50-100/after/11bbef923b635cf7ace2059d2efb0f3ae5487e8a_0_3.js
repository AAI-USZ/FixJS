function(error, documents) {	
							if (error) {
								console.log(util.inspect(error, true, 7, true));
								return callback && callback();
							}
														
							self._broadcast(owner, {"command": "scheduledJob", "params": (documents && documents[0]) || {}});
							return callback && callback();
						}