function(inPaths) {
		var modules = [];
		var currentLabel;
		var next = function(inSender, inData) {
			if (inData) {
				for (var i = 0; i < inData.modules.length; ++i) {
					inData.modules[i].label = currentLabel;
				}
				modules = modules.concat(inData.modules);
			}
			var path = inPaths.shift(), label = '';
			if (path) {
				if (!enyo.isString(path)) {
					currentLabel = path.label;
					path = path.path;
				}
				new Walker().walk(path).response(this, next);
			} else {
				this.walkFinished(modules);
			}
		};
		next.call(this);
	}