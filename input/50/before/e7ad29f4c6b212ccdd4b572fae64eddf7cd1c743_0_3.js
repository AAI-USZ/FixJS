function() {
			var param = args || arguments;
			return _fn.apply(scope || window, param)
		}