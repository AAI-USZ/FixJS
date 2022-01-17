function (attribute) {
	var that = this,
		values = [];
	$.each(this.valueControls, function (i, valueControl) {
		if (that.conditions[i].attribute === attribute) {
			values.push(valueControl.val());
		}
	});
	return values.join(" ");
}