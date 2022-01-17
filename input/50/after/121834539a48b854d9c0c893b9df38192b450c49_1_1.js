function(err, tmpl) {
								if(err) return callCallbacks(tmp.cb, err);
								if(++done == dependencies.length)
									callCallbacks(tmp.cb);
							}