function Property$isDefinedBy(mtype) {
		return this._containingType === mtype || mtype.isSubclassOf(this._containingType);
	}