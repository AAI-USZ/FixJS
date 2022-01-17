function (context, token, lhsType, rhsType) {
		if (! lhsType.isAssignable()) {
			context.errors.push(new CompileError("left-hand-side expression is not assignable"));
			return false;
		}
		if (! rhsType.isConvertibleTo(lhsType)) {
			context.errors.push(new CompileError(token, "cannot assign a value of type '" + rhsType.toString() + "' to '" + lhsType.toString() + "'"));
			return false;
		}
		return true;
	}