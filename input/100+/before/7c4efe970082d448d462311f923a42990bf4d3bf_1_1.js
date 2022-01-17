function (name) {
		var found = [];
		for (var i = 0; i < this._sourceParsers.length; ++i) {
			var classDefs = this._sourceParsers[i].getTemplateClassDefs();
			for (var j = 0; j < classDefs.length; ++j) {
				var className = classDefs[j].className();
				if (className.charAt(0) != '_' && className == name) {
					found.push(classDefs[j]);
					break;
				}
			}
		}
		return found;
	}