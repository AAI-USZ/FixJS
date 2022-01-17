function (context, type) {
		var Type = require("./type");
		// first, check if there are any unresolved types
		for (var i = 0; i < this._args.length; ++i) {
			if (this._args[i].getType() == null)
				break;
		}
		if (i == this._args.length && this._returnType != null)
			return true;
		// resolve!
		if (type.getArgumentTypes().length != this._args.length) {
			context.errors.push(new CompileError(this.getToken(), "expected the function to have " + type.getArgumentTypes().length + " arguments, but found " + this._args.length));
			return false;
		} else if (this._args.length != 0 && type.getArgumentTypes()[this._args.length - 1] instanceof Type.VariableLengthArgumentType) {
			context.errors.push(new CompileError(this.getToken(), "could not deduct function argument (left hand expression is a function with an variable-length argument)"));
			return false;
		}
		for (var i = 0; i < this._args.length; ++i) {
			if (this._args[i].getType() != null) {
				if (! this._args[i].getType().equals(type.getArgumentTypes()[i])) {
					context.errors.push(new CompileError(this.getToken(), "detected type conflict for argument '" + this._args[i].getName().getValue() + "' (expected '" + type.getArgumentTypes[i].toString() + "' but found '" + this._args[i].getType().toString() + "'"));
					return false;
				}
			} else {
				this._args[i].setTypeForced(type.getArgumentTypes()[i]);
			}
		}
		if (this._returnType != null) {
			if (! this._returnType.equals(type.getReturnType())) {
				context.errors.push(new CompileError(this.getToken(), "detected return type conflict, expected '" + type.getReturnType() + "' but found '" + this._returnType.toString() + "'"));
				return false;
			}
		} else {
			this._returnType = type.getReturnType();
		}
		return true;
	}