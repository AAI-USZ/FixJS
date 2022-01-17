function (context) {
		if (this._classDef == null) {
			if (this._typeArguments.length == 0) {
				this._classDef = this._qualifiedName.getClass(context);
			} else {
				// get the already-instantiated class (FIXME refactor, or should we move QualifiedName#getClass to somewhere else?)
				if ((this._classDef = context.parser.lookup(context.errors, this._qualifiedName.getToken(), this.toString())) == null)
					context.errors.push(new CompileError(this._qualifiedName.getToken(), "'" + this.toString() + "' is not defined"));
			}
		}
	}