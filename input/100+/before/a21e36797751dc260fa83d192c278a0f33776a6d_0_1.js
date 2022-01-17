function (type) {
		if (type.equals(Type.voidType))
			return "V";
		else if (type.equals(Type.booleanType))
			return "B";
		else if (type.equals(Type.integerType))
			return "I";
		else if (type.equals(Type.numberType))
			return "N";
		else if (type.equals(Type.stringType))
			return "S";
		else if (type instanceof ObjectType) {
			var classDef = type.getClassDef();
			if (classDef instanceof InstantiatedClassDefinition) {
				var typeArgs = classDef.getTypeArguments();
				switch (classDef.getTemplateClassName()) {
				case "Array":
					return "A" + this._mangleTypeName(typeArgs[0]);
				case "Map":
					return "H" + this._mangleTypeName(typeArgs[0]);
				default:
					throw new Error("unexpected template type: " + classDef.getTemplateClassName());
				}
			}
			return "L" + type.getClassDef().getOutputClassName() + "$";
		} else if (type instanceof StaticFunctionType)
			return "F" + this._mangleFunctionArguments(type.getArgumentTypes()) + this._mangleTypeName(type.getReturnType()) + "$";
		else if (type instanceof MemberFunctionType)
			return "M" + this._mangleTypeName(type.getObjectType()) + this._mangleFunctionArguments(type.getArgumentTypes()) + this._mangleTypeName(type.getReturnType()) + "$";
		else if (type instanceof NullableType)
			return "U" + this._mangleTypeName(type.getBaseType());
		else if (type.equals(Type.variantType))
			return "X";
		else
			throw new Error("FIXME " + type.toString());
	}