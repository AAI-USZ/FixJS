function(scope, name) {
				return name in scope ? scope[name] : when.reject(name);
			}