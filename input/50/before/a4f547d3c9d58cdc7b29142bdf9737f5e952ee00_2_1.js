function(err, tmpl) {
								if(err) throw err;
								if(++done == dependencies.length)
									x();
							}