function set(name, value, defaultFunction) {
			// @cond if (name == null) error("First argument must be set!");
			if (value === undef) 
				each(name, function(n,v) { list['set'](n, v,defaultFunction); });
			else {
				// @cond if (!/string/i.test(typeof name)) error('If second argument is given, the first one must be a string specifying the property name");
				var components = getNameComponents(name), len = components.length-1, i;
				var n = name.substring(1);
				var f = typeof value == 'function' ? value : (defaultFunction || function(){ return value; });
				eachlist((/^@/.test(name)) ? 
					function(obj, c) {
						obj.setAttribute(n, f(obj, obj.getAttribute(n), c, value));
					}
					:
					function(obj, c) {
						for (i = 0; i < len; i++)
							obj = obj[components[i]];
						obj[components[len]] = f(obj, obj[components[len]], c, value);
					});
			}
			return list;
		}