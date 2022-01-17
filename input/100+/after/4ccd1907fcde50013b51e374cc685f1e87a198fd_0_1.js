function describeValue(value, level) {
		level = level || 0;

		if (value.value === null)       { return "null"; }
		if (value.type === "undefined") { return "undefined"; }
		if (value.type === "number")    { return value.value; }
		if (value.type === "string")    { return JSON.stringify(value.value); }
		if (value.type === "function")  { return value.description; }
		if (value.type === "object")    { return describeObject(value, level); }
		if (value.description)          { return value.description; }
		
		// Pretty print
		return JSON.stringify(value, undefined, tabWidth);
	}