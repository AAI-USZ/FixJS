function(value) {
		return (value === null) || (XM.isArray(value) && value.length === 0) || (XM.isUndefined(value) || (XM.isString(value) && value === ""));
	}