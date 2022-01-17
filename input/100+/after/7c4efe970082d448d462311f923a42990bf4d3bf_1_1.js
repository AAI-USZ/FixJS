function (errors, request, postInstantiationCallback) {
		// FIXME support the import rule
		var callbacks = [];
		for (var i = 0; i < this._sourceParsers.length; ++i) {
			var callback = this._sourceParsers[i].createGetTemplateClassCallback(errors, request, postInstantiationCallback);
			if (callback != null) {
				callbacks.push(callback);
			}
		}
		return callbacks;
	}