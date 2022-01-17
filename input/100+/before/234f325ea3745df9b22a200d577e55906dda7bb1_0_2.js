function(res) {
					ph.exit();

					if (res.hotel.thumbnail) {
						res.hotel.thumbnail = _url.resolve(url, res.hotel.thumbnail);
					}
					res.hotel.url = url;
					zuji.insertHotel(res.hotel, worker.mysql, function(err, hotel_id) {
						if (err) {
							cb(err, false);
						} else {
							if (res.hotel.desc) {
								var descurl = _url.resolve(url, res.hotel.desc);
								worker.newWork('zuji', 'getHotelDescription', [hotel_id, descurl] );
							}


							var promises = [];
							for (var i=0;i<res.reviews.length;++i) {
								promises.push(
									q.ncall(zuji.insertReview, zuji, hotel_id, res.reviews[i], worker.mysql));
							}

							q
							.allResolved(promises)
							.then(function(promises) {
								var err = [];
								var done = [];
								promises.forEach(function(promise) {
									if (promise.isFulfilled()) {
										done.push(promise.valueOf());
									} else {
										err.push(promise.valueOf().exception);
									}
								});

								cb(err.length ? err : null, done);
							});

						}
					});

				}