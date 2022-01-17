function Property(containingType, name, jstype, isList, label, format, isStatic, isPersisted, index) {
		this._containingType = containingType;
		this._name = name;
		this._fieldName = "_" + name;
		this._jstype = jstype;
		this._label = label || makeHumanReadable(name);
		this._format = format;
		this._isList = !!isList;
		this._isStatic = !!isStatic;
		this._isPersisted = !!isPersisted;
		this._index = index;
		this._rules = [];
		this._defaultValue = 
			isList ? [] :
			jstype === Boolean ? false :
			jstype === Number ? 0 :
			null;

		if (containingType.get_originForNewProperties()) {
			this._origin = containingType.get_originForNewProperties();
		}

		if (this._origin === "client" && this._isPersisted) {
			ExoWeb.trace.logWarning("model",
				"Client-origin properties should not be marked as persisted: Type = {0}, Name = {1}",
				containingType.get_fullName(),
				name);
		}
	}