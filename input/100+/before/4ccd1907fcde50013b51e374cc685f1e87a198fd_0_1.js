function describeValue(value) {
		if (value.type === "undefined") { return "undefined"; }
		if (value.type === "number")    { return value.value; }
		if (value.type === "string")    { return JSON.stringify(value.value); }
		if (value.type === "function")  { return value.description; }
		if (value.value === null)       { return "null"; }
		if (value.description)          { return value.description; }
		
		return JSON.stringify(value);
	}