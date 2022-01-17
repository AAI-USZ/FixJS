function() {
								for(var i = 0; i < hooks[status].funcs.length; i++) {
									attr = attr.replace(/__!@#\$%__/, function() {
										return hooks[status].funcs[i].call(self);
									});
								}

								return attr;
							}