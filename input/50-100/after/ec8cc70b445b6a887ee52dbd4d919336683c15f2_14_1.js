function() {
								var i =0;
								var newAttr = attr.replace(/__!@#\$%__/g, function() {
									return hooks[status].funcs[i++].call(self);
								});
								return newAttr;
							}