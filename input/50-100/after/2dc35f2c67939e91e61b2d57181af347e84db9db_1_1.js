function(key) {
		var self = this;
		var context = Context.current;
		if(context && self._keyDeps[key] && !self._keyDeps[key][context.id]) {
			//Store the current context and setup invalidation callback
			self._keyDeps[key][context.id] = context;
			context.on_invalidate(function() {
				//Check to see if self._keyDeps[key] exists first,
				//as this property might have been deleted
				if(self._keyDeps[key])
					delete self._keyDeps[key][context.id];
			});
		}
		return self._rawData[key];
	}