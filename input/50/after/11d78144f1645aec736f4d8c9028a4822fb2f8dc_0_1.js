function(scope, segment) {
				return segment in scope
					? scope[segment]
					: when.reject('Cannot resolve ref: ' + name);
			}