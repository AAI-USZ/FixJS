function(match, code) {
			var v = eval(code);
			return v ? resolveDefs(c, v, def) : v;
		}