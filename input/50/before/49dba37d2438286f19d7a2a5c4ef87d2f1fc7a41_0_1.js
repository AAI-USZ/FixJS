function() {
									var value = this.value, id = this.title
											|| this.id;
									ENME.params[id] = (value
											.match(/^(tru|fals)e$/i) ? value
											.toLowerCase() == "true" : value);
								}