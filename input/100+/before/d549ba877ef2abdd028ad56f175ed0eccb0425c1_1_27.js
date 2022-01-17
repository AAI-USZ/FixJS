function normalizeFontSize(value) {
	// "Strip leading and trailing whitespace from value."
	//
	// Cheap hack, not following the actual algorithm.
	value = value.trim();

	// "If value is a valid floating point number, or would be a valid
	// floating point number if a single leading "+" character were
	// stripped:"
	if (/^[-+]?[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/.test(value)) {
		var mode;

		// "If the first character of value is "+", delete the character
		// and let mode be "relative-plus"."
		if (value[0] == "+") {
			value = value.slice(1);
			mode = "relative-plus";
		// "Otherwise, if the first character of value is "-", delete the
		// character and let mode be "relative-minus"."
		} else if (value[0] == "-") {
			value = value.slice(1);
			mode = "relative-minus";
		// "Otherwise, let mode be "absolute"."
		} else {
			mode = "absolute";
		}

		// "Apply the rules for parsing non-negative integers to value, and
		// let number be the result."
		//
		// Another cheap hack.
		var num = parseInt(value);

		// "If mode is "relative-plus", add three to number."
		if (mode == "relative-plus") {
			num += 3;
		}

		// "If mode is "relative-minus", negate number, then add three to
		// it."
		if (mode == "relative-minus") {
			num = 3 - num;
		}

		// "If number is less than one, let number equal 1."
		if (num < 1) {
			num = 1;
		}

		// "If number is greater than seven, let number equal 7."
		if (num > 7) {
			num = 7;
		}

		// "Set value to the string here corresponding to number:" [table
		// omitted]
		value = {
			1: "xx-small",
			2: "small",
			3: "medium",
			4: "large",
			5: "x-large",
			6: "xx-large",
			7: "xxx-large"
		}[num];
	}

	return value;
}