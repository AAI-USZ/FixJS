function (errors, parser, request, resolveImmmediately) {
		var concreteClassName = Type.templateTypeToString(request.getClassName(), request.getTypeArguments());
		// return immediately if instantiated already
		var classDefs = parser.lookup(errors, request.getToken(), concreteClassName);
		if (classDefs != null)
			return classDefs;
		// instantiate
		var templateClass = parser.lookupTemplate(errors, request.getToken(), request.getClassName());
		if (templateClass == null) {
			errors.push(new CompileError(request.getToken(), "could not find template class definition for '" + request.getClassName() + "'"));
			return null;
		}
		var classDef = templateClass.instantiate(errors, request);
		if (classDef == null)
			return null;
		// register
		parser.registerInstantiatedClass(classDef);
		// resolve immediately if requested to
		if (resolveImmmediately) {
			classDef.resolveTypes(
				new AnalysisContext(
					errors,
					parser,
					(function (errors, request) {
						return this._instantiateTemplate(errors, request, true);
					}).bind(this)));
		}
		// nested instantiation
		var requests = request.getInstantiationRequests();
		for (var i = 0; i < requests.length; ++i) {
			this._instantiateTemplate(errors, parser, requests[i], resolveImmmediately);
		}
		// return
		return classDef;
	}