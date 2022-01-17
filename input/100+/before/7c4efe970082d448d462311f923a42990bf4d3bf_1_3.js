function (errors, contextToken, name) {
		// class within the file is preferred
		for (var i = 0; i < this._templateClassDefs.length; ++i) {
			if (this._templateClassDefs[i].className() == name)
				return this._templateClassDefs[i];
		}
		// classnames within the imported files may conflict
		var found = [];
		for (var i = 0; i < this._imports.length; ++i) {
			found = found.concat(this._imports[i].getTemplateClasses(name));
		}
		if (found.length == 1)
			return found[0];
		if (found.length >= 2)
			errors.push(new CompileError(contextToken, "multiple candidates exist for template class name '" + name + "'"));
		return null;
	}