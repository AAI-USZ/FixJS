function(inSender, inData) {
			if (inData) {
				modules = modules.concat(inData.modules);
			}
			var path = inPaths.shift();
			if (path) {
				new Walker().walk(path).response(this, next);
			} else {
				this.walkFinished(modules);
			}
		}