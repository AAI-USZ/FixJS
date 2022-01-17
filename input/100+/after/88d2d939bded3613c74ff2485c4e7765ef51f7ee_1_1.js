function (instantiationContext) {
		if (this._typeArguments.length == 0) {
			var actualType = instantiationContext.typemap[this._qualifiedName.getToken().getValue()];
			if (actualType != undefined)
				return actualType;
			if (this._classDef == null)
				instantiationContext.objectTypesUsed.push(this);
			return this;
		}
		var typeArgs = [];
		for (var i = 0; i < this._typeArguments.length; ++i) {
			if (this._typeArguments[i] instanceof ParsedObjectType && this._typeArguments[i].getTypeArguments().length != 0) {
				var actualType = this._typeArguments[i].instantiate(instantiationContext);
			} else {
				actualType = instantiationContext.typemap[this._typeArguments[i].toString()];
			}
			typeArgs[i] = actualType != undefined ? actualType : this._typeArguments[i];
			// special handling for Array.<T> (T should not be NullableType)
			if (typeArgs[i] instanceof NullableType && this._qualifiedName.getToken().getValue() == "Array") {
				typeArgs[i] = typeArgs[i].getBaseType();
			}
		}
		instantiationContext.request.getInstantiationRequests().push(
			new TemplateInstantiationRequest(this._qualifiedName.getToken(), this._qualifiedName.getToken().getValue(), typeArgs));
		var objectType = new ParsedObjectType(this._qualifiedName, typeArgs);
		instantiationContext.objectTypesUsed.push(objectType);
		return objectType;
	}