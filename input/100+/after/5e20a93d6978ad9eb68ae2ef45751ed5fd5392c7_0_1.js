function (errors, request) {
		var Parser = require("./parser");
		// check number of type arguments
		if (this._typeArgs.length != request.getTypeArguments().length) {
			errors.push(new CompileError(request.getToken(), "wrong number of template arguments (expected " + this._typeArgs.length + ", got " + request.getTypeArguments().length));
			return null;
		}
		// return one, if already instantiated
		for (var i = 0; i < this._instantiatedDefs.length; ++i) {
			if (this._instantiatedDefs[i].typeArgumentsAreEqual(request.getTypeArguments())) {
				return this._instantiatedDefs[i];
			}
		}
		// build context
		var instantiationContext = {
			errors: errors,
			request: request,
			typemap: {}, // string => Type
			objectTypesUsed: []
		};
		for (var i = 0; i < this._typeArgs.length; ++i)
			instantiationContext.typemap[this._typeArgs[i].getValue()] = request.getTypeArguments()[i];
		// FIXME add support for extend and implements
		var succeeded = true;
		var members = [];
		for (var i = 0; i < this._members.length; ++i) {
			var member = this._members[i].instantiate(instantiationContext);
			if (member == null)
				succeeded = false;
			members[i] = member;
		}
		// done
		if (! succeeded)
			return null;
		var instantiatedDef = new InstantiatedClassDefinition(
			this._className,
			this._flags,
			request.getTypeArguments(),
			this._extendType != null ? this._extendType.instantiate(instantiationContext): null,
			this._implementTypes.map(function (t) { return t.instantiate(instantiationContext); }),
			members,
			instantiationContext.objectTypesUsed);
		this._instantiatedDefs.push(instantiatedDef);
		return instantiatedDef;
	}