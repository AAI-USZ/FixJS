function (errors, contextToken, name) {
		// class within the file is preferred
		for (var i = 0; i < this._classDefs.length; ++i) {
			if (this._classDefs[i].className() == name)
				return this._classDefs[i];
		}
		// instantiated templates never get imported
		if (name.match(/\.</) != null)
			return null;
		// classnames within the imported files may conflict
		var found = [];
		for (var i = 0; i < this._imports.length; ++i) {
			if (this._imports[i].getAlias() == null)
				found = found.concat(this._imports[i].getClasses(name));
		}
		if (found.length == 1)
			return found[0];
		if (found.length >= 2)
			errors.push(new CompileError(contextToken, "multiple candidates exist for class name '" + name + "'"));
		return null;
	}