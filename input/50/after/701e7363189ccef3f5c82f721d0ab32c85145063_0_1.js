function (type) {
		if (this._type != null)
			throw Error("type is already set");
		// implicit declarations of "int" is not supported
		if (type.equals(Type.Type.integerType))
			type = Type.Type.numberType;
		this._type = type;
	}