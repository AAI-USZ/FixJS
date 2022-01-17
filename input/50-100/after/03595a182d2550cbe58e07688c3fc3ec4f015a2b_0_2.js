function (attribute) {
	var that = this,
		values = [];

	$.each(that.conditions, function (i, condition) {
		if (condition.attribute === attribute) {
			values.push(condition.value);
		}
	});

	return values.join(" ");
}