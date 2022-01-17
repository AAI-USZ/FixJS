function (context, parentExpr) {
		if (! this._analyze(context))
			return false;
		var srcType = this._expr.getType();
		if ((srcType.equals(Type.nullType) && ! (this._type instanceof NullableType || this._type instanceof ObjectType || this._type instanceof FunctionType))) {
			context.errors.push(new CompileError(this._token, "'" + srcType.toString() + "' cannot be treated as a value of type '" + this._type.toString() + "'"));
			return false;
		}
		return true;
	}