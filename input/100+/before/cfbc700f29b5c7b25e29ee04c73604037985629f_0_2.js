function(m) {
					if (! m.get_chain) { return 'no chain'; }
					var vals = m.get_chain(['latitude','longitude']);
					if (vals && vals.length > 0) {
						return util.t("<%= latitude %>, <%= longitude %>", vals[0].attributes);							   
					} else {
						var names  = m.get_chain(['place name']);
						if (names && names.length > 0) {
							return names[0].get('place name');
						} else {
							return ':(';
						}
					}						   
					return ' ? ';
				}