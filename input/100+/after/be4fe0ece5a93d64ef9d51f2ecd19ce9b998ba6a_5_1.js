function Type$addProperty(def) {
		var format = def.format;
		if (format && format.constructor === String) {
			format = getFormat(def.type, format);
		}

		var prop = new Property(this, def.name, def.type, def.label, format, def.isList, def.isStatic, def.isPersisted, def.isCalculated, def.index);

		this._properties[def.name] = prop;
		(def.isStatic ? this._staticProperties : this._instanceProperties)[def.name] = prop;

		// modify jstype to include functionality based on the type definition
		function genPropertyShortcut(mtype, overwrite) {
			var shortcutName = "$" + def.name;
			if (!(shortcutName in mtype._jstype) || overwrite) {
				mtype._jstype[shortcutName] = prop;
			}

			mtype.derivedTypes.forEach(function (t) {
				genPropertyShortcut(t, false);
			});
		}
		genPropertyShortcut(this, true);

		if (prop.get_isStatic()) {
			// for static properties add member to javascript type
			this._jstype["get_" + def.name] = this._makeGetter(prop, Property$_getter.bind(prop), true);
		}
		else {
			// for instance properties add member to all instances of this javascript type
			this._jstype.prototype["get_" + def.name] = this._makeGetter(prop, Property$_getter.bind(prop), true);
		}

		if (!prop.get_isList()) {
			if (prop.get_isStatic()) {
				this._jstype["set_" + def.name] = this._makeSetter(prop);
			}
			else {
				this._jstype.prototype["set_" + def.name] = this._makeSetter(prop);
			}
		}

		this._raiseEvent("propertyAdded", [this, { property: prop}]);

		return prop;
	}