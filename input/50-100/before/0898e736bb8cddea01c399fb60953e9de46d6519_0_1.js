function (context, expr, type, mayUnbox) {
		if (! this.isConvertibleTo(context, expr, type, mayUnbox)) {
			context.errors.push(new CompileError(this._token, "cannot apply operator '" + this._token.getValue() + "' to type '" + exprType.toString() + "'"));
			return false;
		}
		return true;
	}