function (path, rules) {
	var value;

	// Check global rules
	value = applyRules(rules, path.slice(0, path.indexOf(sep) + 1), path);
	if (value.value === true) {
		return deferred(value.value);
	}
}