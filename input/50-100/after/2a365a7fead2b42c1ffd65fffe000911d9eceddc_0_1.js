function(err, location) {
							obj = {
								city: location.city
	            				, latitude: location.latitude
	            				, longitude: location.longitude
	            				, ip: ip
								, timestamp: time
							}
							self.bayeux.getClient().publish('/stat', obj);
							// write to riak cluster
							//db.save('users', ip, obj, { index: {timestamp: time} });
							//console.log('was saved in the riak cluster');
					}