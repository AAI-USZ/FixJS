function(value) {
		// "If value is the empty string, abort these steps and do nothing."
		if (value === "") {
			return;
		}

		value = normalizeFontSize(value);

		// "If value is not one of the strings "xx-small", "x-small", "small",
		// "medium", "large", "x-large", "xx-large", "xxx-large", and is not a
		// valid CSS absolute length, then abort these steps and do nothing."
		//
		// More cheap hacks to skip valid CSS absolute length checks.
		if ($_(["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]).indexOf(value) == -1
		&& !/^[0-9]+(\.[0-9]+)?(cm|mm|in|pt|pc)$/.test(value)) {
			return;
		}

		// "Set the selection's value to value."
		setSelectionValue("fontsize", value);
	}