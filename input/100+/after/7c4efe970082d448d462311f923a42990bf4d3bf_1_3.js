function (errors, request, postInstantiationCallback) {
		// lookup within the source file
		var instantiateCallback = this.createGetTemplateClassCallback(errors, request, postInstantiationCallback);
		if (instantiateCallback != null) {
			return instantiateCallback(errors, request, postInstantiationCallback);
		}
		// lookup within the imported files
		var candidateCallbacks = [];
		for (var i = 0; i < this._imports.length; ++i) {
			candidateCallbacks = candidateCallbacks.concat(this._imports[i].createGetTemplateClassCallbacks(errors, request, postInstantiationCallback));
		}
		if (candidateCallbacks.length == 0) {
			errors.push(new CompileError(request.getToken(), "could not find definition for template class: '" + request.getClassName() + "'"));
			return null;
		} else if (candidateCallbacks.length >= 2) {
			errors.push(new CompileError(request.getToken(), "multiple candidates exist for template class name '" + request.getClassName() + "'"));
			return null;
		}
		return candidateCallbacks[0]();
	}